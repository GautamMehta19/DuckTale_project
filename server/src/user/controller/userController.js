const userModel = require('../model/userModel')

const createUser = async (req, res) => {
    try {
        let data = req.body
        let { name, address } = data
        if (!name || !address) {
            return res.status(400).send({
                status: false,
                message: 'name, address are required'
            })
        }

        let getUser = await userModel.findOne({
            name: name,
            address: address
        })
        if (getUser) {
            return res.status(200).send({
                status: true,
                message: `you have an account and loggedIn user`,
                data: getUser
            })
        }
        let createUser = await userModel.create(data)
        return res.status(201).send({
            status: true,
            message: `successfully created and loggedIn user`,
            data: createUser
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}



const getUser = async (req, res)=>{
    try{
        let userId = req.params.userId
        if(!userId){
            return res.status(400).send({
                status: false,
                message : `userId is required`
            })
        }
        let user = await userModel.findById(userId)
        return res.status(200).send({
            status: true,
            message : `successfully got the user information`,
            data : user
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


module.exports = {
    createUser,
    getUser
}