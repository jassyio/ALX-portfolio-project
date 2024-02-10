import React, { useState, useEffect } from 'react';

const Advert = () => {
  const imageUrls = [
    'images/ad.png',
    'images/ad2.png',
    'images/ad3.png',
    'images/ad5.png',
    'images/ad7.png',
    'images/ad6.png',
    'images/ad4.png',
    'images/ad8.png',
    'images/ad9.png',
    'images/ad10.png',
    'images/ad11.png',
    'images/ad12.png',
    'images/ad13.png',
    'images/ad14.png',
    'images/ad15.png',
    'images/ad16.png',
    'images/ad17.png',
    'images/ad18.png',
    'images/ad19.png',
    'images/ad20.png',
    // Add more image URLs as needed
  ];

  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    // Function to update the displayed images array
    const updateDisplayedImages = () => {
      const shuffledImages = shuffleArray(imageUrls); // Shuffle the image URLs
      const newDisplayedImages = shuffledImages.slice(0, 5); // Select the first 5 shuffled images
      setDisplayedImages(newDisplayedImages);
    };

    // Initial call to update the displayed images
    updateDisplayedImages();

    // Set interval to update the displayed images every 60 seconds
    const intervalId = setInterval(updateDisplayedImages, 60000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="advert-container">
      {displayedImages.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Advert ${index + 1}`} />
      ))}
    </div>
  );
};

export default Advert;
