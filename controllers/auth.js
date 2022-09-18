const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');

const createUser = async( req, res ) => {
    
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
    
        if( user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Already exists user with this email'
            });
        }

        user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // Generate JWT
        const token = await generateJWT( user.id, user.name );
    
        res.status( 201 ).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch ( error ) {
        
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Please contact admin'
        });
    };

}

const loginUser = async( req, res ) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
    
        if( !user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Does not exist user with this email'
            });
        }

        // Compare received password with password in db
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Wrong password'
            });
        };

        // Generate JWT
        const token = await generateJWT( user.id, user.name );


        res.status( 201 ).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch ( error ) {

        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin'
        });
    }

};

const renewToken = async( req, res ) => {

    const uid = req.uid;
    const name = req.name;

    // renew token
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        uid: uid,
        name: name,
        token: token
    })
};


module.exports = {
    createUser,
    loginUser,
    renewToken,
}
