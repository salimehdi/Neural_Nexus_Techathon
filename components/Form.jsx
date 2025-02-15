import React, { useState } from 'react';

const Form = () => {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    dietaryPreferences: '',
    fitnessGoal: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setShowForm(false); // Close form after submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!showForm) return null;

  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Complete Your Profile</h2>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height (cm)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="dietaryPreferences"
          value={formData.dietaryPreferences}
          onChange={handleChange}
          placeholder="Dietary Preferences (e.g., Vegan, Keto)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="fitnessGoal"
          value={formData.fitnessGoal}
          onChange={handleChange}
          placeholder="Fitness Goal (e.g., Weight Loss, Muscle Gain)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="w-1/2 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;