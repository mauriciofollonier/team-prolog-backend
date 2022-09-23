const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser,
        loginUser,
        renewToken } = require('../controllers/auth');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


// Routes

/* 
    host + /api/auth
*/ 


router.post( 
    '/register', 
    [ 
    // check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email should be valid').isEmail(),
    check('password') 
        .isLength({ min: 8 }).withMessage('Password should be greater than 5 characters')
        .isAlphanumeric().withMessage('Password must cointain letters and numbers'),

    validateFields    
    ],       
    createUser );

router.post( 
    '/', 
    [ 
    check('email', 'Email should be valid').isEmail(),
    check('password', 'Password should be greater than 5 characters').isLength({ min: 8 }),

    validateFields
    ],
    loginUser );

router.get( '/renew', validateJWT, renewToken );




module.exports = router;