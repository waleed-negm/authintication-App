const router = require("express").Router();
const { User } = require("../model/user");
const joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const error = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const user = await user.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "invalid email or password" });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "invalid email or password" });
        const token = user.generatAuthToken();
        res.status(200).send({ message: "login successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
const validate = data => {
    const Schema = joi.object({
        email: joi.string().required().label("E-mail"),
        password: joi.string().required().label("Password"),
    });
    return Schema.validate(data);
};

module.exports = router;
