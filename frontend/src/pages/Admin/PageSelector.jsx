import { useEffect, useState } from "react";

export default function PageSelector({ token, onSelect }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/getPages", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setPages);
  }, []);

  return (
    <div>
      <h3>Select Page</h3>
      <select onChange={e => onSelect(e.target.value)}>
        <option value="">-- choose page --</option>
        {pages.map(p => (
          <option key={p.pageSlug} value={p.pageSlug}>
            {p.pageSlug}
          </option>
        ))}
      </select>
    </div>
  );
}
