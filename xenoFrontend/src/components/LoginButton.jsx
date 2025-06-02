import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Context/AuthContext";

export default function LoginButton() {
  const { setUser, setToken } = useAuth();

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const credential = credentialResponse.credential;
        if (!credential) {
          alert("Credential missing in response");
          return;
        }
        try {
          const decoded = jwtDecode(credential);
          setUser(decoded);
          setToken(credential);
          if (import.meta.env.DEV) {
            console.log("Decoded User:", decoded);
          }
        } catch (err) {
          console.error("Token decode failed:", err);
          alert("Login failed: invalid token");
        }
      }}
      onError={() => {
        alert("Login Failed");
      }}
    />
  );
}
