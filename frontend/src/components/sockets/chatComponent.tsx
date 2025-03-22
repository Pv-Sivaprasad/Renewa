import React, { useState, useEffect, useRef } from "react";
import { Send, Clock } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";

// Define types
type Message = {
  senderId: string;
  text: string;
  timeStamp: Date;
};

type ChatProps = {
  role: "doctor" | "user";
  userId?: string;
  userName?: string;
  partnerId?: string;
  partnerName?: string;
};

// Create a singleton socket instance
const socket: Socket = io('http://localhost:4000', {
  transports: ["polling", "websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 20000,
  path: '/chat/socket.io' 
});

const ChatInterface: React.FC<ChatProps> = ({ 
  role = "user", 
  userId: propUserId, 
  userName: propUserName,
  partnerId: propPartnerId,
  partnerName: propPartnerName
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from location state if available
  const locationUserName = location.state?.userName;
  const locationPartnerId = location.state?.partnerId;
  const locationPartnerName = location.state?.partnerName;
  
  // Get data from Redux store
  const reduxUserName = useSelector((state: RootState) => state.user.userName);
  const reduxUserId = useSelector((state: RootState) => state.user.userId);
  
  // Use the provided names or fallback to defaults
  const USER_DATA = {
    id: propUserId || reduxUserId || `user-${Date.now()}`,
    // id: propUserId ||`user-${Date.now()}`,

    name: propUserName || locationUserName || reduxUserName || 'Anonymous User',
    role: role 
  };

  const PARTNER_DATA = {
    id: propPartnerId || locationPartnerId || `partner-${Date.now()}`,
    name: propPartnerName || locationPartnerName || (role === "doctor" ? "Patient" : "Dr. Default")
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`Initializing chat as ${role} (${USER_DATA.name}) with ${PARTNER_DATA.name}`);
    
    // Socket connection handlers
    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket!");
      setIsConnected(true);
      fetchOrInitiateChat();
    });

    socket.on("connect_error", (err) => {
      console.error("❌ WebSocket Connection Error:", err);
      setIsConnected(false);
      setError("Failed to connect to chat server. Please try again later.");
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ Disconnected from WebSocket.");
      setIsConnected(false);
    });

    // Chat message handlers
    socket.on("recieved message", (chatData) => {
      console.log("📩 New message received:", chatData);
      
      // Store the chat ID if this is the first message
      if (!chatId && chatData._id) {
        setChatId(chatData._id);
      }
      
      // Parse the messages and update state
      if (chatData.messages && Array.isArray(chatData.messages)) {
        setMessages(
          chatData.messages.map((msg: any) => ({
            ...msg,
            timeStamp: new Date(msg.timeStamp)
          }))
        );
      }
    });

    socket.on("error", (errorData) => {
      console.error("Server error:", errorData);
      setError(errorData.message || "An error occurred with the chat service");
    });

    // Clean up on unmount
    return () => {
      console.log("Cleaning up WebSocket listeners...");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("recieved message");
      socket.off("error");
    };
  }, [role, USER_DATA.name, PARTNER_DATA.name, chatId]);

  const fetchOrInitiateChat = async () => {
    try {
      // If we already have a chat ID, we can fetch the chat
      if (chatId) {
        socket.emit("fetchChat", { chatId });
        return;
      }
      
      // Otherwise, initialize a new chat
      const initiateData = {
        userId: USER_DATA.id,
        userName: USER_DATA.name,
        partnerId: PARTNER_DATA.id,
        partnerName: PARTNER_DATA.name,
        initiatorRole: role
      };
      
      console.log("Initiating chat with data:", initiateData);
      socket.emit("sendMessage", initiateData);
    } catch (error) {
      console.error("Error fetching or initiating chat:", error);
      setError("Failed to start chat session. Please try again.");
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
    // if (!newMessage.trim() || !isConnected || !chatId) return;

    // Create the message object
    const messageData = {
      chatId: chatId,
      senderId: USER_DATA.id,

      text: newMessage
    };
    console.log(messageData,'message_+_+')
    socket.emit("sendMessage", messageData);

   
    const localMessage: Message = {
      senderId: USER_DATA.id,
      text: newMessage,
      timeStamp: new Date()
    };
    
  
    setMessages(prev => [...prev, localMessage]);

   
    console.log("📤 Sending message:", messageData);
    socket.emit("sendMessage", messageData);
    
  
    setNewMessage("");
  };

  const isCurrentUser = (senderId: string) => {
    return senderId === USER_DATA.id;
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

  const handleEndChat = () => {
    if (chatId) {
      socket.emit("endChat", { chatId });
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
            <h1 className="text-xl font-semibold">
              {role === "doctor" ? `Patient: ${PARTNER_DATA.name}` : `Doctor: ${PARTNER_DATA.name}`}
            </h1>
          </div>
          <button 
            onClick={handleEndChat}
            className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100"
          >
            End Chat
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

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
            // disabled={!isConnected || !chatId}
          />
          <button
            type="submit"
            className={`p-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isConnected && chatId ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 "
            }`}
            // disabled={!isConnected || !chatId}
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