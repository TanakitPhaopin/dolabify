import jwt from 'jsonwebtoken';

export const checkAuth = (req, res) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.status(401).json({ error: 'No Access Token' });
    }

    try {
        jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
        res.status(200).json({ message: 'Authenticated' });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid Access Token' });
    }
}

// Refresh token
export const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({ error: 'No Refresh Token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        const accessToken = jwt.sign(
            { user_id: decoded.user_id, username: decoded.username },
            process.env.ACCESS_JWT_SECRET,
            { expiresIn: '15s' }
        );
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 15 * 1000, // 15 seconds
        });
        res.status(200).json({ message: 'Access Token Refreshed' });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid Refresh Token' });
    }
}
