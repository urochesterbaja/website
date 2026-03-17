import { useEffect, useState } from "react";


// this one's pretty easy
// just pull the pages, then map pages as options in the selector menu
// note that this doesn't trigger anything unless onSelect is defined when the component is placed in another page
// the intention is that onSelect triggers the corresponding component list of the page to render
export default function PageSelector({ token, onSelect }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/getPages", {
      method: "HEAD",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setPages);
  }, []);

  return (
    <div className="page-selector-container">
      <h3 className="admin-h3">Select Page</h3>
      <select className="page-selector" onChange={e => onSelect(e.target.value)}>
        <option className="page-selector-option" value="">-- choose page --</option>
        {pages.map(p => (
          <option className="page-selector-option" key={p.pageSlug} value={p.pageSlug}>
            {p.pageSlug}
          </option>
        ))}
      </select>
    </div>
  );
}
