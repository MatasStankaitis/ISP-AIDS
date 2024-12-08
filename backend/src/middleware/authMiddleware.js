export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const hasRole = (...roles) => (req, res, next) => {
  if (req.session.user && roles.includes(req.session.user.role)) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};