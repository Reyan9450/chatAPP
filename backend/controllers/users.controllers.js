import express from "express";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";


export const getUsersForSidebar = async (req, res) => {
    try {
        
        const filteredUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        res.send(filteredUsers);
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
        console.log(error);
    }
}