"use client";

import { useRef, useState, useEffect } from "react";
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
  
    // Allowed keywords for nutrition advice
    const allowedKeywords = [
      "nutrition", "diet", "protein", "carbs", "fats", "vitamins", "minerals", "calories", "meal", "plan", "healthy", "food"
    ];
  
    // Check if the question is related to nutrition topics
    const isRelated = allowedKeywords.some(keyword =>
      question.toLowerCase().includes(keyword)
    );
  
    if (!isRelated) {
      return "I can only provide nutrition advice. Please ask me something about nutrition.";
    }
  
    // Predefined nutrition assistant prompt
    const nutritionAssistantPrompt = `
  You are a nutrition assistant, and you should only provide advice on nutrition topics such as:
  1. Basics of a balanced diet.
  2. Macronutrients (carbs, proteins, fats) and their benefits.
  3. Micronutrients (vitamins, minerals) and their importance.
  4. Healthy meal planning and food choices.
  5. Dietary recommendations for different fitness goals (weight loss, muscle gain, maintenance).
  6. Output should be less than 50 words.
  If the user asks anything beyond these topics, do not help.
  Question: ${question}
    `;
  
    // Format the request body for the Gemini API
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: nutritionAssistantPrompt,
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
  
      // Helper to ensure the answer contains nutrition-related keywords
      const checkNutritionResponse = (responseText) => {
        const nutritionKeywords = [
          "nutrition", "diet", "protein", "carbs", "fats", "vitamins", "minerals", "calories", "meal plan", "healthy food"
        ];
        return nutritionKeywords.some(keyword => responseText.toLowerCase().includes(keyword));
      };
  
      if (!answer || !checkNutritionResponse(answer)) {
        return "I can only provide nutrition advice. Please ask me something about nutrition.";
      }
  
      return answer;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "An error occurred while fetching the response.";
    }
  }

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            <div ref={messagesEndRef} />
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