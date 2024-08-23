import { useEffect, useState } from 'react';
import { fetchImages } from '../utils/unsplash';

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const unsplashImages = await fetchImages('nature', 3);
        
        // Get a random AI-generated image from public folder
        const aiImageNumber = Math.floor(Math.random() * 5) + 1; // Assuming you have 5 AI images
        const aiImage = {
          id: 'ai-generated',
          urls: { regular: `/ai-image-${aiImageNumber}.jpg` },
          alt_description: 'AI-generated image'
        };

        // Combine Unsplash images with AI image and shuffle
        const allImages = [...unsplashImages, aiImage];
        const shuffledImages = allImages.sort(() => Math.random() - 0.5);

        setImages(shuffledImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-screen">
      {images.map((image) => (
        <div key={image.id} className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
