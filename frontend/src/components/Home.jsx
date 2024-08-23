import ImageGame from './ImageGame';

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Find the AI-Generated Image</h1>
      <ImageGame />
    </div>
  );
}
