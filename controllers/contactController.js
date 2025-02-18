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
    try {
        const { user_id, created_by } = req.body;

        // Ensure required fields are provided
        if (!user_id || !created_by) {
            return res.status(400).json({
                status: "fail",
                message: "user_id and created_by are required"
            });
        }

        // First, check if any contact exists with the given created_by
        const existingCreatedBy = await Contact.findOne({ created_by });

        if (existingCreatedBy) {
            // If created_by exists, check for both user_id AND created_by together
            const existingContact = await Contact.findOne({ user_id, created_by });

            if (existingContact) {
                return res.status(400).json({
                    status: "fail",
                    message: "Contact already exists with this user_id and created_by"
                });
            }
        }

        // If no duplicate found, create a new contact
        await Contact.create(req.body);

        return res.status(201).json({
            status: "success",
            message: "Contact created successfully"
        });

    } catch (error) {
        console.error("Error in create API:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});
