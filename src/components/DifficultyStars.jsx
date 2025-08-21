export default function DifficultyStars({ level }) {
  // Convert string difficulty to numeric level
  const difficultyMap = {
    easy: 1,
    medium: 2,
    hard: 3
  };

  const numericLevel = difficultyMap[level?.toLowerCase()] || 0;

  return (
    <div className="flex gap-1 items-center text-yellow-500 text-xl mb-2">
      {[1, 2, 3].map(i => (
        <span key={i}>
          {i <= numericLevel ? '★' : '☆'}
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-600 capitalize">{level}</span>
    </div>
  );
}