const db = require('../db/query')
const email = require('./email')
const config=require('../configuration/config')
async function savedata(list) {
    return new Promise(async (resolve, reject) => {


        try {

            let response = [];
            for (let obj in list) {
                let doc = makeDocument(list[obj])
                result = await db.saveCert(doc)

                response.push(result);

            }
            resolve(response);

        } catch (err) {
            console.log(err);
            reject(err);
        }

    })
}


async function generateOtp(id) {
    return new Promise(async (resolve, reject) => {
        try {
        
            let empobj = await db.fetchEmail(id);
            if (!empobj)
                reject(`invalid employee code: ${id}`)

            let email_id = empobj.email;
            let emp_name = empobj.name;
            let otp = Math.floor(Math.random() * 1000000);
            while (otp < 100000) {
                otp = Math.floor(Math.random() * 1000000);
            }

            await db.updateEmpObj(id, otp);

            let obj = {
                from: config.emailconfig.email,
                to: email_id,
                OTP: otp,
                name: emp_name
            }

            let mailObject = email.setMailObject(obj);

            await email.sendOtpMail(mailObject);

            resolve();

        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}

async function verifyOtp(id, otp) {
    return new Promise(async (resolve, reject) => {
        try {
           
            let empOtp = await db.fetchOtp(id);
            if (!otp)
                reject(`invalid employee code: ${id}`)
            
            if (empOtp === otp)
            {
                resolve("VERIFICATION SUCCESFULL");

            }
                
            reject("invalid :otp")


        } catch (err) {
            reject(err);
        }
    });
}


function makeDocument(obj) {
    let doc;
    if (obj.certificate === "microsoft") {
        doc = {
            cert_name: obj.certificateName,
            productname: obj.category,
            certficate_Id: obj.certificateID,
            description: obj.description,
            issuedDate: obj.issueDate,
            expirationDate: obj.expireDate,
            issuedBy: obj.certificate,
            emp_id: obj.empId
        }

        return doc;
    }
    if (obj.certificate === "others") {
        doc = {
            cert_name: obj.certificateName,
            certficate_Id: obj.certificateID,
            description: obj.description,
            issuedDate: obj.issueDate,
            expirationDate: obj.expireDate,
            issuedBy: obj.category,
            emp_id: obj.empId

        }
        return doc;
    }


    doc = {
        cert_name: obj.certificateName,
        certficate_Id: obj.certificateID,
        description: obj.description,
        issuedDate: obj.issueDate,
        expirationDate: obj.expireDate,
        issuedBy: obj.certificate,
        emp_id: obj.empId

    }

    return doc;

}


module.exports = { savedata, generateOtp, verifyOtp }

