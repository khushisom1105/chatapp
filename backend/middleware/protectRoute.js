import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { setUser } from "./userDetail.js";
const protectRoute = async (req, res, next) => {
	try {
		console.log("req.cookies",req.cookies);
		const token = req.cookies.jwt;
		console.log("token",token);
		if(!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if(!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
		let user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        user = user.toObject();
		req.user = user;
        console.log("user",user);
        console.log("user._id",user._id.toString());
        setUser(user._id.toString());
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
export default protectRoute;