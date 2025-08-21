export default function ScoreBar({ score, current, total }) {
  const remaining = total - current;

  const minPercent = (score / total) * 100;
  const currentPercent = current > 0 ? (score / current) * 100 : 0;
  const maxPercent = ((score + remaining) / total) * 100;

  // Segments
  const red = Math.max(0, Math.min(minPercent, 100));
  const yellow = Math.max(0, Math.min(currentPercent - red, 100 - red));
  const green = Math.max(0, Math.min(maxPercent - currentPercent, 100 - red - yellow));

  // Fix rounding gaps
  const totalWidth = red + yellow + green;
  const gap = 100 - totalWidth;

  return (
    <div className="mt-6 text-sm space-y-2">
      <div className="flex justify-between text-gray-700 font-medium">
        <span>Score: {Math.round(currentPercent)}%</span>
        <span>Max Score: {Math.round(maxPercent)}%</span>
      </div>

      <div className="flex w-full h-4 rounded-full overflow-hidden border border-slate-300 shadow-inner">
        <div className="bg-red-400 h-full" style={{ width: `${red}%` }}></div>
        <div className="bg-orange-400 h-full" style={{ width: `${yellow}%` }}></div>
        <div
          className="bg-green-400 h-full"
          style={{ width: `${green + gap}%` }}
        ></div>
      </div>
    </div>
  );
}

