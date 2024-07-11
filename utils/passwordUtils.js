const bcrypt = require("bcrypt");

exports.genPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch(err) {
        console.error('Error generating hash and salt for password' + err);
        throw err;
    }
}

exports.validatePassword = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password,hash);
        return match
    } catch(err) {
        console.error('Error validating password' + err);
        throw err;
    }
}