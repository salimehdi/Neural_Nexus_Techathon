"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Chatbot() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I assist you today?",
      sender: "AI",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const Menus = [
    { name: "Cases", href: "/case" },
    { name: "Connect", href: "/connect" },
    { name: "Evidence", href: "/evidence" },
    { name: "Crime Scene", href: "/crimeScene" },
    { name: "Reports", href: "/reports" },
    { name: "Settings", href: "/settings" },
  ];
  
  async function gemResp(question) {
    const apiKey = "AIzaSyACpDwXspWMdrsqHdM19akpMsg5g0Wkl3A";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
    // List of keywords related to police management & law
    const allowedKeywords = [
      "police", "law", "IPC", "penal code", "crime", "evidence", "arrest", "case",
      "court", "FIR", "witness", "justice", "investigation", "forensic", "trial"
    ];
  
    // Check if the question is related to allowed topics
    const isRelated = allowedKeywords.some(keyword =>
      question.toLowerCase().includes(keyword)
    );
  
    if (!isRelated) {
      return "This AI can only answer questions related to police management, Indian Penal Code, and law.";
    }
  
    // Check if the question relates to any menu category
    const matchedMenu = Menus.find(menu =>
      question.toLowerCase().includes(menu.name.toLowerCase())
    );
  
    if (matchedMenu) {
      router.push(matchedMenu.href);
      return `This query relates to ${matchedMenu.name}. Redirecting to ${matchedMenu.href}...`;
    }
  
    // Format the request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Please answer the following question as a person knowing all about Police management and Indian Penal Code, and some more details related to law: ${question}. Please try to answer under 50 words and in response just give the answer.`,
            },
          ],
        },
      ],
    };
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  
      return answer || "I couldn't find an answer. Please try rephrasing your question.";
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "An error occurred while fetching the response.";
    }
  }

  // async function gemResp(question) {
  //   const apiKey = "AIzaSyACpDwXspWMdrsqHdM19akpMsg5g0Wkl3A"; 
  //   const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  //   const requestBody = {
  //     contents: [{ parts: [{ text: `Please answer the following question as a person knowing all about Police management and indian penal code and some more details related to law :- ${question} ,,, please try to answer under 50 words and in response just give answer` }] }],
  //   };
  
  //   try {
  //     const response = await fetch(endpoint, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  
  //     const data = await response.json();
  //     const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  
  //     return answer
  //   } catch (error) {
  //     console.error("Error calling Gemini API:", error);
  //     return false; // Assume not educational if API fails
  //   }
  // }

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "User",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      const resp = await gemResp(inputMessage);
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: resp,
          sender: "AI",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="z-10 fixed bottom-4 right-4 bg-theme text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
        <MessageCircle size={24} />
      </button>
      {/* Chat Popover */}
      {chatOpen && (
        <div className="z-10 fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-theme text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-blue-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === "User" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "User"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {message.sender} • {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-theme text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
