const jsonwebtoken = require('jsonwebtoken');
const { verify } = jsonwebtoken;
const { JWT_SECRET } = require('../utility/keys.js');

const verifyToken = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized - no token provided',
		});
	}

	try {
		const decoded = verify(token, JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized - invalid token',
			});
		}
		req.user = decoded; // Attach the decoded token to the request object
		req.userRole = decoded.role; // Attach user role if available
		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log('Error in verifyToken ', error);
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		const userRole = req.user?.role;
		if (!userRole || !roles.includes(userRole)) {
			return res.status(403).json({
				success: false,
				message: 'Forbidden - insufficient permissions',
			});
		}
		next();
	};
};

module.exports = {
	verifyToken,
	authorizeRoles,
};
