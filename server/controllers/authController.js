const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const store = require('./memoryStore');

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET || 'flipkart_access_jwt_secret_super_secure_key_2026', { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || 'flipkart_refresh_jwt_secret_super_secure_key_2026', { expiresIn: '30d' });
};

const sendTokenResponse = (user, statusCode, res) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res
    .status(statusCode)
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    .json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses || [],
        role: user.role || 'customer'
      },
      accessToken
    });
};

exports.loginOrRegister = async (req, res) => {
  try {
    const { identifier, password, isOtp, name } = req.body;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Mobile number or Email is required.' });
    }

    const isPhone = /^[6-9]\d{9}$/.test(identifier);

    // If Mongoose is connected
    if (mongoose.connection.readyState === 1) {
      const query = isPhone ? { phone: identifier } : { email: identifier.toLowerCase() };
      let user = await User.findOne(query).select('+password');

      if (isOtp) {
        if (!user) {
          user = await User.create({
            ...(isPhone ? { phone: identifier } : { email: identifier.toLowerCase() }),
            name: name || (isPhone ? `User ${identifier.slice(-4)}` : identifier.split('@')[0])
          });
        }
        return sendTokenResponse(user, 200, res);
      }

      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your password.' });
      }

      return sendTokenResponse(user, 200, res);
    }

    // Resilient In-Memory Fallback
    let user = store.users.find(u => u.phone === identifier || u.email === identifier.toLowerCase());
    if (!user) {
      user = {
        _id: 'user_' + Math.random().toString(36).substring(2, 9),
        phone: isPhone ? identifier : '9876543210',
        email: !isPhone ? identifier.toLowerCase() : `${identifier}@example.com`,
        name: name || (isPhone ? `User ${identifier.slice(-4)}` : identifier.split('@')[0]),
        addresses: store.users[0].addresses,
        role: 'customer'
      };
      store.users.push(user);
    }

    return sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'No refresh token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'flipkart_refresh_jwt_secret_super_secure_key_2026');
    const newAccessToken = generateAccessToken(decoded.id);

    res
      .cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000
      })
      .json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ success: false, message: 'Session expired. Please log in again.' });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

exports.addAddress = async (req, res) => {
  try {
    const newAddress = {
      _id: 'addr_' + Date.now(),
      ...req.body
    };

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id);
      if (req.body.isDefault) {
        user.addresses.forEach(a => a.isDefault = false);
      }
      user.addresses.push(newAddress);
      await user.save();
      return res.status(201).json({ success: true, addresses: user.addresses });
    }

    // Memory Store
    const user = store.users.find(u => String(u._id) === String(req.user._id)) || store.users[0];
    if (req.body.isDefault) {
      user.addresses.forEach(a => a.isDefault = false);
    }
    user.addresses.push(newAddress);
    res.status(201).json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = (req, res) => {
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({ success: true, message: 'Logged out successfully' });
};
