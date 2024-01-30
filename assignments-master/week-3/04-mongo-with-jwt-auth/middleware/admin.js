// // Middleware for handling auth
const JWT_SECRET = "superman";
const jwt = require("jsonwebtoken")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    console.log(token)
    const decodedValue = jwt.verify(token, JWT_SECRET)
    if (decodedValue) {
        next()
    } else {
        res.send('Unauthorized').status(401)
    }
}

module.exports = adminMiddleware;
