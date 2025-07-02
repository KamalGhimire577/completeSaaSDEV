
import nodemailer from "nodemailer"
interface IMailInformation{
    to:string,
    subject:string,
    text:string
}
const sendMail =async(mailInformation:IMailInformation)=>{
    // email pathaune logic goes here 
    //also you can use sendgrid

    // step 1 : create nodemailer transport
    // configuration setup of node mailer
  
    // service ma j j xa tesma janxa mail
    // bussines or yours or sender ko gmail and pass is auth
      const transporter =nodemailer.createTransport({
      service: "gmail", //yaho,hotmail
      auth: {
        user: process.env.NODEMAILER_GMAIL,// app password goggle -->manange your acc--> search (app password)if 2 way varification on it display otherwise make 2 way verification and research and create and you can have app password the space remove garer ya rakhinca
        pass:process.env.NODEMAILER_APP_PASSWORD , // no real password or it a app password ya ko spece lai ingore garne
      },
    });

    const mailFormatObject ={
        from : "saaS Mern <ghimirekedar984@gmail.com",
        to:mailInformation.to,
        subject: mailInformation.subject,
        text: mailInformation.text



    }
    try{ await transporter.sendMail(mailFormatObject)}
    catch(error){
 console.log(error)
    };
    

    


    
}

export default sendMail
// for sms tuilo 
// nepali aakash sms 
// sqiro etc