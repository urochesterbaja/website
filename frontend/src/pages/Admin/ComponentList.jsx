import { useEffect, useState } from "react";
import ComponentEditor from "./ComponentEditor";

export default function ComponentList({ token, pageSlug }) {
  const [components, setComponents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/.netlify/functions/getPageStructure", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ pageSlug })
    })
      .then(r => r.json())
      .then(setComponents);
  }, [pageSlug]);

  return (
    <div>
      <h3>Components</h3>

      <ul>
        {components.map(c => (
          <li key={c.id}>
            <button onClick={() => setSelected(c)}>
              {c.type} ({c.id})
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <ComponentEditor token={token} component={selected} />
      )}
    </div>
  );
}
