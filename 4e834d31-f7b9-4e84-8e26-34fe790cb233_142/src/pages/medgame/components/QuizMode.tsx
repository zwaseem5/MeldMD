
import { useState } from 'react';
import { useUserData } from '../../../hooks/useUserData';

interface QuizModeProps {
  onModeChange: (mode: 'world' | 'quiz' | 'customize') => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the recommended first-line treatment for hypertension in most patients?",
    options: [
      "ACE inhibitors or ARBs",
      "Beta-blockers",
      "Calcium channel blockers",
      "Diuretics"
    ],
    correct: 0,
    explanation: "ACE inhibitors or ARBs are typically first-line treatments for hypertension due to their cardiovascular protective effects.",
    category: "Cardiology",
    difficulty: "medium",
    points: 50
  },
  {
    id: 2,
    question: "Which medication is contraindicated in patients with severe asthma?",
    options: [
      "Albuterol",
      "Propranolol",
      "Prednisone",
      "Montelukast"
    ],
    correct: 1,
    explanation: "Beta-blockers like propranolol can cause bronchospasm and are contraindicated in severe asthma.",
    category: "Pulmonology",
    difficulty: "easy",
    points: 30
  },
  {
    id: 3,
    question: "What is the mechanism of action of metformin?",
    options: [
      "Increases insulin secretion",
      "Decreases hepatic glucose production",
      "Increases glucose uptake in muscles",
      "Delays gastric emptying"
    ],
    correct: 1,
    explanation: "Metformin primarily works by decreasing hepatic glucose production and improving insulin sensitivity.",
    category: "Endocrinology",
    difficulty: "medium",
    points: 50
  },
  {
    id: 4,
    question: "Which antibiotic is first-line for uncomplicated UTI in women?",
    options: [
      "Ciprofloxacin",
      "Amoxicillin",
      "Nitrofurantoin",
      "Cephalexin"
    ],
    correct: 2,
    explanation: "Nitrofurantoin is first-line for uncomplicated UTI due to its effectiveness and low resistance rates.",
    category: "Infectious Disease",
    difficulty: "easy",
    points: 30
  },
  {
    id: 5,
    question: "What is the target INR range for patients on warfarin for atrial fibrillation?",
    options: [
      "1.5-2.0",
      "2.0-3.0",
      "2.5-3.5",
      "3.0-4.0"
    ],
    correct: 1,
    explanation: "The target INR for atrial fibrillation is 2.0-3.0 to balance anticoagulation with bleeding risk.",
    category: "Cardiology",
    difficulty: "hard",
    points: 70
  }
];

export default function QuizMode({ onModeChange }: QuizModeProps) {
  const { gameProgress, addExperience, addCoins, addKnowledgePoints, helpPatient, isAuthenticated } = useUserData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) return;

    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    setShowExplanation(true);

    if (isCorrect) {
      setScore(score + question.points);
      
      if (isAuthenticated) {
        await addExperience(question.points);
        await addCoins(question.points / 2);
        await addKnowledgePoints(10);
        if (Math.random() > 0.7) {
          await helpPatient();
        }
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <i className="ri-trophy-line text-6xl text-yellow-500 mb-6"></i>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h1>
            <p className="text-xl text-gray-600 mb-8">Great job on completing the medical knowledge quiz!</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Results</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Final Score</p>
                  <p className="text-2xl font-bold text-teal-600">{score} points</p>
                </div>
                <div>
                  <p className="text-gray-600">Questions Answered</p>
                  <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={resetGame}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                Play Again
              </button>
              <button
                onClick={() => onModeChange('world')}
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                Back to World
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back to World Button */}
        <div className="mb-6">
          <button
            onClick={() => onModeChange('world')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to World
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Score: {score} points
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {question.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {question.difficulty} • {question.points} pts
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{question.question}</h2>
          </div>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correct
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-teal-500 bg-teal-50'
                    : showExplanation && index === question.correct
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showExplanation && index === question.correct && (
                    <i className="ri-check-line ml-auto text-green-600"></i>
                  )}
                  {showExplanation && selectedAnswer === index && index !== question.correct && (
                    <i className="ri-close-line ml-auto text-red-600"></i>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-end">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedAnswer !== null
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
