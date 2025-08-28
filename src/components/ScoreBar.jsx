// export default function ScoreBar({ score, current, total }) {
//   const remaining = total - current;

//   const minPercent = (score / total) * 100;
//   const currentPercent = current > 0 ? (score / current) * 100 : 0;
//   const maxPercent = ((score + remaining) / total) * 100;

//   // Segments
//   const red = Math.max(0, Math.min(minPercent, 100));
//   const yellow = Math.max(0, Math.min(currentPercent - red, 100 - red));
//   const green = Math.max(
//     0,
//     Math.min(maxPercent - currentPercent, 100 - red - yellow)
//   );

//   // Fix rounding gaps
//   const totalWidth = red + yellow + green;
//   const gap = 100 - totalWidth;

//   return (
//     <div className="mt-6 text-sm space-y-2">
//       <div className="flex justify-between text-gray-700 font-medium">
//         <span>Score: {Math.round(currentPercent)}%</span>
//         <span>Max Score: {Math.round(maxPercent)}%</span>
//       </div>

//       <div className="flex w-full h-4 rounded-full overflow-hidden border border-slate-300 shadow-inner">
//         <div className="bg-red-400 h-full" style={{ width: `${red}%` }}></div>
//         <div
//           className="bg-orange-400 h-full"
//           style={{ width: `${yellow}%` }}
//         ></div>
//         <div
//           className="bg-green-400 h-full"
//           style={{ width: `${green + gap}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }

export default function ScoreBar({ score, current, total }) {
  // score = correct answers
  // current = attempted questions
  // total = total questions

  const remaining = total - current;

  // current score (based on attempted only)
  const currentPercent = current > 0 ? (score / current) * 100 : 0;

  // min possible score (if all remaining wrong)
  const minPercent = (score / total) * 100;

  // max possible score (if all remaining correct)
  const maxPercent = ((score + remaining) / total) * 100;

  // bar segments
  const orange = minPercent; // guaranteed score
  const yellow = currentPercent > minPercent ? currentPercent - minPercent : 0; // progress so far above min
  const green = maxPercent - currentPercent; // possible future gain

  // fix rounding issue
  const totalWidth = orange + yellow + green;
  const gap = 100 - totalWidth;

  return (
    <div className="mt-6 text-sm space-y-2">
      {/* Top info */}
      <div className="flex justify-between text-gray-700 font-medium">
        <span>Score: {Math.round(currentPercent)}%</span>
        <span>Max Score: {Math.round(maxPercent)}%</span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-4 rounded-full overflow-hidden border-2 border-slate-200 shadow-inner bg-slate-50">
        <div className="flex h-full w-full">
          {/* Orange = minimum guaranteed */}
          <div
            className="bg-orange-400 h-full transition-all duration-300"
            style={{ width: `${orange}%` }}
          ></div>
          {/* Yellow = current actual over minimum */}
          <div
            className="bg-yellow-300 h-full transition-all duration-300"
            style={{ width: `${yellow}%` }}
          ></div>
          {/* Green = potential remaining */}
          <div
            className="bg-green-400 h-full transition-all duration-300"
            style={{ width: `${green + gap}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
