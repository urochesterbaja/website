import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function ComponentList({ token, pageSlug, onSelect }) {
  const [components, setComponents] = useState([]);
  const [allowedTypes, setAllowedTypes] = useState([]);

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
        setAllowedTypes(data.layoutConfig.allowedDynamicComponents);
      });
  }, [pageSlug]);

  const handleDelete = async (component) => {
    await fetch("/.netlify/functions/deleteComponent", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ pageSlug, componentId: component.id })
    });

    setComponents(prev => prev.filter(c => c.id !== component.id));
  };

  const handleAdd = async (type) => {
    const res = await fetch("/.netlify/functions/addComponent", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ pageSlug, type })
    });

    const newComponent = await res.json();
    setComponents(prev => [...prev, newComponent]);
  };

  return (
    <div className="component-list-container">
      <h3 className="admin-h3">Components</h3>

      <ul className="component-list">
        {components.map(c => (
          <li key={c.id}>
            <button onClick={() => onSelect(c)}>
              {c.type} ({c.id})
            </button>

            {c.isDynamic && (
              <div className="component-trash-button-container">
                <button
                className="component-list-trash-button"
                onClick={() => handleDelete(c)}
                >
                <FaTrash/>
              </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {allowedTypes && allowedTypes.length > 0 && (
        <>
          {allowedTypes.map(type => (
            <button className="add-component-button"
              key={type.type}
              onClick={() => handleAdd(type.type)}
            >
              + Add {type.type}
            </button>
          ))}
        </>
      )}
    </div>
  );
}