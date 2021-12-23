const jwt = require('jsonwebtoken');
const User = require('./../models/UserModel');
const bcrypt = require('bcryptjs');

// 1)creating a function for creating a jwt token and taking user id as a paramater
const jwt_sign = (id) => {
  return (token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_END,
  }));
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt_sign(newUser._id);

    res.status(200).json({
      status: 'sucess',
      token,
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        messsage: 'please provide a vaild email and password',
      });
    }

    const user = await User.findOne({ email });

    const correct = await bcrypt.compare(password, user.password);

    if (!correct) {
      return res.status(400).json({
        status: 'fail',
        message: 'incorrect email or password',
      });
    }

    const token = jwt_sign(user._id);

    res.status(200).json({
      status: 'sucess',
      message: 'sucessfully logged in',
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getdata = async (req, res) => {
  try {
    res.status(200).json({
      status: 'sucess',
      data: {
        sampledata: 'this is sample data',
      },
    });
  } catch (err) {
    console.log(err);
  }
};
