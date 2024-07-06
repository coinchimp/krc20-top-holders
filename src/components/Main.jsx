import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Main = () => {
  const { tick } = useParams();
  const [tokenData, setTokenData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    if (tick) {
      let timeoutId;

      const fetchData = async () => {
        try {
          const tokenResponse = await axios.get(`https://${process.env.REACT_APP_KASPLEX_API}/krc20/token/${tick}?holder=true`);
          const statsResponse = await axios.get(`https://${process.env.REACT_APP_KASPLEX_API}/krc20/token/${tick}?stat=true`);
          setTokenData(tokenResponse.data.result[0]);
          setStatsData(statsResponse.data.result[0]);
          setTimeoutReached(false); // Reset timeout state if data is fetched successfully
          clearTimeout(timeoutId); // Clear the timeout if data is fetched successfully
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };

      fetchData();

      timeoutId = setTimeout(() => {
        setTimeoutReached(true);
      }, 20000); // 20 seconds timeout

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
      };
    }
  }, [tick]);

  const simplifyNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(4) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(4) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(4) + 'K';
    return num.toFixed(4);
  };

  const compressAddress = (address) => {
    if (isMobile) {
      return address.slice(0, 10) + '...' + address.slice(-4);
    }
    return address;
  };

  if (timeoutReached) {
    return <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em' }}>KRC20 is not responding. Please come back later.</div>;
  }

  if (!tokenData || !statsData) {
    return <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em' }}>Loading data from KRC20...</div>;
  }

  const { dec, minted, max, holder } = tokenData;
  const { holderTotal, mintTotal } = statsData;

  const mintedNormalized = minted / Math.pow(10, dec);
  const maxNormalized = max / Math.pow(10, dec);
  const totalHoldersAmount = holder.reduce((acc, curr) => acc + parseInt(curr.amount, 10), 0) / Math.pow(10, dec);
  const percentageMinted = (mintedNormalized / maxNormalized) * 100;
  const percentageTotalHoldersMinted = (totalHoldersAmount / mintedNormalized) * 100;
  const percentageTotalHoldersSupply = (totalHoldersAmount / maxNormalized) * 100;

  return (
    <div style={{ padding: '12px 12px 12px 28px', backgroundColor: '#231F20', color: 'white' }}>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5em' }}>Total Holders: {holderTotal}</h3>
        <h4 style={{ fontSize: '1.3em' }}>Total Mints: {mintTotal}</h4>
        <div style={{ height: '30px', backgroundColor: '#343a40', borderRadius: '50px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ height: '100%', width: `${percentageMinted}%`, backgroundColor: '#28a745' }}></div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '1.3em', fontWeight: 'bold' }}>
          {percentageMinted.toFixed(2)}%
        </div>
        <div style={{ marginTop: '10px', fontSize: '1.3em' }}>
          <span>Minted: {simplifyNumber(mintedNormalized)}</span> / <span>Max Supply: {simplifyNumber(maxNormalized)}</span>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ fontSize: '1.3em' }}>
          Total Amount Held by Top 50 Holders: {simplifyNumber(totalHoldersAmount)} ({percentageTotalHoldersMinted.toFixed(2)}% of Minted / {percentageTotalHoldersSupply.toFixed(2)}% of Supply)
        </h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
          <thead style={{ backgroundColor: '#343a40', color: '#ffffff' }}>
            <tr>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Address</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Amount</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Percentage of Minted</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Percentage of Supply</th>
            </tr>
          </thead>
          <tbody>
            {holder.map((holder, index) => (
              <tr key={index} style={{ transition: 'background-color 0.3s ease', backgroundColor: index % 2 === 0 ? '#2b2b2b' : '#1f1f1f' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <a href={`https://explorer.kaspa.org/addresses/${holder.address}?page=1`} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                    {compressAddress(holder.address)}
                  </a>
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{simplifyNumber(holder.amount / Math.pow(10, dec))}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{((holder.amount / minted) * 100).toFixed(4)}%</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{((holder.amount / max) * 100).toFixed(4)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
