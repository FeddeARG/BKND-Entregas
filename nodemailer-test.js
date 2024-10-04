import nodemailer from 'nodemailer';

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  auth: {
    user: 'federicoanaranjo@gmail.com',  // Reemplaza con tu correo
    pass: 'zogwnjxkkhxzqxdr',           // Reemplaza con tu contraseña de aplicación
  },
});

const mailOptions = {
  from: 'federicoanaranjo@gmail.com',    // Reemplaza con tu correo
  to: 'federicoanaranjo@gmail.com',      // Reemplaza con tu correo para probar el envío
  subject: 'Prueba de Nodemailer',
  text: 'Esto es una prueba de Nodemailer.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error al enviar el correo:', error);
  }
  console.log('Correo enviado con éxito:', info.response);
});
