import React, { useState, useRef, ChangeEvent } from 'react';
import './SearchPage.css'; // Import the CSS file for styling

const wasteTypes = [
  { id: 'batteries', label: 'Batteries', icon: '/images/battery.png' },
  { id: 'paper', label: 'Paper', icon: '/images/plasticbag.png' },
  { id: 'plastic', label: 'Plastic', icon: '/images/bottle.png' },
  { id: 'metal', label: 'Metal', icon: '/images/can.png' },
  { id: 'organic', label: 'Organic', icon: '/images/banana.png' }
];

const isValidPostcode = (postcode: string[]) => {
  const postcodeStr = postcode.join('');
  return /^\d{4}$/.test(postcodeStr);
};

const SearchPage: React.FC = () => {
  const [postcode, setPostcode] = useState(['', '', '', '']);
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePostcodeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.toUpperCase();
    if (/^[0-9]*$/.test(value)) {
      const updatedPostcode = [...postcode];
      updatedPostcode[index] = value;

      if (index < 3 && value) {
        inputRefs.current[index + 1]?.focus();
      }

      setPostcode(updatedPostcode);
      setError(null);
    }
  };

  const handleSearch = () => {
    const postcodeValue = postcode.join('');
    if (isValidPostcode(postcode) && selectedWasteTypes.length > 0) {
      console.log('Postcode:', postcodeValue);
      console.log('Selected Waste Types:', selectedWasteTypes);
      // Perform the search operation
    } else {
      setError('Please complete all fields correctly.');
    }
  };

  const handleWasteTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedWasteTypes(prevState =>
      checked ? [...prevState, value] : prevState.filter(type => type !== value)
    );
  };

  const isFormValid = () => {
    return isValidPostcode(postcode) && selectedWasteTypes.length > 0;
  };

  return (
    <div className="search-page">
      <h1>Find Recycling Centers Near You</h1>
      <div className="waste-types">
        <h2>Select Waste Types:</h2>
        {wasteTypes.map(wasteType => (
          <div key={wasteType.id} className="waste-type">
            <input
              type="checkbox"
              id={wasteType.id}
              value={wasteType.id}
              checked={selectedWasteTypes.includes(wasteType.id)}
              onChange={handleWasteTypeChange}
            />
            <label htmlFor={wasteType.id}>
              <img src={wasteType.icon} alt={wasteType.label} className="icon" />
              {wasteType.label}
            </label>
          </div>
        ))}
      </div>

      <div className="search-bar">
        <h2>Enter Your 4-Digit Postcode:</h2>
        <div className="postcode-inputs">
          {postcode.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handlePostcodeChange(e, index)}
              maxLength={1}
              ref={el => (inputRefs.current[index] = el)}
              className="postcode-box"
              placeholder="_"
            />
          ))}
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleSearch} disabled={!isFormValid()} className="search-button">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
