const JWT_SECRET = "superman";
function userMiddleware(req, res, next) {
    console.log("hello");
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    console.log("hello1");
    const decodedValue = jwt.verify(token, JWT_SECRET);
    console.log("hello2");
    if (decodedValue) {
        req.username = decodedValue.username;
        console.log("hello3");
        next()
    }
    return res.status(400).send("you are unauthenticated")

}

module.exports = userMiddleware;