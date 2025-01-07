import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const user = localStorage.getItem("chat-user");
        const res = await fetch(`http://localhost:8000/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user,
          },
		  credentials: "include",
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
        console.log(data, "data");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
