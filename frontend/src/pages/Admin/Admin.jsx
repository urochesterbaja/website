import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import PageSelector from "./PageSelector";
import ComponentList from "./ComponentList"
import ComponentEditor from "./ComponentEditor"

import "./Admin2.css"

// good luck working with this bit lmao
// i'd STRONGLY advise reading the README that contains outline of the site structure before playing with this

// basically, here's the way it works:
// page selector renders all available pages, stored in the pageStructure collection in the db
// componentList renders when a page is selected, shows the components stored in that page's pageStructure document in db
// once a component is selected, the componentEditor renders, and saves modified data via the refId stored in the selected componentList element
// the refId is a unique mdb identifier that allows you to access a specific document (it's a hash function)
// within componentEditor is documentEditor and documentFields, which allow for editing of basic data types and also array editing via schema

// within the actual Admin() function, there's some chained useStates, pay attention to how the onSelect function chains state values to other html elements
// and those elements only get rendered if the "parent" chained item has a selection that gets propogated down

function Admin() {
  // token stuff just makes sure user still has appropriate auth for actions
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

  //if no token, just show loading page (unlikely to happen for longer than 10s unless auth0 down)
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
