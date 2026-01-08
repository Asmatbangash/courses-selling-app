import jwt from 'jsonwebtoken'

function userMiddlware(req, res, next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({errors: "toekn not provided"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.USER_ACCESS_TOKEN)
        console.log("decoded", decoded)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({errors: "token is invalid or expired"})
        console.log(error)
    }
}

export default userMiddlware