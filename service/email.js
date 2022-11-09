var nodemailer = require('nodemailer');
const config = require('../configuration/config')

var getTransporter = async () => {

    return new Promise((resolve, reject) => {

        resolve(nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailconfig.email,
                pass: config.emailconfig.password

            },
            port: 465,
            host: "smtp.gmail.com"
        }));

    });

}

let setMailObject = (obj) => {


    let mailObject =
    {
        from: obj.from,
        to: obj.to,
        subject: "OTP for Employee Certfication Portal",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><img style="width: 250px;" src="https://spanidea.com/wp-content/uploads/2021/07/SpanIdea-Logo.png" /> </a>
          </div>
          <p style="font-size:1.1em">Hi ${obj.name},</p>
          <p style="font-size:1.1em">Use the following OTP to login into certification portal.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${obj.OTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />Spanidea Systems</p>
          <hr style="border:none;border-top:1px solid #eee" />
      
        </div>
      </div>
    
</body>
</html>`

    }

    return mailObject;

}



sendOtpMail = async (mailObject) => {

    return new Promise(async (resolve, reject) => {

        try {
            let transporter = await getTransporter();

            transporter.sendMail(mailObject, (err, info) => {
                if (err)
                    reject(err);
                else
                    resolve(info);
            });
        } catch (err) {

            reject(err);
        }
    });

}


module.exports = { sendOtpMail, setMailObject };

