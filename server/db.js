const mongoose = require("mongoose");
module.exports = () => {
    try {
        const connectionParams = { useNewUrlParser: true, useUnifiedTobology: true };
        mongoose.connect(process.config.DB);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
};
