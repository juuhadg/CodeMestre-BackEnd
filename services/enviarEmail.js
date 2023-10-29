
export default function enviarEmail(dados) {
 
    const { LOGIN_EMAIL , SENHA_EMAIL } = process.env


    const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: LOGIN_EMAIL,
        pass: SENHA_EMAIL
    }
})

const mailOptions = {
    from : 'codemestreapp@gmail.com',
    to: dados.to,
    subject: dados.subject,
    text: dados.text
}

mailTransporter.sendMail(mailOptions,function(error,info) {
    if(error) {
        return error;
    } else {
        return(info.response)
    }
})



}

