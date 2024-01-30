const { User } = require("../db");
async function userMiddleware(req, res, next) {
    const { username } = req.headers;
    const user = await User.findOne({ username });
    if (user) {
        res.status(200)
        next()
    } else {
        return res.status(401).send("user does not exists")
    }
}

module.exports = userMiddleware;