const router = require("express").Router();
const { User, validate } = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const error = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const user = await user.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "user with given email already exist!" });
        const salt = await bcrypt.genSalt(Number(process.config.salt));
        const hashPassword = await bcrypt.hashPassword(req.body.password, salt);
        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "user created successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
