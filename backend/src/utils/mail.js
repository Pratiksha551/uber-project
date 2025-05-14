import nodemailer from 'nodemailer';
import { config } from '../config/env.js'

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:"ravinapurhe123@gmail.com",
        pass:config.apiKey
    }
})

export default async function sendMail({to, subject, text}){

    const mailOption = {
        from:`"Uber App" <ravinapurhe123@gmail.com>`,
        to:to,
        subject:subject,
        text:text
    }

    await transporter.sendMail(mailOption, (err, info) => {
        if(err){
            console.log("Email error",err);
            
        }else{
            console.log(info);
            
        }
    })
}