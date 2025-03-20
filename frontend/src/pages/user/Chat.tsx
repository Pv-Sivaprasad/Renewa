import React, { useState, useEffect, useRef } from "react";
import { Send, Clock } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation } from "react-router";

type Message = {
  senderId: string;
  text: string;
  timeStamp: Date;
};

const socket: Socket = io('http://localhost:4000', {
  transports: ["polling", "websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 20000,
  path: '/chat/socket.io' 
});

const ChatInterface = () => {
  const location = useLocation();
  const userName = location.state?.userName;
  const docName = location.state?.docId;
  console.log('userName',userName,'docName',docName);
  
  // Get user name from Redux store if not provided in location state
  const reduxUserName = useSelector((state: RootState) => state.user.userName);
  
  // Use the provided names or fallback to defaults
  const CURRENT_USER = {
    id: "user123",
    name: userName || reduxUserName || 'User12',
    role: "patient" 
  };

  const DOCTOR_DATA = {
    id: "doc456",
    name: docName || "Dr. Smith"
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Connecting to Socket.IO...");

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket!");
      setIsConnected(true);
      fetchOrInitiateChat();
    });

    socket.on("connect_error", (err) => {
      console.error("❌ WebSocket Connection Error:", err);
      setIsConnected(false);
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ Disconnected from WebSocket.");
      setIsConnected(false);
    });

    socket.on("recieved message", (chatData) => {
      console.log("📩 New message received:", chatData);
      
      // If this is the first message (chat initiation), store the chat ID
      if (!chatId && chatData._id) {
        setChatId(chatData._id);
      }
      
      // Properly parse the date objects from the received messages
      if (chatData.messages && Array.isArray(chatData.messages)) {
        setMessages(
          chatData.messages.map((msg: any) => ({
            ...msg,
            timeStamp: new Date(msg.timeStamp)
          }))
        );
      }
    });

    return () => {
      console.log("Cleaning up WebSocket...");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("recieved message");
    };
  }, [chatId]);

  const fetchOrInitiateChat = async () => {
    try {
      if (!chatId) {
        const initiateData = {
          userId: CURRENT_USER.id,
          userName: CURRENT_USER.name,
          docId: DOCTOR_DATA.id,
          docName: DOCTOR_DATA.name
        };
        
        socket.emit("sendMessage", initiateData);
      }
    } catch (error) {
      console.error("Error fetching or initiating chat:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !isConnected || !chatId) return;

    // Create the message object
    const messageData = {
      chatId: chatId,
      senderId: CURRENT_USER.id,
      text: newMessage
    };

    // Add the message to local state immediately
    const localMessage: Message = {
      senderId: CURRENT_USER.id,
      text: newMessage,
      timeStamp: new Date()
    };
    
    // Update the local messages state
    setMessages(prev => [...prev, localMessage]);

    // Send the message to the server
    console.log("📤 Sending message:", messageData);
    socket.emit("sendMessage", messageData);
    
    // Clear the input field
    setNewMessage("");
  };

  const isCurrentUser = (senderId: string) => {
    return senderId === CURRENT_USER.id;
  };

  // Helper function to format date safely
  const formatMessageTime = (timestamp: Date | string) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown time";
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-4">
          <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
          <h1 className="text-xl font-semibold">
            {CURRENT_USER.role === "doctor" ? `Patient: ${CURRENT_USER.name}` : `Doctor: ${DOCTOR_DATA.name}`}
          </h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${isCurrentUser(message.senderId) ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                isCurrentUser(message.senderId) ? "bg-blue-500 text-white" : "bg-white border"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div
                className={`flex items-center gap-1 text-xs mt-1 ${
                  isCurrentUser(message.senderId) ? "text-blue-100" : "text-gray-500"
                }`}
              >
                <Clock className="w-3 h-3" />
                {formatMessageTime(message.timeStamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected || !chatId}
          />
          <button
            type="submit"
            className={`p-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isConnected && chatId ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isConnected || !chatId}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {!isConnected && (
          <p className="text-red-500 text-xs mt-1">
            Disconnected from chat server. Trying to reconnect...
          </p>
        )}
      </form>
    </div>
  );
};

export default ChatInterface;













// import React, { useState, useEffect, useRef } from "react";
// import { Send, Clock } from "lucide-react";
// import { io, Socket } from "socket.io-client";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { useLocation } from "react-router";



// type Message = {
//   senderId: string;
//   text: string;
//   timeStamp: Date;
// };


// const CURRENT_USER = {
//   id: "user123",
//   name: 'User12',
//   role: "patient" 
// };

// const DOCTOR_DATA = {
//   id: "doc456",
//   name: "Dr. Smith"
// };

// const socket: Socket = io('http://localhost:4000', {
//   transports: ["polling", "websocket"],
//   reconnection: true,
//   reconnectionAttempts: 5,
//   timeout: 20000,
//   path: '/chat/socket.io' 
// })

// const ChatInterface = () => {
//   const location=useLocation()
//     const userName=location.state?.userName
//     const docName=location.state?.docName
//     console.log(userName,'asdkfuyudas');
    

//   const name= useSelector((state: RootState) => state.user.userName);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [chatId, setChatId] = useState<string | null>(null);

//   useEffect(() => {
//     console.log("Connecting to Socket.IO...");

//     socket.on("connect", () => {
//       console.log("✅ Connected to WebSocket!");
//       setIsConnected(true);
      
    
//       fetchOrInitiateChat();
//     });

//     socket.on("connect_error", (err) => {
//       console.error("❌ WebSocket Connection Error:", err);
//       setIsConnected(false);
//     });

//     socket.on("disconnect", () => {
//       console.warn("⚠️ Disconnected from WebSocket.");
//       setIsConnected(false);
//     });

    
//     socket.on("recieved message", (chatData) => {
//       console.log("📩 New message received:", chatData);
      
//       // If this is the first message (chat initiation), store the chat ID
//       if (!chatId && chatData._id) {
//         setChatId(chatData._id);
//       }
      
//       // Update messages from the chat data
//       // if (chatData.messages && Array.isArray(chatData.messages)) {
//       //   setMessages(chatData.messages);
//       // }
//       if (chatData.messages && Array.isArray(chatData.messages)) {
//         setMessages(
//           chatData.messages.map(msg => ({
//             ...msg,
//             timeStamp: new Date(msg.timeStamp), 
//           }))
//         );
//       }
  
//     });

//     return () => {
//       console.log("Cleaning up WebSocket...");
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("recieved message");
//     };
//   }, [chatId]);

//   const fetchOrInitiateChat = async () => {
//     try {
      
//       if (!chatId) {
//         const initiateData = {
//           userId: CURRENT_USER.id,
//           userName: CURRENT_USER.name,
//           docId: DOCTOR_DATA.id,
//           docName: DOCTOR_DATA.name
//         };
        
        
//         socket.emit("sendMessage", initiateData);
//       }
//     } catch (error) {
//       console.error("Error fetching or initiating chat:", error);
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !isConnected || !chatId) return;

   
//     const messageData = {
//       chatId: chatId,
//       senderId: CURRENT_USER.id,
//       text: newMessage
//     };

//     console.log("📤 Sending message:", messageData);
//     socket.emit("sendMessage", messageData);

   
//     setNewMessage("");
//   };

  
//   const isCurrentUser = (senderId: string) => {
//     return senderId === CURRENT_USER.id;
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="bg-white border-b p-4">
//         <div className="flex items-center gap-4">
//           <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
//           <h1 className="text-xl font-semibold">
//             {CURRENT_USER.role === "doctor" ? `Patient: ${DOCTOR_DATA.name}` : `Doctor: ${DOCTOR_DATA.name}`}
//           </h1>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.length === 0 && (
//           <div className="text-center text-gray-500 py-8">
//             No messages yet. Start the conversation!
//           </div>
//         )}
        
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${isCurrentUser(message.senderId) ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[70%] rounded-lg p-3 ${
//                 isCurrentUser(message.senderId) ? "bg-blue-500 text-white" : "bg-white border"
//               }`}
//             >
//               <p className="text-sm">{message.text}</p>
//               <div
//                 className={`flex items-center gap-1 text-xs mt-1 ${
//                   isCurrentUser(message.senderId) ? "text-blue-100" : "text-gray-500"
//                 }`}
//               >
//                 <Clock className="w-3 h-3" />
//                 {new Date(message.timeStamp).toLocaleTimeString()}
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <form onSubmit={sendMessage} className="p-4 bg-white border-t">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={!isConnected || !chatId}
//           />
//           <button
//             type="submit"
//             className={`p-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               isConnected && chatId ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
//             }`}
//             disabled={!isConnected || !chatId}
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//         {!isConnected && (
//           <p className="text-red-500 text-xs mt-1">
//             Disconnected from chat server. Trying to reconnect...
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;































// import React, { useState, useEffect, useRef } from "react";
// import { Send, Clock } from "lucide-react";
// import { io, Socket } from "socket.io-client";

// type Message = {
//   id: string;
//   sender: "doctor" | "patient";
//   content: string;
//   timestamp: Date;
// };

// console.log(import.meta.env.VITE_CHAT_API_URL,'import.meta.env.VITE_CHAT_API_URL');


// // const socket: Socket = io(import.meta.env.VITE_CHAT_API_URL, {
// //   transports: ["websocket"],
// //   reconnection: true,
// //   reconnectionAttempts: 5,
// //   timeout: 20000,
// // });
// // const socket: Socket = io('http://localhost:4000/chat', {
// //   transports: ["polling", "websocket"],
// //   reconnection: true,
// //   reconnectionAttempts: 5,
// //   timeout: 20000,
// // });
// const socket: Socket = io('http://localhost:4000', {
//   transports: ["polling", "websocket"],
//   reconnection: true,
//   reconnectionAttempts: 5,
//   timeout: 20000,
//   path: '/chat/socket.io' 
// })

// const ChatInterface = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [userRole] = useState<"doctor" | "patient">("patient");

//   useEffect(() => {
//     console.log("Connecting to Socket.IO...");

//     socket.on("connect", () => {
//       console.log("✅ Connected to WebSocket!");
//     });

//     socket.on("connect_error", (err) => {
//       console.error("❌ WebSocket Connection Error:", err);
//     });

//     socket.on("disconnect", () => {
//       console.warn("⚠️ Disconnected from WebSocket.");
//     });

    
//     socket.on("received message", (message: Message) => {
//       console.log("📩 New message received from backend:", message);
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       console.log("Cleaning up WebSocket...");
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("received message");
//     };
//   }, []);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const message: Message = {
//       id: Date.now().toString(),
//       sender: userRole,
//       content: newMessage,
//       timestamp: new Date(),
//     };

//     console.log("📤 Sending message to backend:", message);
//     socket.emit("sendMessage", message);

//     setMessages((prev) => [...prev, message]);
//     setNewMessage("");
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="bg-white border-b p-4">
//         <div className="flex items-center gap-4">
//           <div className="h-3 w-3 rounded-full bg-green-500"></div>
//           <h1 className="text-xl font-semibold">
//             {userRole === "doctor" ? "Patient Consultation" : "Doctor Consultation"}
//           </h1>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.sender === userRole ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[70%] rounded-lg p-3 ${
//                 message.sender === userRole ? "bg-blue-500 text-white" : "bg-white border"
//               }`}
//             >
//               <p className="text-sm">{message.content}</p>
//               <div
//                 className={`flex items-center gap-1 text-xs mt-1 ${
//                   message.sender === userRole ? "text-blue-100" : "text-gray-500"
//                 }`}
//               >
//                 <Clock className="w-3 h-3" />
//                 {new Date(message.timestamp).toLocaleTimeString()}
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <form onSubmit={sendMessage} className="p-4 bg-white border-t">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;




// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Clock } from 'lucide-react';

// // Message type definition
// type Message = {
//   id: string;
//   sender: 'doctor' | 'patient';
//   content: string;
//   timestamp: Date;
// };

// const ChatInterface = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isConnected, setIsConnected] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [userRole] = useState<'doctor' | 'patient'>('patient'); 

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const message: Message = {
//       id: Date.now().toString(),
//       sender: userRole,
//       content: newMessage,
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, message]);
//     setNewMessage('');
   
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="bg-white border-b p-4">
//         <div className="flex items-center gap-4">
//           <div className="h-3 w-3 rounded-full bg-green-500"></div>
//           <h1 className="text-xl font-semibold">
//             {userRole === 'doctor' ? 'Patient Consultation' : 'Doctor Consultation'}
//           </h1>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${
//               message.sender === userRole ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div
//               className={`max-w-[70%] rounded-lg p-3 ${
//                 message.sender === userRole
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-white border'
//               }`}
//             >
//               <p className="text-sm">{message.content}</p>
//               <div
//                 className={`flex items-center gap-1 text-xs mt-1 ${
//                   message.sender === userRole ? 'text-blue-100' : 'text-gray-500'
//                 }`}
//               >
//                 <Clock className="w-3 h-3" />
//                 {message.timestamp.toLocaleTimeString()}
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <form onSubmit={sendMessage} className="p-4 bg-white border-t">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;