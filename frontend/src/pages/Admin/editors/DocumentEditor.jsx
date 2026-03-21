import { useEffect, useState } from "react";
import DocumentFields from "./DocumentFields"

// this takes in a component (db document) and preview element
// it basically works as a wrapper for document fields that handles preview and data fetch/update from the db
// all of the data fetch/update within fields happens locally, doesn't get saved until it propogates back up to here
export default function DocumentEditor({ token, component, preview }) {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  //set the data of the preview element with the document that's being retrieved
  //this allows for live preview updates
  useEffect(() => {
    fetch("/.netlify/functions/getDocument", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(component)
    })
      .then(r => r.json())
      .then(setData);
  }, []);

  // this is the bit that actually saves the data to the db
  // access the collection and then the refID (hashed value) to get to doc
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
  };

  if (!data) return <div>Loading document...</div>;

  //returns documentFields, which dictates the actual editing
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