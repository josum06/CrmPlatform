import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to Xeno
          </h1>
          {user && (
            <p className="text-gray-600">
              Hello, {user.name}! What would you like to do today?
            </p>
          )}
          {!user && (
            <p className="text-gray-600">
              Please sign in to access your dashboard and create segments or campaigns.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Main Features
          </h2>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {/* Manage Customers */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Manage Customers</h3>
              </div>
              <p className="text-gray-600 mb-6">
                View and manage your customer database. Add new customers, update profiles, and track customer interactions.
              </p>
              {user ? (
                <Link
                  to="/Customers"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  View Customers
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-block bg-gray-300 text-gray-500 px-6 py-2 rounded-md cursor-not-allowed"
                >
                  Sign in to view customers
                </button>
              )}
            </div>

            {/* Create Segments */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Create Segments</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Build customer segments based on their demographics, behavior, and purchase history. Target the right audience for your campaigns.
              </p>
              {user ? (
                <Link
                  to="/Segments"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create New Segment
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-block bg-gray-300 text-gray-500 px-6 py-2 rounded-md cursor-not-allowed"
                >
                  Sign in to create segments
                </button>
              )}
            </div>

            {/* Create Campaigns */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Create Campaigns</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Design and launch marketing campaigns to engage your customers. Send personalized messages and track performance.
              </p>
              {user ? (
                <Link
                  to="/Campaigns"
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Create New Campaign
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-block bg-gray-300 text-gray-500 px-6 py-2 rounded-md cursor-not-allowed"
                >
                  Sign in to create campaigns
                </button>
              )}
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}