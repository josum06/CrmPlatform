import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateSegment from "./pages/CreateSegment";
import CreateCampaign from "./pages/CreateCampaign";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Home from "./pages/Home";
import CustomersPage from "./pages/CustomerPage";

const PrivateRoute = ({ element }) => {
  const { token, user } = useAuth();
  
  return token ? (
    element
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
          <p className="text-gray-300 mb-6">Please log in to access this page and explore all features.</p>
          <div className="space-y-3">
            <LoginButton />
            <p className="text-sm text-gray-400">Secure authentication via Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
    
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-lg border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
      
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CRM
              </h1>
            </div>

         
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-white font-medium hidden sm:block">
                      Welcome, {user.name}!
                    </span>
                  </div>
                  <LogoutButton />
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="hidden sm:block text-gray-300">Ready to get started?</span>
                  <LoginButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/Segments"
            element={<PrivateRoute element={<CreateSegment />} />}
          />
          <Route
            path="/Campaigns"
            element={<PrivateRoute element={<CreateCampaign />} />}
          />
           <Route
            path="/Customers"
            element={<PrivateRoute element={<CustomersPage/>} />}
          />
        </Routes>
      </main>

      <footer className="bg-slate-900 border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 CRM. Crafted with precision.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;