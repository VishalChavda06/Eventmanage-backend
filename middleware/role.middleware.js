const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ success: false, message: "Admin access required" });
};

const isOrganizer = (req, res, next) => {
  if (req.user && req.user.role === "organizer") {
    return next();
  }
  return res.status(403).json({ success: false, message: "Organizer access required" });
};

module.exports = {
  isAdmin,
  isOrganizer,
};
