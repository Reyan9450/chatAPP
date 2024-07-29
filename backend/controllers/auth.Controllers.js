import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        // console.log(userName, password)
        if (!userName || !password) {
           
            return res.status(400).json({ msg: "All fields are required" });

        }

        const user = await User.findOne({ userName });
        if (!user) return res.status(400).json({ msg: "User does not exist" });


        const isMatch = await bcrypt.compare(password, user?.password||"");
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });


        generateToken(user._id, res);

        res.send({ user: user.fullName, msg: "Login Successful",_id:user._id ,profilePic:user.profilePic});

    }
    catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
        console.log(error);
    }
};

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        // Debug logging
        // console.log(fullName, userName, password, confirmPassword, gender);

        // Check for missing fields
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords don't match" });

        // Check if user already exists
        const user = await User.findOne({ userName });
        if (user) return res.status(400).json({ msg: "This user already exists" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Determine profile picture URL
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        const profilePic = gender === 'male' ? boyProfilePic : girlProfilePic;

        // Create a new user
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic
        });
        
        if(newUser){

            //Generate jwt token
             await generateToken(newUser._id,res);

            await newUser.save();
            console.log("User created");
            return res.json({ msg: "User created" });
        }
        
        // Save the user to the database


    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};

export const logout = (req, res) => {

    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
