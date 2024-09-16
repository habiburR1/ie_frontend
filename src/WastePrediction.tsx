import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";
import './WastePrediction.css';  // Import CSS file

// Register necessary Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface FormData {
  household_size: string;
  recycling_habits: 'Rarely' | 'Occasionally' | 'Regularly';
  compost: 'Yes' | 'No';
  large_item_disposal: 'Never' | 'Occasionally' | 'Once a year';
}

interface PredictionResponse {
  predicted_waste: { [key: string]: number };  // Dictionary of waste categories
}

const WastePrediction: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    household_size: '2',
    recycling_habits: 'Occasionally',
    compost: 'No',
    large_item_disposal: 'Never',
  });

  const [wasteCategories, setWasteCategories] = useState<{ [key: string]: number } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value as string,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<PredictionResponse>(
        `http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/predict/`,
        formData
      );
      setWasteCategories(response.data.predicted_waste);  // Set the waste breakdown
    } catch (error) {
      console.error('Error making prediction request:', error);
    }
  };

  const totalWaste = wasteCategories
    ? Object.values(wasteCategories).reduce((acc, cur) => acc + cur, 0)
    : 0;

  const chartData = {
    labels: wasteCategories ? Object.keys(wasteCategories) : [],
    datasets: [
      {
        label: 'Residential Waste by Category (kg)',
        data: wasteCategories ? Object.values(wasteCategories) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Waste (kg)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Household Waste Prediction Breakdown',
      },
    },
  };

  return (
    <div className="full-page">
      <Header />
      <div className="waste-prediction-container">
        <h1 className="title">Waste Prediction Tool</h1>
        <p className="explanation">
          This tool predicts how much waste your household is likely to generate based on various factors such as household size, recycling habits, composting, and large item disposal habits. The breakdown below shows the estimated amounts of different types of waste.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label">
            Household Size:
            <select className="form-select" name="household_size" value={formData.household_size} onChange={handleChange}>
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4+ people</option>
            </select>
          </label>

          <label className="form-label">
            Recycling Habits:
            <select className="form-select" name="recycling_habits" value={formData.recycling_habits} onChange={handleChange}>
              <option value="Rarely">Rarely</option>
              <option value="Occasionally">Occasionally</option>
              <option value="Regularly">Regularly</option>
            </select>
          </label>

          <label className="form-label">
            Compost:
            <select className="form-select" name="compost" value={formData.compost} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="form-label">
            Large Item Disposal:
            <select className="form-select" name="large_item_disposal" value={formData.large_item_disposal} onChange={handleChange}>
              <option value="Never">Never</option>
              <option value="Occasionally">Occasionally</option>
              <option value="Once a year">Once a year</option>
            </select>
          </label>

          <button className="form-button" type="submit">Predict Residential Waste</button>
        </form>

        {wasteCategories && (
          <div className="prediction-result">
            <h2 className="total-waste">Total Predicted Residential Waste: {totalWaste.toFixed(2)} kg</h2>
            <h2>Predicted Waste Breakdown (kg):</h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WastePrediction;
