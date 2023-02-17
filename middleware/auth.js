import { UnauthenticatedError } from "../errors/error.js";
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError("Authentication Invalid")
        // console.log(authHeader);
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload);
        // attach the user request object
        // req.user = payload
        req.user = { userId: payload.userId }
        // console.log(req.user)

        next()
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid")

    }



}
export default auth