const createError = require('http-errors')
const axios = require('axios')

async function validateToken(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(createError(403, "No Authorization Header"));
    }
    try {
        const token = authorization?.split("Bearer ")[1];
        if(typeof token === "undefined") {
            return next(createError(403, "Invalid Token Format"));
        }
        let res = await thirdPartyValidation(token);
        if(res.code !== 200){
            return next(createError(res.code, res.message));
        }
        return next();
    } catch {
        next(createError(403, "Invalid Token Format"));
    }
}

async function thirdPartyValidation(token){
    try{
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        let url = process.env.AUTHORIZATION_URL;
        const response = await axios.get(url,config);
        return {
            code: response.data.code,
            message: response.data.message
        }
    }catch(err){
        return {
            code: 500,
            message: err.message
        }
    }

}

module.exports = validateToken;
