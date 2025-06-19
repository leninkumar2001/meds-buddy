import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/");
      } else {
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
