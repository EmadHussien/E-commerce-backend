const verifyRoles = () => {
  return (req, res, next) => {
    console.log(req.roles.isAdmin);
    if (!req?.roles) return res.sendStatus(401);
    if (!req.roles.isAdmin) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
