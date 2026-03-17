import { useState } from "react";
import { FaTrash } from "react-icons/fa";


// this is the most evil of the admin docs
// most of it I (WH) wrote in a sleep deprived trance while i was also balancing 2 projects with the HCI lab and the rest of my coursework, best of luck to you
// i'd STRONGLY advise reading the README that contains outline of the site structure before playing with this

// the basic structure is as follows:
// map through all elements in the document passed in as data
// non-array elements just get rendered with their appropriate editors, nothing too crazy
// array elements get rendered as set of dropdowns with a children that are recursive calls to documentFields containing just the object information for that array index
// this way, the elements in the array get rendered as though they were their own document, with all of the appropriate editors for field types
// and when those elements get edited, the documentFields that wraps them passes the data back up the recursion tree, eventually updating the root data that was passed in
// in other words, when you get to an array, map through all the objects within it and return documentFields but inside dropdowns
// creating new array elements maps from a schema that should be stored in the db, same way that creating new components pulls from the component registry

function DocumentFields({ data, setData, token }) {
  // change the specific field that was updated
  const updateField = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  // this function is the money, it does most of the heavy lifting. majority of the above comments refer to stuff in here
  const renderField = (key, value) => {
    // skip elements that user shouldn't be able to edit
    if (key === "_id" || key === "__v" || key === "path" || key === "schema") return null;

    // bit of regex replacement to switch from camelCase to Regular Title Case
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, c => c.toUpperCase());
    
    //check if the value is an array, needs a special call because structured data type
    //rest of value checks fall under the switch later on in the doc
    if (Array.isArray(value)) {
      return (
        <div key={key} className="component-editor-row">
          <h4>{label} (Collection)</h4>

          
          {// for every element in the array map it to a dropdown containing a recursive documentFields call
          //the dropdown is listed as a function at the end of this doc
          value.map((item, index) => {
            const dropdownTitle =
                item?.name ||
                item?.title ||
                `Item ${index + 1}`;

            return (
                <ArrayItemDropdown
                key={item._id || index}
                title={dropdownTitle}
                // if trash hit then splice the item out of the array
                onTrash={() => {
                    setData(prev => {
                    const current = [...prev[key]];
                    current.splice(index, 1);
                    return { ...prev, [key]: current };
                    });
                }}
                >
                  <DocumentFields
                      data={item}
                      setData={(updatedItem) => {
                      setData(prev => {
                        //this is the function that helps the edit propogation in the recursion work
                        //when an array element gets edited, propogate changes up by one layer
                          const newArr = [...prev[key]];

                          // editing array elements actually returns the edit function, so this bit of code makes sure the actual data gets edited
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
                //adds element to the array, nothing too crazy
                //key aspect here is data.schema, which is stored in every document with an array
                //the schema outlines what a new array element must contain
              setData(prev => ({
                  ...prev,
                  [key]: [...(prev[key] || []), data.schema]
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

      //object case shouldn't happen, since documentFields is designed to render objects
      //if this ever comes up it should be replaced with a recursive call to documentFields instead
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

//this one is actually quite simple, it just takes in a trash function and the children and wraps them in a nice dropdown box
//when the "add item bug" gets fixed this will need a rework too
function ArrayItemDropdown({ title, children, onTrash }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="array-dropdown">
      <div className="array-dropdown-header" onClick={() => setOpen(prev => !prev)}>
        <strong>
          {open ? "▼" : "▶"} {title}
        </strong>

        <FaTrash onClick={onTrash} />
      </div>

      {open && (
        <div className="array-dropdown-body">
          {children}
        </div>
      )}
    </div>
  );
}

export default DocumentFields;