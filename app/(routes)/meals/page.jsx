"use client";

import { useState } from "react";
import axios from "axios";

const Page = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userHealth, setUserHealth] = useState({
    age: "",
    weight: "",
    dietaryRestrictions: "",
  });

  const handleChange = (e) => {
    setUserHealth({ ...userHealth, [e.target.name]: e.target.value });
  };

  const fetchGroqResponse = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/groq", {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Suggest a diet plan for a ${userHealth.age}-year-old person weighing ${userHealth.weight} kg with dietary restrictions: ${userHealth.dietaryRestrictions}.`,
              },
            ],
          },
        ],
      });
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Personalized Diet Plan</h1>

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={userHealth.age}
        onChange={handleChange}
        className="border p-2 m-2"
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={userHealth.weight}
        onChange={handleChange}
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="dietaryRestrictions"
        placeholder="Dietary Restrictions"
        value={userHealth.dietaryRestrictions}
        onChange={handleChange}
        className="border p-2 m-2"
      />

      <button
        onClick={fetchGroqResponse}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Get Diet Plan
      </button>

      {loading && <p>Loading...</p>}
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
};

export default Page;
