
import { useState, useEffect } from 'react';

interface DailyGoals {
  stepsWalked: number;
  interactionsToday: number;
  knowledgeQuizzes: number;
  socialConnections: number;
}

interface ActivityTrackerProps {
  goals: DailyGoals;
  onGoalComplete: (goalType: string) => void;
}

const goalTargets = {
  stepsWalked: 100,
  interactionsToday: 5,
  knowledgeQuizzes: 3,
  socialConnections: 2
};

export default function ActivityTracker({ goals, onGoalComplete }: ActivityTrackerProps) {
  const [showTracker, setShowTracker] = useState(false);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const isGoalComplete = (current: number, target: number) => {
    return current >= target;
  };

  return (
    <>
      {/* Activity Tracker Toggle */}
      <button
        onClick={() => setShowTracker(!showTracker)}
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-l-lg shadow-lg transition-colors z-40"
      >
        <i className="ri-trophy-line text-xl"></i>
      </button>

      {/* Activity Tracker Panel */}
      {showTracker && (
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Goals</h3>
            <button
              onClick={() => setShowTracker(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <div className="space-y-4">
            {/* Steps Walked */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <i className="ri-walk-line text-green-600"></i>
                  <span className="text-sm font-medium text-gray-700">Steps Walked</span>
                </div>
                <span className="text-sm text-gray-600">
                  {goals.stepsWalked}/{goalTargets.stepsWalked}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isGoalComplete(goals.stepsWalked, goalTargets.stepsWalked)
                      ? 'bg-green-500'
                      : 'bg-green-400'
                  }`}
                  style={{ width: `${getProgressPercentage(goals.stepsWalked, goalTargets.stepsWalked)}%` }}
                ></div>
              </div>
            </div>

            {/* Interactions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <i className="ri-hand-heart-line text-blue-600"></i>
                  <span className="text-sm font-medium text-gray-700">Interactions</span>
                </div>
                <span className="text-sm text-gray-600">
                  {goals.interactionsToday}/{goalTargets.interactionsToday}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isGoalComplete(goals.interactionsToday, goalTargets.interactionsToday)
                      ? 'bg-blue-500'
                      : 'bg-blue-400'
                  }`}
                  style={{ width: `${getProgressPercentage(goals.interactionsToday, goalTargets.interactionsToday)}%` }}
                ></div>
              </div>
            </div>

            {/* Knowledge Quizzes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <i className="ri-brain-line text-purple-600"></i>
                  <span className="text-sm font-medium text-gray-700">Quizzes</span>
                </div>
                <span className="text-sm text-gray-600">
                  {goals.knowledgeQuizzes}/{goalTargets.knowledgeQuizzes}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isGoalComplete(goals.knowledgeQuizzes, goalTargets.knowledgeQuizzes)
                      ? 'bg-purple-500'
                      : 'bg-purple-400'
                  }`}
                  style={{ width: `${getProgressPercentage(goals.knowledgeQuizzes, goalTargets.knowledgeQuizzes)}%` }}
                ></div>
              </div>
            </div>

            {/* Social Connections */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <i className="ri-team-line text-orange-600"></i>
                  <span className="text-sm font-medium text-gray-700">Connections</span>
                </div>
                <span className="text-sm text-gray-600">
                  {goals.socialConnections}/{goalTargets.socialConnections}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isGoalComplete(goals.socialConnections, goalTargets.socialConnections)
                      ? 'bg-orange-500'
                      : 'bg-orange-400'
                  }`}
                  style={{ width: `${getProgressPercentage(goals.socialConnections, goalTargets.socialConnections)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Today's Rewards</h4>
            <div className="text-xs text-gray-600">
              Complete all goals to earn bonus coins and experience!
            </div>
          </div>
        </div>
      )}
    </>
  );
}
