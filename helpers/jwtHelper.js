const JWT =require ('jsonwebtoken');
const createError=require('http-errors')


module.exports={
    signAccessToken:(userId)=>{
        return new Promise((resolve,reject)=>{
        const payload={userId};
        const secretKey=process.env.ACCESS_TOKEN_SECRET;
        const options={
            expiresIn:"1000s",
            audience:userId,
            issuer:"node-auth",
        }
        JWT.sign(payload,secretKey,options,(err,token)=>{
            if(err){
                console.log(err.message)
                reject(createError.InternalServerError())
                return
        }
        resolve(token)
        })
    })

},
verifyAccessToken:(req,res,next)=>{
    if(!req.headers['authorization'])
        return next(createError.Unauthorized())
    const authHeader=req.header['authorization']
    const bearerToken=authHeader.split(' ')
    const token=bearerToken[1]
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){

        const message=err.name==='jsonWebTokenError'?'Unauthorized':err.message
        return next(createError.Unauthorized(message))
        }
        req.payload=payload
        next()
    })
}
}