const User = require('../models/User');

const { generateJWT } = require('../helpers/jwt');

const createUser = async( req, res ) => {
    
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
    
        if( user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            });
        }

        user = new User( req.body );

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
            msg: 'Por favor contacte al administrador'
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
                msg: 'No existe usuario con ese email'
            });
        }

        // Compare received password with password in db


        if ( user.password !== password ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Contraseña incorrecta'
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
            msg: 'Por favor contacte al administrador'
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
