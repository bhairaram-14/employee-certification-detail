const service = require('../service/service')


const save = async (req, res) => {
    try {
        const data = req.body;
        let obj = await service.savedata(data);
        
        let result = {

            message: "successfully saved",
            dto: obj
        }
        res.status(200).send(result);
    } catch (err) {

        let result = {
            message: "failed",
            error: err
        }
        res.status(500).send(result);

    }
}
















const login = async (req, res) => {
    try {
        let data = await service.generateOtp(req.body.id);
      
        let result = {
            message: " otp generated successfully",
        }

        res.status(200).send(result);
    } catch (err) {
        let result = {
            message: "failed ",
            error: err
        }
        res.status(500).send(result)
    }
}

const verify = async (req, res) => {
    try {

        let data = await service.verifyOtp(req.body.id, req.body.otp);
        let result = {
            message: "verification succesfull ",
        }
         res.status(200).send(result);
    } catch (err) {
        let result = {
            message: "verification failed ",
            error: err
        }
        res.status(500).send(result)
    }
}
const all = async (req, res) => {
    res.status(400).send("resource not found.....!")
}


module.exports = { save, login, verify, all };


