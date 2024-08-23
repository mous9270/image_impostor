import { useState, useEffect } from 'react';
import { fetchImages } from '../utils/unsplash';

export default function ImageGame() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const loadImages = async () => {
    setLoading(true);
    try {
      const unsplashImages = await fetchImages('nature', 3);
      
      const aiImageNumber = Math.floor(Math.random() * 5) + 1;
      const aiImage = {
        id: 'ai-generated',
        urls: { regular: `/ai-image-${aiImageNumber}.jpg` },
        alt_description: 'AI-generated image'
      };

      const allImages = [...unsplashImages, aiImage];
      const shuffledImages = allImages.sort(() => Math.random() - 0.5);

      setImages(shuffledImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleImageClick = (image) => {
    if (!revealed) {
      setSelectedImage(image);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      setRevealed(true);
      setTotalAttempts(totalAttempts + 1);
      if (selectedImage.id === 'ai-generated') {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    setSelectedImage(null);
    setRevealed(false);
    loadImages();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        Score: {score} / {totalAttempts}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className={`overflow-hidden rounded-lg shadow-lg cursor-pointer ${
              selectedImage === image ? 'ring-4 ring-blue-500' : ''
            } ${revealed && image.id === 'ai-generated' ? 'ring-4 ring-green-500' : ''}`}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="object-cover w-full h-64"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
          disabled={!selectedImage || revealed}
        >
          Submit
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleNext}
          disabled={!revealed}
        >
          Next
        </button>
      </div>
      {revealed && (
        <div className="mt-4">
          {selectedImage.id === 'ai-generated' ? 
            "Correct! You found the AI-generated image." :
            "Incorrect. The highlighted image is the AI-generated one."}
        </div>
      )}
    </div>
  );
}
