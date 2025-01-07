import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import cookieParser from "cookie-parser";

// const getCookie = (name) => {
// 	const value = `; ${document.cookie}`;
// 	const parts = value.split(`; ${name}=`);
// 	if (parts.length === 2) return parts.pop()?.split(';').shift();
// 	return undefined;
//   };

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	
	const login = async(username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("http://localhost:8000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userName:username, password }),
				credentials: 'include'
			},
		
		);
			console.log(document.cookie,"This Is Cookies");
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			// const token = getCookie('jwt');
			// console.log(token);
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}
	return true;
}