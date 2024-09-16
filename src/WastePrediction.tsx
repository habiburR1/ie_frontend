import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// @ts-ignore
import Header from './Header.tsx';
// @ts-ignore
import Footer from './Footer.tsx';
import './WastePrediction.css';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const WastePrediction: React.FC = () => {
  const [formData, setFormData] = useState({
    household_size: '2',
    recycling_habits: 'Occasionally',
    compost: 'No',
    large_item_disposal: 'Never',
  });

  useEffect(() => {
    document.title = "Waste Prediction - Green Melb";
}, []);

  const [wasteCategories, setWasteCategories] = useState<{ [key: string]: number } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/predict/`, formData);
      setWasteCategories(response.data.predicted_waste);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const chartData = {
    labels: wasteCategories ? Object.keys(wasteCategories) : [],
    datasets: [
      {
        label: 'Waste (kg)',
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
        text: 'Waste Breakdown by Category',
      },
    },
  };

  return (
    <div className="full-page">
      <Header />
      <div className="waste-prediction-container">
        <h1 className="title">Waste Prediction</h1>
        <p className="explanation">
          Get insights on your household waste based on size, recycling, composting, and item disposal habits per month.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Household Size:</label>
            <select name="household_size" value={formData.household_size} onChange={handleChange} className="form-select">
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4+ people</option>
            </select>
          </div>

          <div className="form-group">
            <label>Recycling Habits:</label>
            <select name="recycling_habits" value={formData.recycling_habits} onChange={handleChange} className="form-select">
              <option value="Rarely">Rarely</option>
              <option value="Occasionally">Occasionally</option>
              <option value="Regularly">Regularly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Compost:</label>
            <select name="compost" value={formData.compost} onChange={handleChange} className="form-select">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Large Item Disposal:</label>
            <select name="large_item_disposal" value={formData.large_item_disposal} onChange={handleChange} className="form-select">
              <option value="Never">Never</option>
              <option value="Occasionally">Occasionally</option>
              <option value="Once a year">Once a year</option>
            </select>
          </div>

          <button type="submit" className="form-button">Predict Waste</button>
        </form>

        {wasteCategories && (
          <div className="prediction-result">
            <h2 className="total-waste">
              Total Waste: {Object.values(wasteCategories).reduce((acc, cur) => acc + cur, 0).toFixed(2)} kg per month
            </h2>
            <Bar data={chartData} options={chartOptions} height={100} /> {/* Adjust height */}
            <p className="hover-text">Hover on the bars to see the estimated waste for each category per month.</p>

          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WastePrediction;
