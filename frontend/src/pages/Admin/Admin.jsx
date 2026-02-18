import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageSelector from "./PageSelector";
import ComponentList from "./ComponentList";

function Admin() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const t = await getAccessTokenSilently();
      setToken(t);
    };
    loadToken();
  }, []);

  if (!token) return <div>Loading admin...</div>;

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.email}</p>

      <PageSelector token={token} onSelect={setSelectedPage} />

      {selectedPage && (
        <ComponentList token={token} pageSlug={selectedPage} />
      )}
    </div>
  );
}

export default Admin;
