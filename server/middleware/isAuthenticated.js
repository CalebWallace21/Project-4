
//Importing the .env file and using the secret variable created inside it
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    //The isAuthenticated function is what we are exporting to pur other files
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        //If we dont receive a headertoken back this sends an error to alert of issues authenticating
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        //The JWT verify method will take in the token value and the second thing we pass in is our secret key for figuring out if the token is valid or not
        try {
            token = jwt.verify(headerToken, SECRET)
        //Our error catcher if the token is unable to be verified
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        //If there isnt a token we throw an error letting them know they arent authenticated
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}