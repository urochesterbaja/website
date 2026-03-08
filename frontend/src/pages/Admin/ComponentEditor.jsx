import Hero from "../../components/Hero/Hero";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import TeamBlock from "../../components/TeamBlock/TeamBlock"
import NewsBlock from "../../components/NewsBlock/NewsBlock"
import GalleryBlock from "../../components/GalleryBlock/GalleryBlock"
import ResultsBlock from "../../components/ResultsBlock/ResultsBlock"
import PartnerBlock from "../../components/PartnerBlock/PartnerBlock"

import DocumentEditor from "./editors/DocumentEditor"

// basically, this one just returns a documentEditor paired with the appropriate component to fit in the live preview
// most of the meat and potatoes sits in documentEditor and documentFields
export default function ComponentEditor({ token, component }) {
  switch (component.type) {
    case "Hero":
      return <DocumentEditor token={token} component={component} 
        preview={(data) => (<Hero heroInfo={data} />)}/>;

    case "ContentBlock":
      return <DocumentEditor token={token} component={component} 
        preview={(data) => (
          <ContentBlock
            title={data.title}
            content={data.content}
            content2={data.content2}
            imgURL={data.img}
            flip={data.flip}
            buttonText={data.buttonText}
            buttonLink={data.buttonLink}
          />
        )} 
      />

      case "TeamBlock":
        return <DocumentEditor token={token} component={component}
          preview={(data) => (
            <TeamBlock name={data.group} memberList={data.Members}/>
          )}
        />

      case "NewsBlock" :
        return <DocumentEditor token={token} component={component}
          preview={(data) => (
            <NewsBlock newsArticles={data}/>
          )}
        />

      case "GalleryBlock" :
        return <DocumentEditor token={token} component={component}
          preview={(data) => (
            <GalleryBlock gallery={data}/>
          )}
        />

      case "ResultsBlock" :
        return <DocumentEditor token={token} component={component}
          preview={(data) => (
            <ResultsBlock results={data}/>
          )} 
        />
      
      case "PartnerBlock" :
        return <DocumentEditor token={token} component={component}
          preview={(data) => (
            <PartnerBlock tier={data.tier} imgList={data.partners}/>
          )}
        />
    
    // if for some reason the component isn't listed here, just don't return a preview
    // the documentEditor runs just off of fields in the db, so it doesn't strictly need a component to work
    // mostly useful for general info storage like contact info
    default:
      return <DocumentEditor token={token} component={component} />;
  }
}
