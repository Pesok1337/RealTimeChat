import { useState } from "react";
import { WaitingRoom } from "./components/WaitingRoom.jsx";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Chat } from "./components/Chat.jsx";

const App = () => {
	const [connection, setConnection] = useState();
	const [messages, setMessages] = useState([]);

	const joinChat = async (userName, chatRoom) => {
		var connection = new HubConnectionBuilder()
			.withUrl("http://localhost:5022/chat")
			.withAutomaticReconnect()
			.build();

		connection.on("ReceiveMessage", (userName, message) => {
			setMessages((messages) => [...messages, { userName, message }]);
		});

		connection
			.start()
			.then(() => connection.invoke("JoinChat", { userName, chatRoom }));

		setConnection(connection);
	};

	const sendMessage = async (message) => {
		await connection.invoke("SendMessage", message);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			{connection ? (
				<Chat messages={messages} sendMessage={sendMessage} />
			) : (
				<WaitingRoom joinChat={joinChat} />
			)}
		</div>
	);
};

export default App;
