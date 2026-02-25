import { useEffect, useState } from "react";
import DocumentFields from "./DocumentFields"

export default function DocumentEditor({ token, component, preview }) {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/.netlify/functions/getDocument", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(component)
    })
      .then(r => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);

    await fetch("/.netlify/functions/updateDocument", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        collection: component.collection,
        refId: component.refId,
        data
      })
    });

    setSaving(false);
    alert("Saved!");
  };

  if (!data) return <div>Loading document...</div>;

  return (
    <>
    <div className="component-editor">
        <div className="component-editor-container">
            <DocumentFields
                data={data}
                setData={setData}
                token={token}
            />
        </div>

      <button onClick={save}>
        {saving ? "Saving..." : "Save"}
      </button>
    </div>

    {preview && ( <div className="admin-preview"> <h3>Live Preview:</h3> {preview(data)} </div> )}
    </>
  );
}