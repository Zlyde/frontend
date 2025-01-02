import React, { useState, useEffect } from 'react';

const Pricing = () => {
  const [pricing, setPricing] = useState({
    startFee: 0,
    perMinuteRate: 0,
    parkingFee: 0,
    discount: 0
  });

  useEffect(() => {
    // Hämta nuvarande prissättning från API
    // setPricing(fetchedPricing);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Skicka uppdaterad prissättning till API
    console.log('Uppdaterad prissättning:', pricing);
  };

  return (
    <div className="admin-pricing">
      <div className="content">
        <main>
          <h1>Prissättning</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Startavgift (SEK)</label>
              <input
                type="number"
                value={pricing.startFee}
                onChange={(e) => setPricing({...pricing, startFee: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label>Pris per minut (SEK)</label>
              <input
                type="number"
                value={pricing.perMinuteRate}
                onChange={(e) => setPricing({...pricing, perMinuteRate: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label>Parkeringsavgift (SEK)</label>
              <input
                type="number"
                value={pricing.parkingFee}
                onChange={(e) => setPricing({...pricing, parkingFee: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label>Rabatt (%)</label>
              <input
                type="number"
                value={pricing.discount}
                onChange={(e) => setPricing({...pricing, discount: parseFloat(e.target.value)})}
              />
            </div>
            <button className="cta-button"type="submit">Uppdatera prissättning</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Pricing;
