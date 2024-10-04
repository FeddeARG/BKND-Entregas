//src/routes/auth.router.js
import { Router } from "express";
import { loginUser, registerUser, sendResetPassword, resetPassword } from "../controllers/auth.controller.js";
import { validateLogin, validateRegister } from "../validators/auth.validator.js";

const router = Router();

// Rutas de login y registro
router.post("/login", validateLogin, loginUser);
router.post("/register", validateRegister, registerUser);

// Ruta para mostrar la vista de selección de método de recuperación
router.get("/reset-password", (req, res) => {
  res.render("requestResetPassword");  // Esta es la nueva vista para elegir entre email o SMS
});

// Ruta para procesar la solicitud de recuperación
router.post("/reset-password", sendResetPassword);  // Procesa la solicitud del formulario y envía el enlace

// Ruta para mostrar la vista de restablecimiento de contraseña con el token
router.get("/reset-password/:token", (req, res) => {
  res.render("resetPassword", { token: req.params.token });
});

// Ruta para restablecer la contraseña
router.post("/reset-password/:token", resetPassword);

export default router;

