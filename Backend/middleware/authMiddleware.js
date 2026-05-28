import jwt from "jsonwebtoken";


// VERIFY TOKEN MIDDLEWARE

export const verifyToken = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        // Check token exists
        if (!authHeader) {

            return res.status(401).json({
                message: "No token provided"
            });

        }

        // Remove Bearer from token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY
        );

        // Store user data in request
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};


// ADMIN MIDDLEWARE

export const isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Access denied. Admin only."
        });

    }

    next();

};