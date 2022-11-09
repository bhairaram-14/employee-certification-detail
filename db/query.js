const schemas = require('./schemas')
const mongoose = require('mongoose');

async function saveCert(certObj) {
    
  return new Promise(async (resolve,reject)=>{
  try {
    let data= await schemas.cert.create(certObj);
    resolve(data);
  } catch (error) {
    reject(error);
    
  }

  });

}

// async function saveEmp(empObj) {

//     return new Promise(async (resolve, reject) => {
//         try {
//             const e = await schemas.emp.create(empObj)
//             resolve(e);
//         } catch (E) {
//             reject("enter correct data ");
//         }
//     });
// }


async function updateEmpObj(emp_code,otp) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await schemas.emp.where("emp_code").equals("SPAN-JDP-0098");
            data[0].otp=otp;
            data=await data[0].save();
            console.log(data);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

async function fetchOtp(emp_code) {
 return new Promise(async(resolve,reject)=>{
   try{
     let obj =await schemas.emp.where("emp_code").equals(emp_code).select("otp");
     if(obj.length<1)
      reject(`invalid employe code :${emp_code}`);
     resolve(obj[0].otp); 
   }catch(error){
    reject(error);
   }

 });
    
}



async function fetchEmail(emp_code) {
    return new Promise(async(resolve,reject)=>{
      try{
        let obj =await schemas.emp.where("emp_code").equals(emp_code).select("email").select("name");
        if(obj.length<1)
         reject(`invalid employe code :${emp_code}`)
        resolve({email:obj[0].email, name:obj[0].name}); 
      }catch(error){
       reject(error);
      }
   
    });
       
   }




module.exports={saveCert,fetchEmail,fetchOtp,updateEmpObj}