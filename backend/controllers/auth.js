import User from "../model/user.js"
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async(req, res) => {
    try{
     const {fullname, username  ,password, confirmPassword , gender} = req.body;
     const fullName = fullname.trim();
     const userName = username.trim();
     console.log(fullName,userName, password, confirmPassword, gender);
     if(!fullName || !userName || !password || !confirmPassword || !gender){
        res.status(400).send.json({error:"Please fill in all fields"});
     }
     if(password !== confirmPassword){
        res.status(400).send.json({error:"Password and confirm password does not match"});
     }
     const user = await User.findOne({userName});
     if(user){      
        return res.status(400).json({error:"User already exists"});
     }
     const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
	 const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     const newUser = new User({
        fullName,
        userName,
        password : hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    
    if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
        });
    } else {
        res.status(400).json({ error: "Invalid user data" });
    }
    }
    catch(error){
        res.status(400).json({ error: "Invalid user data" });
        console.log(error)
        
    }
    
  };
export const login = async (req, res) => {
    try {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			userName: user.userName,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
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
  