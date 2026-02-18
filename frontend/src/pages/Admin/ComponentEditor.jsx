/*
import HeroEditor from "./editors/HeroEditor";
import ContentBlockEditor from "./editors/ContentBlockEditor";
import CollectionEditor from "./editors/CollectionEditor"; */

export default function ComponentEditor({ token, component }) {
  switch (component.type) {
    case "Hero":
      return <HeroEditor token={token} component={component} />;

    case "ContentBlock":
      return <ContentBlockEditor token={token} component={component} />;

    default:
      {/*return <CollectionEditor token={token} component={component} />; */}
        return <div><h2>component editor</h2></div>
  }
}
