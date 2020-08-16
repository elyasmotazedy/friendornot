const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/User');

// @route   GET api/users
// @des     Register user
// @access  Public

router.post('/register', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('birthday', 'Birthday is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password , birthday} = req.body;

    try {
        let user = await User.findOne({email : email});
        // console.log(email)
        console.log(user)
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password,
            birthday
        });


        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        await user.save();
        
        const payload = {user:{id:user.id}}

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000},
            (err, token) =>{
                if(err) throw err;
                res.json({token});
            })


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  
});

module.exports = router;