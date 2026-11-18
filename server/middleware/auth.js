import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  // Handle demo token if needed
  if (token.startsWith('demo-jwt-token-')) {
    req.user = { username: 'admin', role: 'admin' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'deepuuu_super_secret_jwt_key_2026');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
