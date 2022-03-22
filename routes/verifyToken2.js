const jwt = require("jsonwebtoken");

const verifyToken2 = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, student) => {
      if (err) res.status(403).json("Token is not valid!");
      req.student = student;
      console.log("Hello World!");
      console.log(req.student.id);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization2 = (req, res, next) => {
  verifyToken2(req, res, () => {
    if (req.student.id === req.params.id ) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };

module.exports = {

  verifyToken2,
  verifyTokenAndAuthorization2
  
//   verifyTokenAndAdmin,
};