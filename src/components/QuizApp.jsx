import { useState } from "react";
import questions from "../data/question.js";
import ProgressBar from "./progressbar";
import ScoreBar from "./scorebar";
import QuestionCard from "./questioncard";
import DifficultyStars from "./difficultystars";
import CategoryBadge from "./categorybadge";
import QuestionTimer from "./questiontimer";

export default function QuizApp() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const question = questions[currentQIndex];
  const timerDuration = 45;

  function handleAnswer(answer) {
    if (selected) return;
    setSelected(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
  }

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelected(null);
      setIsCorrect(null);
    }
  };

  // ✅ check if quiz is completed
  const isCompleted =
    currentQIndex === questions.length - 1 && selected !== null;
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="relative w-full h-[600px] max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg flex flex-col">
      <ProgressBar current={currentQIndex + 1} total={questions.length} />
      <CategoryBadge category={question.category} />
      <div className="flex justify-between items-center">
        <DifficultyStars level={question.difficulty} />

        <QuestionTimer
          duration={timerDuration}
          keyReset={currentQIndex}
          onTimeUp={() => {
            if (!selected) {
              setSelected("Time's up");
              setIsCorrect(false);
              setTimeout(() => {
                nextQuestion();
              }, 1000); // Optional delay before moving on
            }
          }}
          isCompleted={isCompleted}
        />
      </div>


<div className="flex-grow overflow-auto">
        {isCompleted ? (
          // ✅ Quiz completed screen
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-3xl text-center font-bold text-green-600">Quiz Completed!</p>
            <p className="mt-2 text-lg text-gray-700">
              Your Score: {score}/{questions.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Percentage: {percentage}%
            </p>
          </div>
        ) : (
          // ✅ Normal Question screen
          <>
            <QuestionCard
              question={question}
              selected={selected}
              isCorrect={isCorrect}
              onSelect={handleAnswer}
            />

            {selected && (
              <>
                <p
                  className={`text-center text-xl font-semibold mt-4 ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCorrect ? "Correct!" : "Sorry!"}
                </p>
                {currentQIndex < questions.length - 1 && (
                  <button
                    onClick={nextQuestion}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 mx-auto block"
                  >
                    Next Question
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* <div className="flex-grow overflow-auto">
        <QuestionCard
          question={question}
          selected={selected}
          isCorrect={isCorrect}
          onSelect={handleAnswer}
        />

        {selected && (
          <>
            <p
              className={`text-center text-xl font-semibold mt-4 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "Correct!" : "Sorry!"}
            </p>
            <button
              onClick={nextQuestion}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 mx-auto block"
            >
              Next Question
            </button>
          </>
        )}
      </div> */}

      {/* Fixed ScoreBar at bottom */}
      <div className="absolute bottom-4 left-6 right-6">
        <ScoreBar
          score={score}
          current={currentQIndex + 1}
          total={questions.length}
        />
      </div>
    </div>
  );
}
