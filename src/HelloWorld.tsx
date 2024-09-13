import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelloWorld: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/hello/');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching the message:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default HelloWorld;
