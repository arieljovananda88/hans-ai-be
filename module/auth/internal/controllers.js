const userDatabase = require('../../users/internal/repository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
};


async function login(req, res) {
    try {
        const user = await userDatabase.getUserByEmail(req.body.email)
         if (!user) {
            return res.status(404).json({
                isSuccess: false,
                messages: ["User not found"],
                data: []
            });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                isSuccess: false,
                messages: ["Invalid password"],
                data: []
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, // Retrieve from .env
            { expiresIn: '600000' }
        );

        res.cookie('auth_token', token, COOKIE_OPTIONS);

        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: {
                id: user.id,
                email: user.email,
                token: token
            }
        });
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            messages: [
                err
            ],
            data: []
        })
    }
}

module.exports = {
    login,
}