import { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  emoji: string;
  symptoms: string[];
  condition: string;
  difficulty: number;
  x: number;
  y: number;
  helped: boolean;
}

interface PatientDiagnosisProps {
  patient: Patient;
  onClose: () => void;
  onDiagnose: (patient: Patient, correct: boolean) => void;
}

const medicalConditions = [
  { name: 'Common Cold', symptoms: ['fever', 'cough', 'runny nose', 'sore throat'] },
  { name: 'Heart Attack', symptoms: ['chest pain', 'shortness of breath', 'nausea', 'sweating'] },
  { name: 'Arthritis', symptoms: ['joint pain', 'stiffness', 'swelling', 'reduced mobility'] },
  { name: 'Ear Infection', symptoms: ['ear pain', 'fever', 'crying', 'not eating'] },
  { name: 'Migraine', symptoms: ['headache', 'nausea', 'light sensitivity', 'dizziness'] },
  { name: 'Diabetes', symptoms: ['excessive thirst', 'frequent urination', 'fatigue', 'blurred vision'] },
  { name: 'Pneumonia', symptoms: ['cough', 'fever', 'chest pain', 'difficulty breathing'] },
  { name: 'Allergic Reaction', symptoms: ['rash', 'itching', 'swelling', 'difficulty breathing'] }
];

export default function PatientDiagnosis({ patient, onClose, onDiagnose }: PatientDiagnosisProps) {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDiagnose = () => {
    const correct = selectedDiagnosis.toLowerCase() === patient.condition.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onDiagnose(patient, correct);
      onClose();
    }, 2000);
  };

  const getReward = () => {
    return {
      experience: patient.difficulty * 20,
      coins: patient.difficulty * 10
    };
  };

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border-4 border-red-400">
        <div className="p-8">
          {!showResult ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <span className="text-4xl mr-3">🩺</span>
                  Patient Diagnosis
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  ✖️
                </button>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-red-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-6xl">{patient.emoji}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{patient.name}</h3>
                    <p className="text-lg text-gray-600">
                      Difficulty: {'⭐'.repeat(patient.difficulty)}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                    <span className="text-xl mr-2">🤒</span>
                    Reported Symptoms:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {patient.symptoms.map((symptom, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium border border-red-300"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                  <p className="text-sm text-yellow-800 font-medium flex items-center">
                    <span className="text-lg mr-2">💰</span>
                    Reward: +{getReward().experience} XP, +{getReward().coins} coins
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Select Your Diagnosis:
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {medicalConditions.map((condition, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDiagnosis(condition.name)}
                      className={`p-4 rounded-xl border-2 text-left transition-all transform hover:scale-105 ${
                        selectedDiagnosis === condition.name
                          ? 'bg-blue-100 border-blue-400 shadow-lg'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-bold text-gray-900 mb-1">{condition.name}</div>
                      <div className="text-xs text-gray-600">
                        Common symptoms: {condition.symptoms.slice(0, 3).join(', ')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 whitespace-nowrap"
                >
                  <span className="text-lg mr-2">❌</span>
                  Cancel
                </button>
                <button
                  onClick={handleDiagnose}
                  disabled={!selectedDiagnosis}
                  className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 whitespace-nowrap ${
                    selectedDiagnosis
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className="text-lg mr-2">✅</span>
                  Confirm Diagnosis
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-8xl mb-6">
                {isCorrect ? '🎉' : '😞'}
              </div>
              <h3 className={`text-4xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Correct Diagnosis!' : 'Wrong Diagnosis'}
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                {isCorrect 
                  ? `Great job! You correctly diagnosed ${patient.condition}.`
                  : `The correct diagnosis was: ${patient.condition}. Keep studying!`
                }
              </p>
              {isCorrect && (
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border-2 border-green-300">
                  <p className="text-lg font-bold text-green-700 flex items-center justify-center">
                    <span className="text-2xl mr-2">🏆</span>
                    You earned +{getReward().experience} XP and +{getReward().coins} coins!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}