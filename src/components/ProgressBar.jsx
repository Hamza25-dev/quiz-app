export default function ProgressBar({ current, total }) {
  const width = (current / total) * 100;

  return (
    <div className="mb-1">
      <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="text-left text-2xl font-bold text-gray-600 mt-1">
        Question {current} of {total}
      </div>
    </div>
  );
}