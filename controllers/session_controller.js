const { Users } = require("../models/config");
const check_session_controller = async (req, res) => {
    if (req.session.email) {
        const email = req.session.email;

        try {
            const user = await Users.findOne({ where: { email } });

            if (user) {
                if (user.email == "admin@admin") {
                    return "admin";
                } else if (user.email == email) {
                    return "user";
                }
            }
        } catch (error) {
            console.error(error);
            return "error";
        }
    } else {
        return "guest";
    }
};

module.exports = {
    check_session_controller,
    // session_controller,
};
