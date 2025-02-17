const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
var request = require('request');
const express = require('express');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const path = require('path');
const { userJoin } = require('./../utils/users');
const Contact = require('./../models/contactModel');

exports.create = catchAsync(async (req, res, next) => {
 
    await Contact.create(req.body);
    return res.status(200).json({
        status: "success",
        message: "Contact create Sucessfully"
    })
});
