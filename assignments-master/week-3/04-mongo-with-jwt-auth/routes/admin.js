const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken")
const JWT_SECRET = "superman";

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    if (username && password) {
        const user = await Admin.create({ username, password })
        return res.status(201).json({ message: "Admin created" });
    }
    else {
        return res.status(401).json({ message: "Not able to create user" })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).json({ message: 'Missing username or password' })
    }
    const user = await Admin.findOne({ username })
    const token = jwt.sign({ user }, JWT_SECRET)
    console.log(token)
    res.set("Authorization", token)
    res.status(200).json({ token })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })

});

module.exports = router;