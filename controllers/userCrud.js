const axios = require('axios');
const { authSchema } = require('../helpers/validation');
const { create, findOne, find, deleteOne, updateOne } = require('../utils/connector');
const { signAccessToken } = require('../helpers/jwtHelper');
require('dotenv').config();

const baseUrl = process.env.BASE_URL;



module.exports = {
    register: async (req, res) => {
        const { error } = authSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        try {
            const existingUserResponse = await findOne("User", { email: req.body.data.email })
            if (existingUserResponse?.data) {
                return res.status(400).json({ message: 'Email already exists' })
            }
            const response = await create(
                'User',
                req.body.data
            );
            const user=response?.data
            const accessToken = await signAccessToken(user._id);


            res.status(201).json({user,accessToken});
        } catch (error) {
            console.error(error);
            res.status(error.response?.status || 500).send({ error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body.data;
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }
            const userResponse = await findOne("User", { email });
            const user = userResponse?.data;
            console.log("Fetched user:", user);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            if (user.password !== password) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const accessToken = await signAccessToken(user._id);
            res.status(200).json({ message: "Login successful", user, token: accessToken });
        } catch (error) {
            console.error("Error in login:", error.message || error);
            res.status(error.response?.status || 500).json({ error: "An error occurred during login" });
        }
    },
    findUser:async(req,res)=>{
        try {
            const response = await findOne("User", { email: req.body.data.email }); 
            res.status(200).send(response.data);
            } catch (error) {
                console.error(error);
                res.status(error.response?.status || 500).send({ error: error.message });
                }
    },
    findAll: async (req, res) => {
        try {
            const response = await find("User");
            res.send(response.data);
        } catch (error) {
            console.error(error);
            res.status(error.response?.status || 500).send({ error: error.message });
        }
    },
    

    deleteUser: async (req, res) => {
        try {
            const email = req.body.data;
            if (!email) {
                return res.status(400).json({ error: "Email is required" });
            }
            const response = await deleteOne("User", email);
            if (response) {
                return res.status(200).json({ message: "User deleted successfully", data: response });
            } else {
                return res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.error("Error in deleting user:", error);
            return res.status(500).json({ error: "An error occurred while deleting the user" });
        }
    },
    updateUser: async (req, res) => {
        try {
            const filterEmail = req.body.filter
            if (!filterEmail) {
                return res.status(400).json({
                    error: "Email is required"
                });
            }
            const { email, name, password } = req.body.data;
            const filter={email:filterEmail}

            const response = await updateOne("User", filter, { email: filterEmail, name, password });
            if (!response) {
                return res.status(500).json({ error: "Failed to update user" });
            }
            return res.status(200).json({ message: "User updated successfully", data: response });

        } catch (error) {
            console.error("Error in updateUser:", error.message || error);
            return res.status(500).json({ error: "An unexpected error occurred" });

        }
    }
};

