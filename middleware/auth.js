const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No token, authoraztion denied'});
    }

    try{
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user;
        next();
    } catch(err){
        res.status(401).json({msg:'Token is not valid'});
    }

}