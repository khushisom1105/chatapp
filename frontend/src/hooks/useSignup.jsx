import {useState} from 'react'
import {toast} from 'react-hot-toast'
import {useAuthContext} from '../context/authContext'
 const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)    
    const {authUser , setAuthUser} = useAuthContext();
   const signup = async(inputs) => {
    console.log("This is inputs",inputs);
    const {fullname , username, password ,confirmPassword,gender} = inputs;
    console.log("after assignment",fullname , username, password ,confirmPassword,gender);
    const success = handleInputErrors(fullname , username, password ,confirmPassword,gender)
    if (!success) return;
    setLoading(true);
    try {
        const res = await fetch("http://localhost:8000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname , username, password ,confirmPassword,gender}),
            credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        if (data.error) {
            throw new Error(data.error);
        }
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  
   }
   return {loading, signup} 
}
export default useSignup;
function handleInputErrors(fullname , username, password ,confirmPassword,gender) {
    console.log("fullname",fullname,"username" , username, password ,confirmPassword,gender);
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  }