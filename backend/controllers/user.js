const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        try {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            await user.save();
            res.status(201).json({ message: "signup succes" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user === null) {
            res.status(401).json({ message: "email/mdp incorrect" });
        } else {
            try {
                const compare = await bcrypt.compare(
                    req.body.password,
                    user.password,
                );
                if (!compare) {
                    res.status(401).json({ message: "email/mdp incorrect" });
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: "24h" },
                        ),
                    });
                }
            } catch (err) {
                res.status(500).json({ message: "error" });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
