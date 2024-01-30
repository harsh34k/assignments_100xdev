const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
    const { username } = req.headers;
    const admin = await Admin.findOne({ username });
    if (admin) {
        res.status(200)
        next()
    } else {
        return res.status(401).send("admin does not exists")
    }

}

module.exports = adminMiddleware;