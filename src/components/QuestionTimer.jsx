import { useEffect, useState } from 'react';

export default function QuestionTimer({ 
  duration = 45, 
  onTimeUp, 
  keyReset, 
  isCompleted = false,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when new question
  useEffect(() => {
    if (!isCompleted) {
      setTimeLeft(duration);
    }
  }, [keyReset, duration, isCompleted]);

  // Countdown logic
  useEffect(() => {
    if (isCompleted || timeLeft === 0) {
      if (timeLeft === 0 && !isCompleted) onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, isCompleted]);

  // ✅ Show quiz completed state
  
  if (isCompleted) return null;

  // ✅ Default timer view
  return (
    <div className="text-right text-sm font-medium text-gray-700 mb-2">
      ⏱︎ {timeLeft}s
    </div>
  );
}
