//src/controllers/auth.controller.js
import UserService from "../services/user.service.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import twilio from "twilio";

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Configuración de Twilio
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Función de Login
export const loginUser = async (req, res) => {
  try {
    const token = await UserService.login(req.body.email, req.body.password);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60 * 60 * 1000, // 5 horas
    });
    res.redirect("/realtimeproducts");
  } catch (error) {
    console.error("Error en login:", error);
    res.render("login", { error: error.message });
  }
};

// Función de Registro
export const registerUser = async (req, res) => {
  try {
    const token = await UserService.register(req.body);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60 * 60 * 1000, // 5 horas
    });
    res.redirect("/realtimeproducts");
  } catch (error) {
    console.error("Error en registro:", error);
    res.render("register", { error: error.message });
  }
};

export const sendResetPassword = async (req, res) => {
  try {
    const { email, method } = req.body;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "El usuario no fue encontrado." });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;

    await user.save();

    const resetUrl = `http://${req.headers.host}/auth/reset-password/${token}`;

    if (method === "email") {
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USERNAME,
        subject: "Recuperación de contraseña",
        text: `Recibiste este correo porque solicitaste restablecer tu contraseña.\n\n
              Haz clic en el siguiente enlace o pégalo en tu navegador para completar el proceso:\n\n
              ${resetUrl}\n\n
              Si no solicitaste este correo, ignóralo.\n`,
      };
      await transporter.sendMail(mailOptions);
    } else if (method === "sms") {
      const smsOptions = {
        body: `Haz clic en este enlace para restablecer tu contraseña: ${resetUrl}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone, // Asegúrate de que este número esté en formato internacional
      };

      // Capturar el error de Twilio
      try {
        const message = await client.messages.create(smsOptions);
        console.log("Mensaje enviado correctamente:", message.sid);
      } catch (error) {
        console.error("Error al enviar SMS:", error);
        return res.status(500).json({ message: "Error al enviar SMS", error });
      }
    }

    res.status(200).json({
      message: "Se ha enviado un enlace de recuperación a tu correo electrónico o SMS.",
    });
  } catch (error) {
    console.error("Error al enviar el enlace de recuperación:", error);
    res.status(500).json({ message: "Error al enviar el enlace de recuperación.", error });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verificar el token en la base de datos
    const user = await UserService.getUserByToken(token);

    if (!user) {
      return res.status(400).json({
        message: "El token es inválido o el usuario no fue encontrado.",
      });
    }

    // Verificar si el token ha expirado
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        message: "El token ha expirado.",
      });
    }

    // Actualizar la contraseña
    const hashedPassword = await UserService.hashPassword(newPassword); // Hashear la nueva contraseña
    user.password = hashedPassword;

    // Limpiar los campos relacionados con el restablecimiento de contraseña
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Guardar el usuario actualizado
    await user.save();

    res.status(200).json({ message: "La contraseña se ha restablecido correctamente." });
  } catch (error) {
    console.error("Error en resetPassword:", error); // Registrar el error en la consola
    res.status(500).json({
      message: "Error al restablecer la contraseña.",
      error,
    });
  }
};


