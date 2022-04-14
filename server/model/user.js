const { string } = require("joi");
const { sign } = require("jsonwebtoken");
const mongoose = require("mongoose");
const joi = require("joi");
const passwordComlexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.config.JWTPrivateKey, { expiresIn: "7d" });
    return token;
};
const user = mongoose.model("user", userSchema);
const validate = data => {
    const Schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email: joi.string().required().label("E-mail"),
        password: passwordComlexity.string().required().label("Password"),
    });
};

module.exports = { user, validate };
