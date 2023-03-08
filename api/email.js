const nodemailer=require('nodemailer')
const ejs=require('ejs')
const {convert}=require('html-to-text')


module.exports=class Email{
    constructor(user,url){
        this.to=user.email;
        this.name=user.name ;
        this.url=url;
        this.from =`vijay`
    }
    newTransport(){
        return nodemailer.createTransport({
            // host:'smtp.ethereal.email',
            // port:587,
            // auth:{
            //     user:"liza9@ethereal.email",
            //     pass:"zzNDam9qe3DfyGwU8K",
    
            // }
            service:'gmail',
            auth:{
                user:'narasimha.vijay2001@gmail.com',
                pass:'whaeqcvyeniqxsno'
            }
        })
    }
    async send(subject){
        // const html=ejs.renderFile('./mail.ejs')
        const html=`<h1>${this.url}</h1>`
        const mailOptions={
            from:this.from,
            to:this.to,
            subject,
            html,
            text:convert(html)
        }
        await this.newTransport().sendMail(mailOptions)
        console.log(mailOptions)
    }
    async welcome(){
        await this.send('welcome!')
        console.log('mail sent')
    }
    async token(){
        await this.send('token!')
        console.log('mail sent')
    }
}