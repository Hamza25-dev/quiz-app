import { useState } from "react";
import questions from "../data/question.js";
import ProgressBar from "./ProgressBar.jsx";
import ScoreBar from "./ScoreBar.jsx";
import QuestionCard from "./QuestionCard.jsx";
import DifficultyStars from "./DifficultyStars.jsx";
import CategoryBadge from "./CategoryBadge.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

export default function QuizApp() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [didTimeOut, setDidTimeOut] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  if (!questions || questions.length === 0) {
    return <div>No questions found.</div>;
  }

  const question = questions[currentQIndex];
  const timerDuration = 8;
  const isLastQuestion = currentQIndex === questions.length - 1;
  const hasAnswered = selectedAnswer !== null || didTimeOut;

  function handleAnswer(answer) {
    if (selectedAnswer || didTimeOut) return;
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);

    // On last question, do not jump to summary immediately; wait for user action
    if (isLastQuestion) {
      // Keep on the question to show feedback; user will click Finish
    }
  }

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setDidTimeOut(false);
      setIsCorrect(null);
    }
  };

  // ✅ check if quiz is completed
  const isCompleted = isLastQuestion && hasAnswered && showSummary;
  const percentage = Math.round((score / questions.length) * 100) || 0;
  const attempted = currentQIndex + (hasAnswered ? 1 : 0);

  return (
    <div style={{ borderRadius: "20px" }} className="relative w-full h-[600px] max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg flex flex-col">
      <ProgressBar current={currentQIndex + 1} total={questions.length} stickToTop />
      <CategoryBadge category={question.category} />
      <div className="flex justify-between items-center">
        <DifficultyStars level={question.difficulty} />

        {!(isLastQuestion && hasAnswered) && (
          <QuestionTimer
            key={currentQIndex}
            duration={timerDuration}
            onTimeUp={() => {
              if (!selectedAnswer && !didTimeOut) {
                setDidTimeOut(true);
                setIsCorrect(false);
                setTimeout(() => {
                  if (isLastQuestion) {
                    setShowSummary(true);
                  } else {
                    nextQuestion();
                  }
                }, 1000); // Optional delay before moving on
              }
            }}
            isCompleted={isCompleted}
          />
        )}
      </div>

      <div className="flex-grow overflow-auto">
        {isCompleted ? (
          // ✅ Quiz completed screen
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-3xl text-center font-bold text-green-600">
              Quiz Completed!
            </p>
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
              selected={selectedAnswer}
              isCorrect={isCorrect}
              onSelect={handleAnswer}
              revealCorrect={didTimeOut}
            />

            {(selectedAnswer || didTimeOut) && (
              <>
                {didTimeOut ? (
                  <p className="text-center text-xl font-semibold mt-4 text-red-600">
                    ⏱️ Time's Up!
                  </p>
                ) : (
                  <p
                    className={`text-center text-xl font-semibold mt-4 ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCorrect ? "Correct!" : "Sorry!"}
                  </p>
                )}

                {currentQIndex < questions.length - 1 && !didTimeOut && (
                  <button
                    onClick={nextQuestion}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 mx-auto block"
                  >
                    Next Question
                  </button>
                )}

                {isLastQuestion && (
                  <button
                    onClick={() => setShowSummary(true)}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 mx-auto block"
                  >
                    Finish
                  </button>
                )}
              </>
            )}

            {/* {selected && (
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
            )} */}
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
          current={attempted}
          total={questions.length}
        />
      </div>
    </div>
  );
}
