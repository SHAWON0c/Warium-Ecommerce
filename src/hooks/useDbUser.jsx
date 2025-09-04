import { useEffect, useState } from "react";
import UseAuth from "./UseAuth"; // assuming you already have this

const useDbUser = () => {
  const { user, loading: authLoading } = UseAuth();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDbUser = async () => {
      if (!user?.email) {
        setDbUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://warium-ecommerce-server-api.onrender.com/users/${user.email}`);
        const data = await res.json();
        setDbUser(data);
      } catch (error) {
        console.error("Error fetching DB user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchDbUser();
    }
  }, [user, authLoading]);

  return { dbUser };
};

export default useDbUser;
