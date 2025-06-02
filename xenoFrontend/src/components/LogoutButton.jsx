import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
 
 
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
