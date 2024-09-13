import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlantRecommendation: React.FC = () => {
  const [category, setCategory] = useState('');
  const [sunlightNeeds, setSunlightNeeds] = useState('');
  const [wateringNeeds, setWateringNeeds] = useState('');
  const [plants, setPlants] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('/plants/api/PlantRecommendation/', {
        params: {
          category,
          sunlight_needs: sunlightNeeds,
          watering_needs: wateringNeeds,
        },
      });
      setPlants(response.data); // Update plant list with fetched data
    } catch (error) {
      console.error('Error fetching plant recommendations:', error);
    }
  };

  return (
    <div>
      <h1>Plant Recommendations</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </label>
        <label>
          Sunlight Needs:
          <select value={sunlightNeeds} onChange={(e) => setSunlightNeeds(e.target.value)}>
            <option value="">Select sunlight needs</option>
            <option value="Filtered Sunlight">Filtered Sunlight</option>
            <option value="Direct sunlight">Direct sunlight</option>
            <option value="Indirect Sunlight">Indirect Sunlight</option>
          </select>
        </label>
        <label>
          Watering Needs:
          <select value={wateringNeeds} onChange={(e) => setWateringNeeds(e.target.value)}>
            <option value="">Select watering needs</option>
            <option value="3 times a week">3 times a week</option>
            <option value="2-3 times a week">2-3 times a week</option>
          </select>
        </label>
        <button type="submit">Get Recommendations</button>
      </form>

      <div>
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant.plant_id}>
              <h2>{plant.name} ({plant.scientific_name})</h2>
              <img src={plant.photo_url} alt={plant.name} width="200" />
              <p>{plant.description}</p>
              <p><strong>Sunlight:</strong> {plant.sunlight_needs}</p>
              <p><strong>Watering:</strong> {plant.watering_needs}</p>
            </div>
          ))
        ) : (
          <p>No plants found.</p>
        )}
      </div>
    </div>
  );
};

export default PlantRecommendation;
