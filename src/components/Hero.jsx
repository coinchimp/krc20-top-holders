import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Hero = () => {
  const { tick } = useParams();
  const navigate = useNavigate();
  const [inputTick, setInputTick] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputTick(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputTick) {
      setLoading(true);
      setError('');
      try {
        const response = await fetchWithTimeout(`https://${process.env.REACT_APP_KASPLEX_API}/krc20/token/${inputTick}?stat=true`, 10000);
        if (response.data.result && response.data.result.length > 0) {
          navigate(`/${inputTick}`);
        } else {
          setError('The tick hasn\'t been deployed, please choose another.');
        }
      } catch (error) {
        if (error.message === 'Timeout') {
          setError('KRC20 is not responding. Please come back later.');
        } else if (error.response && error.response.status === 404) {
          setError('The tick hasn\'t been deployed, please choose another.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchWithTimeout = (url, timeout) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, timeout);

      axios.get(url)
        .then(response => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };

  if (!tick) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <form onSubmit={handleFormSubmit} style={{ display: 'inline-block', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', color: '#000' }}>
          <h2>Please enter a valid tick</h2>
          <input
            type="text"
            value={inputTick}
            onChange={handleInputChange}
            placeholder="Enter tick"
            style={{ padding: '10px', fontSize: '1em', marginBottom: '10px', width: '100%' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer' }}>
            {loading ? 'Checking...' : 'Submit'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
  }

  return <Navbar />;
};

export default Hero;
