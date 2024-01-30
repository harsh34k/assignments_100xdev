const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    if (username && password) {
        const user = await Admin.create({ username, password });
        return res.status(200).send("admin created succesfully")
    }
    else {
        return res.status(400).json('Please provide username and password');

    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body;
    const newCourse = await Course.create({ title, description, price, imageLink })
    if (newCourse) {
        return res.status(201).send("course created succesfully");
    }
    else {
        return res.status(500).send("unable to create course");
    }


});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })
});

module.exports = router;