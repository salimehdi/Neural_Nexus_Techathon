const config = {
    AI_API_ENDPOINT: "https://api.example.com/chat", // Replace with your actual AI API endpoint
    MAX_RESPONSE_LENGTH: 50, // Limit response length to ensure concise answers
    ALLOWED_TOPICS: [
      "balanced diet",
      "macronutrients",
      "micronutrients",
      "meal planning",
      "healthy food choices",
      "dietary recommendations",
    ],
    ERROR_MESSAGE: "I can only provide nutrition advice. Please ask me something about nutrition.",
    THEME: {
      primaryColor: "#34D399", // Green shade for nutrition-related theme
      secondaryColor: "#A7F3D0",
      userMessageColor: "#10B981",
      aiMessageColor: "#D1FAE5",
    },
  };
  
  export default config;