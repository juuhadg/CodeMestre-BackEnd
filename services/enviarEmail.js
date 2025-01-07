
import nodemailer from 'nodemailer'
export default async function enviarEmail(dados) {
 
    const { LOGIN_EMAIL , SENHA_EMAIL } = process.env



let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: LOGIN_EMAIL,
        pass: SENHA_EMAIL
    },
    
})

const mailOptions = {
    from : 'codemestreapp@gmail.com',
    to: dados.to,
    subject: dados.subject,
    text: dados.text
}

await new Promise((resolve, reject) => {
    mailTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });



}

