const User = require('../models/User');

const getProfile = async( req, res ) => {

    const id = req.uid;


    try {

        const user = await User.findOne({ id });
    
        if( !user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'User does not exist'
            });
        }
    
        res.status( 201 ).json({
            ok: true,
            uid: user.id,
            name: user.name,
            avatar: user.avatar,
            bio: user.bio,
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

        const user = await User.findOne({ userId });
    
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
            
            ...req.body
        };

        const updatedProfile = await 
                    User.findByIdAndUpdate( 
                        user.id, 
                        newProfile, 
                        { new: true } 
                    );
    
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