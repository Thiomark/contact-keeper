const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const Contact = require('../model/Contact')
const {check, validationResult} = require('express-validator')
const config = require('config');
const e = require('express');

// @route       GET api/v1/contacts
// @desc        Get all contacts
// @access      Private

router.get('/', auth, async (req, res) => {
    try {
        const contact = await Contact.find({user: req.user.id}).sort({date: -1})
        res.status(200).json(contact)

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'server error'})
    }
})

// @route       POST api/v1/contacts
// @desc        Add new contact
// @access      Private

router.post('/', [auth, [check('name', 'Name is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, phone, type } = req.body

    try {
        const newContact = new Contact({name, email, phone, type, user: req.user.id})

        const contact = await newContact.save()

        return res.status(201).json(contact)

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'server error'})
    }
})

// @route       PUT api/v1/contacts/:id
// @desc        Update contacts
// @access      Private

router.put('/:id', auth, async (req, res) => {

    try {
        const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body)
        if(!updateContact){
            return res.status(400).json({success: false, message: 'contact not found'})
        }else{
            res.status(200).json(updateContact)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'server error'})
    }
})

// @route       Delete api/v1/contacts/:id
// @desc        Delete contacts
// @access      Private

router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id, req.body)
        if(!contact){
            return res.status(400).json({success: false, message: 'Contact not found'})
        }else{
            res.status(200).json({success: true, message: 'Contact deleted'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'server error'})
    }
})

module.exports = router