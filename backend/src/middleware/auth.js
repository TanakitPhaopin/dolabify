import jwt from 'jsonwebtoken';

export const verifyAuth = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.status(401).json({ error: 'No Access Token' });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
        req.user = decoded; // Attach decoded token to request object
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid Access Token' });
    }
}

export default verifyAuth;