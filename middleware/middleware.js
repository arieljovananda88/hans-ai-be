const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const tokenString = req.headers.cookie;
    const token = tokenString.replace('auth_token=', '');

    if (!token) {
        return res.status(401).json({
            isSuccess: false,
            messages: ["Access denied. No token provided."],
            data: []
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(500).json({
            isSuccess: false,
            messages: [err],
            data: []
        });
    }
}

module.exports = authenticateToken;