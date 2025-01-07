import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sound.mp3";
import { getId } from "../components/sidebar/IdConversation";111

const useListenMessages = () => {

	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			console.log("new",newMessage);
			console.log("old",messages[0].senderId);
			const id = getId();
	        if( id === newMessage.senderId) {
				setMessages([...messages, newMessage]);
				console.log("yes");
			}
			
		    else 
			{
				console.log("no");
				return
			}
		
			//setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;