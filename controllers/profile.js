const User = require('../models/User');

const getProfile = async( req, res ) => {

    const id = req.params.userId;


    try {

        const user = await User.findById( id );
    
        if( !user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'User does not exist'
            });
        }
    
        res.status( 201 ).json({
            ok: true,
            uid: user.id,
            avatar: user.avatar,
            name: user.name,
            bio: user.bio,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
        });
        
    } catch ( error ) {
        
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Please contact admin'
        });
    };
}

const updateProfile = async( req, res ) => {

    const userId = req.params.userId;
    const uid = req.uid;

    // console.log( { uid } )
    // console.log( { userId } )

    try {

        const user = await User.findById( userId );

        // console.log( { user } )
    
        if( !user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'User does not exist'
            });
        }

        if( userId !== uid ) {
            return res.status( 401 ).json({
                ok: false,
                msg: 'No tiene privilegio de editar evento'
            });
        }

        const newProfile = {
            
            ...req.body,
        };
        // console.log( { newProfile } );

        const updatedProfile = await 
                    User.findByIdAndUpdate( 
                        userId, 
                        newProfile, 
                        { new: true } 
                    );

        // console.log( { updatedProfile } )
    
        res.status( 201 ).json({
            ok: true,
            profile: updatedProfile
        });
        
    } catch ( error ) {
        
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Please contact admin'
        });
    };
}


module.exports = {
    getProfile,
    updateProfile
}