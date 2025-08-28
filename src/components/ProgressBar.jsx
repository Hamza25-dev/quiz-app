export default function ProgressBar({ current, total, stickToTop = false }) {
  const width = (current / total) * 100;

  if (stickToTop) {
    return (
      <>
        <div className="absolute top-0 left-0 right-0">
          <div className="relative mx-2 h-2">
            <div
              className="absolute left-0 top-0 h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${width}%` }}
            />
          </div>
        </div>
        <div className="text-left text-2xl font-bold text-gray-600 mt-1">
          Question {current} of {total}
        </div>
      </>
    );
  }

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