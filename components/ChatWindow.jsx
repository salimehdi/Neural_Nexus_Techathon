import { useState, useEffect, useRef } from "react";

const ChatWindow = ({ onClose, onSend, response, prompt, setPrompt }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

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
    Only respond with nutrition advice based on the topics listed above.
  `;

  const handleSend = () => {
    if (prompt.trim()) {
      const newMessages = [...messages, { sender: "user", content: prompt }];
      setMessages(newMessages);
      onSend(nutritionAssistantPrompt + "\n" + prompt);
      setPrompt("");
    }
  };

  useEffect(() => {
    if (response) {
      const isNutritionResponse = checkNutritionResponse(response);
      if (isNutritionResponse) {
        setMessages(prevMessages => [...prevMessages, { sender: "ai", content: response }]);
      } else {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: "ai",
            content: "I can only provide nutrition advice. Please ask me something about nutrition.",
          },
        ]);
      }
    }
  }, [response]);

  const checkNutritionResponse = response => {
    const nutritionKeywords = [
      "nutrition", "diet", "protein", "carbs", "fats", "vitamins", "minerals", "calories", "meal plan", "healthy food"
    ];
    return nutritionKeywords.some(keyword => response.toLowerCase().includes(keyword));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClose = () => {
    onClose();
    setMessages([]);
  };

  return (
    <div className="fixed bottom-16 right-4 w-96 h-120 bg-white border rounded-lg shadow-lg flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">Nutrition Assistant</h2>
        <button onClick={handleClose} className="text-red-500 font-bold">✕</button>
      </div>
      <div className="p-4 h-64 overflow-y-auto flex flex-col-reverse space-y-4" style={{ overflowY: "auto" }}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="max-w-xs p-3 rounded-lg self-start bg-gray-100 text-gray-700">
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === "user"
                  ? "self-end bg-green-500 text-white rounded-br-none"
                  : "self-start bg-gray-200 text-gray-700 rounded-bl-none"
              }`}
            >
              <p>{message.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t flex flex-col">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full p-2 border rounded-lg h-24 mb-2"
          rows="3"
          placeholder="Ask me about nutrition..."
        ></textarea>
        <button onClick={handleSend} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;