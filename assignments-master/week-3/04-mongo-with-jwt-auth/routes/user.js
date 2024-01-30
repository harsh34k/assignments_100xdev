const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken")
const JWT_SECRET = "superman";

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const user = await User.create({ username, password })
    return res.status(200).json({ message: "user created succesfully" })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ username, password })
    const token = jwt.sign({ user }, JWT_SECRET);;
    console.log(token)
    res.set("Authorization", token)
    return res.status(200).json({ token })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    console.log("hello6");
    const username = req.username;
    const courseId = req.params.courseId;
    // await User.updateOne({
    //     username: username
    // }, {
    //     "$push": {
    //         purchasedCourse: ObjectId(courseId)
    //     }
    // })
    res.status(200).json({ message: "hey there" })
    console.log(username);

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router