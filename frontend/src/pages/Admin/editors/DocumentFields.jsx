import { useState } from "react";
import { FaTrash } from "react-icons/fa";


function DocumentFields({ data, setData, token }) {
  const updateField = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const renderField = (key, value) => {
    if (key === "_id" || key === "__v" || key === "path" || key === "schema") return null;

    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, c => c.toUpperCase());

    if (Array.isArray(value)) {
      return (
        <div key={key} className="component-editor-row">
          <h4>{label} (Collection)</h4>

          {value.map((item, index) => {
            const dropdownTitle =
                item?.name ||
                item?.title ||
                `Item ${index + 1}`;

            return (
                <ArrayItemDropdown
                key={item._id || index}
                title={dropdownTitle}
                onTrashToggle={(trashed, removedItem) => {
                    setData(prev => {
                    const current = [...prev[key]];

                    if (trashed) {
                        // REMOVE from array
                        current.splice(index, 1);
                    } else {
                        // RESTORE at original position
                        current.splice(index, 0, removedItem);
                    }

                    return { ...prev, [key]: current };
                    });
                }}
                >
                <DocumentFields
                    data={item}
                    setData={(updatedItem) => {
                    setData(prev => {
                        const newArr = [...prev[key]];

                        const resolved =
                        typeof updatedItem === "function"
                            ? updatedItem(prev[key][index])
                            : updatedItem;

                        newArr[index] = resolved;
                        return { ...prev, [key]: newArr };
                    });
                    }}
                    token={token}
                />
                </ArrayItemDropdown>
            );
            })}
            <button 
            type="button"
            className="add-item-btn"
            onClick={() => {
            setData(prev => ({
                ...prev,
                [key]: [...(prev[key] || []), data.schema] // here the object needs to be mapped to a schema
            }));
            }}
            >
            + Add Item
        </button>
        </div>
      );
    }

    switch (typeof value) {
      case "boolean":
        return (
          <div key={key} className="component-editor-field">
            <h5>{label}</h5>
            <input
              type="checkbox"
              checked={value}
              onChange={e => updateField(key, e.target.checked)}
            />
          </div>
        );

      case "number":
        return (
          <div key={key} className="component-editor-field">
            <h5>{label}</h5>
            <input
              type="number"
              value={value}
              onChange={e => updateField(key, Number(e.target.value))}
            />
          </div>
        );

      case "string":
        const isLong = value.length > 80 || value.includes("\n");
        return (
          <div key={key} className="component-editor-field">
            <h5>{label}</h5>
            {isLong ? (
              <textarea
                value={value}
                onChange={e => updateField(key, e.target.value)}
              />
            ) : (
              <input
                value={value}
                onChange={e => updateField(key, e.target.value)}
              />
            )}
          </div>
        );

      case "object":
        if (value === null) return null;

        return (
          <div key={key} className="component-editor-field">
            <h5>{label} (Object)</h5>
            <textarea
              value={JSON.stringify(value, null, 2)}
              onChange={e => {
                try {
                  updateField(key, JSON.parse(e.target.value));
                } catch {
                  // silently ignore invalid JSON
                }
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Object.entries(data).map(([key, value]) =>
        renderField(key, value)
      )}
    </>
  );
}

function ArrayItemDropdown({ title, children, onTrashToggle }) {
  const [open, setOpen] = useState(false);
  const [trashed, setTrashed] = useState(false);
  const [removedItem, setRemovedItem] = useState(null);

  const toggleTrash = () => {
    if (!trashed) {
      // About to remove
      setRemovedItem(children.props.data); 
      onTrashToggle(true, children.props.data);
    } else {
      // About to restore
      onTrashToggle(false, removedItem);
    }

    setTrashed(prev => !prev);
  };

  return (
    <div className="array-dropdown">
      <div className="array-dropdown-header">
        <strong onClick={() => setOpen(prev => !prev)}>
          {open ? "▼" : "▶"} {title}
        </strong>

        <FaTrash onClick={toggleTrash} />
      </div>

      {open && !trashed && (
        <div className="array-dropdown-body">
          {children}
        </div>
      )}
    </div>
  );
}

export default DocumentFields;