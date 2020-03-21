const express = require('express');
const router = express.Router()
const User = require('../model/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @route       POST api/v1/users
// @desc        Register a user
// @access      Public

router.post('/', [ 
        check('name', 'name is required').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
    ], async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {name, email, password } = req.body
    
        try {
             let user = await User.findOne({email})

            if(user){
                return res.status(400).json({message: "User already exists"})
            }

            user = new User({name, email, password})

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.jwt_secret, {expiresIn: 360000}, (error, token) => {
                if(error) throw error
                res.json({ token })
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, message: 'server error'})
        }

})

module.exports = router