import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

// this works similarly to the pageSelector, with a few nuances
// first off, it needs to take in pageSlug because that's what defines which components get rendered
// it also has delete/add functionality for components listed in the dynamicComponents array for each page's pageStructure
// when adding a component the fields for that component are pulled from the component registry
// the function also needs an onSelect functionality passed into it
// the onSelect should render componentEditor with the component passed in
export default function ComponentList({ token, pageSlug, onSelect }) {
  const [components, setComponents] = useState([]);
  const [allowedTypes, setAllowedTypes] = useState([]);

  //this fetches all components and initializes the dynamic guys
  useEffect(() => {
    fetch("/.netlify/functions/getPageStructure", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ pageSlug })
    })
      .then(r => r.json())
      .then(data => {
        setComponents(data.components);
        setAllowedTypes(data.layoutConfig.allowedDynamicComponents); // these are the components that user is allowed to add/remove
      });
  }, [pageSlug]);

  //this deletes components
  const handleDelete = async (component) => {
    await fetch("/.netlify/functions/deleteComponent", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ pageSlug, componentId: component.id })
    });

    setComponents(prev => prev.filter(c => c.id !== component.id)); //remove deleted component from visible components
  };

  //this adds components
  const handleAdd = async (type) => {
    const res = await fetch("/.netlify/functions/addComponent", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ pageSlug, type })
    });

    const newComponent = await res.json();
    setComponents(prev => [...prev, newComponent]); //add the new component to visible components
  };

  return (
    <div className="component-list-container">
      <h3 className="admin-h3">Components</h3>

      <ul className="component-list">
        {/* map all components and store id, call onSelect function that was passed into <ComponentList> when it was initialized */}
        {components.map(c => (
          <li key={c.id}>
            <button onClick={() => onSelect(c)}>
              {c.type} ({c.id})
            </button>

            {// if dynamic, allow trash button
            c.isDynamic && (
              <div className="component-trash-button-container">
                <button
                  className="component-list-trash-button"
                  onClick={() => handleDelete(c)} //handleDelete defined earlier in function
                >
                <FaTrash/>
              </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {//once allowedTypes is pulled, show the add buttons if there are any
      allowedTypes && allowedTypes.length > 0 && (
        <>
          {allowedTypes.map(type => (
            <button className="add-component-button"
              key={type.type}
              onClick={() => handleAdd(type.type)} //handleAdd defined earlier in function
            >
              + Add {type.type}
            </button>
          ))}
        </>
      )}
    </div>
  );
}