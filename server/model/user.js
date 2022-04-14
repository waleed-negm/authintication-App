const { string } = require("joi");
const { sign } = require("jsonwebtoken");
const mongoose = require("mongoose");
const joi = require("joi");
const passwordComlexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: string, required: true },
    lastName: { type: string, required: true },
    email: { type: string, required: true },
    password: { type: string, required: true },
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
