import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

export const Chat = ({ messages, sendMessage }) => {
	const [message, setMessage] = useState();

	const onSendMessage = () => {
		sendMessage(message);

		setMessage("");
	};

	return (
		<div className="w-1/2 bg-white p-8 rounded shadow-lg">
			<div className="flex flex-col overflow-auto h-96  w-full max-w-md gap-3 pb-3">
				{messages.map((msg, index) => (
					<div key={index} className="w-fit ">
						<span className="text-sm text-slate-600">{msg.userName}</span>
						<div className="p-2 bg-gray-100 rounded-lg shadow-md">
							{msg.message}
						</div>
					</div>
				))}
			</div>
			<div className="flex gap-3">
				<Input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Введите сообщение"
				/>

				<Button colorScheme="blue" onClick={onSendMessage}>
					Отправить
				</Button>
			</div>
		</div>
	);
};
