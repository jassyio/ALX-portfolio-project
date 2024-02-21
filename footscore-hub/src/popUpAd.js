import React, { useState, useEffect } from 'react';

const PopUpAd = () => {
  const [showPopUpAd, setShowPopUpAd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowPopUpAd(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closePopUpAd = () => {
    setShowPopUpAd(false);
  };

  useEffect(() => {
    let timer;
    if (showPopUpAd) {
      timer = setTimeout(() => {
        setShowPopUpAd(false);
      }, 5000); // Close the pop-up after 5 seconds
    }

    return () => clearTimeout(timer);
  }, [showPopUpAd]);

  return (
    <>
      {showPopUpAd && (
        <div className="popup-ad">
          <div className="popup-ad-content">
            {/* Content for pop-up advertisement */}
            <h3>This is a Pop-up Advertisement</h3>
            <p>Content of your pop-up advertisement goes here.</p>
            {/* Add cancel button */}
            <button onClick={closePopUpAd}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpAd;
