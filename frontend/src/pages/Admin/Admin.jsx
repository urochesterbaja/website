import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageSelector from "./PageSelector";
import ComponentList from "./ComponentList"
import ComponentEditor from "./ComponentEditor"
import "./Admin2.css"

function Admin() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const t = await getAccessTokenSilently();
      setToken(t);
    };
    loadToken();
  }, []);

  if (!token) return <div>Loading admin...</div>;

  return (
    <div className="admin-page-container">
        <h1 className="admin-h1">Admin Dashboard</h1>
        <p>Welcome, {user?.email}</p>

        <div className="admin-workflow">
            <div className="admin-panel">
                <PageSelector className="admin-page-selector" token={token} onSelect={(page) => {setSelectedPage(page); setSelectedComponent(null)}} />
            </div>

            {selectedPage && (
                <div className="admin-panel">
                    <ComponentList token={token} pageSlug={selectedPage} onSelect={setSelectedComponent}/>
                </div>
            )}
        </div>

      {selectedComponent && (
        <ComponentEditor key={selectedComponent.id} token={token} component={selectedComponent} />
      )}
    </div>
  );
}

export default Admin;
