import { useEffect, useState } from 'react';
import { fetchImages } from '../utils/unsplash';

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await fetchImages('nature');
        setImages(images);
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
    <div className="grid grid-cols-2 gap-4 p-4">
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

