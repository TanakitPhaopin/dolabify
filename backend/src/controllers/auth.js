import jwt from 'jsonwebtoken';

// Check access, if not valid check refresh token
export const checkAuth = (req, res) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    if (!accessToken && !refreshToken) {
        return res.status(401).json({ error: 'No Access Token or Refresh Token' });
    }

    try {
        jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
        return res.status(200).json({ message: 'Authenticated' });
    } catch (error) {
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
                const newAccessToken = jwt.sign(
                    { user_id: decoded.user_id, username: decoded.username },
                    process.env.ACCESS_JWT_SECRET,
                    { expiresIn: '15m' }
                );
                res.cookie('access_token', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Set secure flag in production
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    maxAge: 15 * 60 * 1000, // 15 minutes
                });
                return res.status(200).json({ message: 'Authenticated with new Access Token' });
            } catch (error) {
                return res.status(403).json({ error: 'Invalid Refresh Token' });
            }
        } else {
            return res.status(403).json({ error: 'Invalid Refresh Token' });
        }
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
            { expiresIn: '15m' }
        );
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.status(200).json({ message: 'Access Token Refreshed' });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid Refresh Token' });
    }
}

// Logout user
export const logoutUser = (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};