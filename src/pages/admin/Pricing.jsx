import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings, resetSettings } from '../../utils/SettingCall';

const Pricing = () => {
  const [pricing, setPricing] = useState({
    base_price: 0,
    price_per_minute: 0,
    fee_amount: 0,
    start_discount: 0,
  });

  useEffect(() => {
    const getPricing = async () => {
      try {
        const settings = await fetchSettings();
        setPricing({
          base_price: settings.base_price,
          price_per_minute: settings.price_per_minute,
          fee_amount: settings.fee_amount,
          start_discount: settings.start_discount,
        });
      } catch (error) {
        console.error('Kunde inte hämta prissättning:', error.message);
      }
    };
    getPricing();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedSettings = await updateSettings(pricing);
      console.log('Prissättning uppdaterad:', updatedSettings);
    } catch (error) {
      console.error('Kunde inte uppdatera prissättning:', error.message);
    }
  };

  const handleReset = async () => {
    try {
      const resetPricing = await resetSettings();
      setPricing({
        base_price: resetPricing.base_price,
        price_per_minute: resetPricing.price_per_minute,
        fee_amount: resetPricing.fee_amount,
        start_discount: resetPricing.start_discount,
      });
      console.log('Prissättning återställd:', resetPricing);
    } catch (error) {
      console.error('Kunde inte återställa prissättning:', error.message);
    }
  };

  return (
    <div className="admin-pricing">
      <div className="content">
        <main>
          <h1 className="form-title">Prissättning</h1>
          <form onSubmit={handleUpdate} className="pricing-form">
            <div className="form-group">
              <label>Startavgift (SEK)</label>
              <input
                type="number"
                value={pricing.base_price}
                onChange={(e) =>
                  setPricing({ ...pricing, base_price: parseFloat(e.target.value) })
                }
              />
            </div>
            <div className="form-group">
              <label>Pris per minut (SEK)</label>
              <input
                type="number"
                value={pricing.price_per_minute}
                onChange={(e) =>
                  setPricing({ ...pricing, price_per_minute: parseFloat(e.target.value) })
                }
              />
            </div>
            <div className="form-group">
              <label>Parkeringsavgift (SEK)</label>
              <input
                type="number"
                value={pricing.fee_amount}
                onChange={(e) =>
                  setPricing({ ...pricing, fee_amount: parseFloat(e.target.value) })
                }
              />
            </div>
            <div className="form-group">
              <label>Rabatt (SEK)</label>
              <input
                type="number"
                value={pricing.start_discount}
                onChange={(e) =>
                  setPricing({ ...pricing, start_discount: parseFloat(e.target.value) })
                }
              />
            </div>
            <button type="submit" className="btn primary-btn">Uppdatera prissättning</button>
          </form>
          <button onClick={handleReset} className="btn secondary-btn">Återställ till standardvärden</button>
        </main>
      </div>
    </div>
  );
};

export default Pricing;
