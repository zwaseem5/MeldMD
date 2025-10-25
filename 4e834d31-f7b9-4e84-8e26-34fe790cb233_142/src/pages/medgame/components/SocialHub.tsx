
import { useState } from 'react';

interface GameArea {
  id: string;
  name: string;
  description: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  area: string;
  specialty?: string;
  company?: string;
  interests?: string[];
}

interface SocialHubProps {
  area: GameArea;
  onClose: () => void;
  users: User[];
  onConnect: () => void;
}

const discussionTopics = [
  {
    id: 1,
    title: 'Best Telehealth Platforms for Small Practices',
    author: 'Dr. Sarah Chen',
    replies: 23,
    lastActivity: '2 hours ago',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'Patient Engagement Strategies That Work',
    author: 'Mike Johnson',
    replies: 18,
    lastActivity: '4 hours ago',
    category: 'Patient Care'
  },
  {
    id: 3,
    title: 'Medical Equipment Recommendations for 2024',
    author: 'Dr. Lisa Rodriguez',
    replies: 31,
    lastActivity: '1 hour ago',
    category: 'Equipment'
  },
  {
    id: 4,
    title: 'Wellness Program Implementation Tips',
    author: 'Dr. James Wilson',
    replies: 15,
    lastActivity: '3 hours ago',
    category: 'Wellness'
  }
];

const networkingEvents = [
  {
    id: 1,
    title: 'Virtual Medical Conference',
    date: 'Tomorrow, 2:00 PM',
    attendees: 45,
    type: 'Conference'
  },
  {
    id: 2,
    title: 'Healthcare Innovation Meetup',
    date: 'Friday, 6:00 PM',
    attendees: 28,
    type: 'Meetup'
  },
  {
    id: 3,
    title: 'Medical Equipment Showcase',
    date: 'Next Monday, 10:00 AM',
    attendees: 67,
    type: 'Showcase'
  }
];

export default function SocialHub({ area, onClose, users, onConnect }: SocialHubProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'discussions' | 'events' | 'network'>('chat');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onlineUsers = users.filter(user => user.area === area.id);

  return (
    <div className="p-8 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{area.name}</h2>
          <p className="text-gray-600">{area.description}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'chat', label: 'Live Chat', icon: 'ri-chat-3-line' },
          { id: 'discussions', label: 'Discussions', icon: 'ri-discuss-line' },
          { id: 'events', label: 'Events', icon: 'ri-calendar-event-line' },
          { id: 'network', label: 'Network', icon: 'ri-team-line' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-teal-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className={`${tab.icon} mr-2`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Live Chat Tab */}
      {activeTab === 'chat' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    Dr
                  </div>
                  <div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">Has anyone tried the new telehealth platform from MedConnect?</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Dr. Sarah Chen • 5 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    M
                  </div>
                  <div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">Yes! We've been using it for 3 months. Great patient feedback so far.</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Mike Johnson • 3 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    L
                  </div>
                  <div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">I'd love to hear more about your implementation process!</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Dr. Lisa Rodriguez • 1 min ago</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                Send
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Online Now ({onlineUsers.length})</h3>
            <div className="space-y-3">
              {onlineUsers.map(user => (
                <div key={user.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="relative">
                    <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.specialty || user.company}</p>
                  </div>
                  <button
                    onClick={onConnect}
                    className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 whitespace-nowrap"
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Popular Discussions</h3>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
              Start Discussion
            </button>
          </div>
          
          <div className="space-y-4">
            {discussionTopics.map(topic => (
              <div key={topic.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {topic.category}
                      </span>
                      <span className="text-sm text-gray-500">{topic.lastActivity}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{topic.title}</h4>
                    <p className="text-sm text-gray-600">Started by {topic.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{topic.replies}</p>
                    <p className="text-xs text-gray-500">replies</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
              Create Event
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {networkingEvents.map(event => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                    {event.type}
                  </span>
                  <span className="text-sm text-gray-500">{event.attendees} attending</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{event.date}</p>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                  Join Event
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Network Tab */}
      {activeTab === 'network' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Professional Network</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  {user.name.charAt(0)}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{user.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{user.specialty || user.company}</p>
                {user.interests && (
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {user.interests.slice(0, 2).map(interest => (
                      <span key={interest} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={onConnect}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
