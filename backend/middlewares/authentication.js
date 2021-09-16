const admin = require("../firebase/index.js");
const User = require("../models/user");
exports.authenticationCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    //console.log("FIREBASE USER IN AUTHCHECK: ", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    //console.log("ERROR", err);
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email: email }).exec();
  if (adminUser.role !== "admin") {
    //console.log("HERE: ", adminUser.role);
    //console.log("ADMINUSER: ", adminUser);
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    //console.log("ADMINUSER: ", adminUser);
    next();
  }
};
