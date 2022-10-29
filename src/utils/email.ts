import nodemailer, { TransportOptions } from "nodemailer";
import "dotenv/config";
//TODO: poner los types a la data del mail

//make me a interfaces fo this data

export const sendEmailRegistration = async (data: any) => {
  console.log(data);
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  } as TransportOptions);

  const info = await transport.sendMail({
    from: "UpTask - proyect management  👻",
    to: email,
    subject: "UpTask - Confirm your account  👻",
    text: "Confirm your account",
    html: `
    <p>hello, ${name}, check your account </p>
    <p>${name},si tu no has solicitado esto, ignora este email. 😊</p>
    <p>Tu cuenta solo necesita estar confirmada solo sigue el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
        `,
  });

  //   console.log("Message sent: %s", info.messageId);
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const sendEmailResetPassword = async (data: any) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  } as TransportOptions);

  const info = await transport.sendMail({
    //Quien el email
    from: '"Uptask - Administrador de proyectos" <hola@Moralitos@.com>',
    //Aquien le eviamos el email
    to: email,
    //Asunto
    subject: "Uptask - Reestablece tu Password",
    text: "Comprueba tu cuenta en UpTask",
    html: `
          <p>Hola, ${name}, Has Reestablece tu Password</p>
          <p>${name}, si tu no has solicitado esto, ignora este email. 😊</p>
          <p>Sigue el siguiente enlace para reestablecer tu Password:
          <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
      
          <p>
      
          `,
  });
};
