import jwt from 'jsonwebtoken'
import config from '../config.js'

function adminMiddlware(req, res, next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({errors: "token not provided"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, config.JWT_ADMIN_PASSWORD)
        req.adminId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({errors: "token is invalid or expired"})
    }
}

export default adminMiddlware