export default function QuestionCard({ question, selected, isCorrect, onSelect }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {question.answers.map((answer, index) => {
          let className = "border-1 border-slate-200 px-4 py-2 rounded-md cursor-pointer";

          if (selected) {
            if (answer === question.correctAnswer) {
              className += " bg-green-500 text-white";
            } else if (answer === selected) {
              className += " bg-red-500 text-white";
            } else {
              className += " bg-gray-100 text-gray-700";
            }
          } else {
            className += " hover:bg-gray-100 text-black";
          }

          return (
            <button
              key={index}
              onClick={() => onSelect(answer)}
              className={className}
              disabled={!!selected}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}