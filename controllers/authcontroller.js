// creating middleware to check if the token exists or not before allowing user to access certain protected area
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  // 1)checking if token exists or not
  let token;
  token = req.headers.token;
  if (!token) {
    return res.status(400).json({
      status: 'fail',
      message: 'no token provided',
    });
  }

  // 2)verifying if token is correct or not
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(400).json({
      status: 'fail',
      meassage: 'token expired or token unidentifed',
    });
  }

  // 3)if token exist and is valid then go to the next middleware
  next();
};
