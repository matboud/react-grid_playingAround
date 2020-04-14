import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   useHistory,
   useLocation,
   useParams
} from "react-router-dom";
import styled, { css } from 'styled-components';
import UserGrid from './Profile/UserGrid';

// This example shows how to render two different screens
// (or the same screen in a different context) at the same URL,
// depending on how you got there.
//
// Click the "featured images" and see them full screen. Then
// "visit the gallery" and click on the colors. Note the URL and
// the component are the same as before but now we see them
// inside a modal on top of the gallery screen.

export default function ModalGalleryExample() {
   return (
      <Router>
         <ModalSwitch />
      </Router>
   );
}

function ModalSwitch() {
   let location = useLocation();

   // This piece of state is set when one of the
   // gallery links is clicked. The `background` state
   // is the location that we were at when one of
   // the gallery links was clicked. If it's there,
   // use it as the location for the <Switch> so
   // we show the gallery in the background, behind
   // the modal.
   let background = location.state && location.state.background;

   return (
      <div>
         <Switch location={background || location}>
            <Route exact path="/" children={<Home />} />
            <Route path="/gallery" children={<Gallery />} />
            <Route path="/img/:id" children={<ImageView />} />
         </Switch>

         {/* Show the modal when a background page is set */}
         {background && <Route path="/img/:id" children={<Modal />} />}
      </div>
   );
}

const Image = styled.div`
   width: 305px;
   height: 305px;
   background: no-repeat center/150% url(/img/${({ index }) => index}.jpg);
   transition: 0.4s;
  ${({ inModal }) => !inModal && css`
   :hover{
         opacity: .8;
   }
  `} 
`

const IMAGES = [
   { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
   { id: 1, title: "Lime Green", color: "LimeGreen" },
   { id: 2, title: "Tomato", color: "Tomato" },
   { id: 3, title: "Seven Ate Nine", color: "#789" },
   { id: 4, title: "Crimson", color: "Crimson" },
   { id: 6, title: "Dark Orchid", color: "DarkOrchid" },
   { id: 7, title: "Lime Green", color: "LimeGreen" },
   { id: 8, title: "Tomato", color: "Tomato" },
   { id: 9, title: "Seven Ate Nine", color: "#789" },
   { id: 10, title: "Crimson", color: "Crimson" },
   { id: 11, title: "Lime Green", color: "LimeGreen" },
   { id: 12, title: "Tomato", color: "Tomato" },
   { id: 13, title: "Seven Ate Nine", color: "#789" },
   { id: 14, title: "Crimson", color: "Crimson" },
   { id: 15, title: "Dark Orchid", color: "DarkOrchid" },
   { id: 16, title: "Lime Green", color: "LimeGreen" },
   { id: 17, title: "Tomato", color: "Tomato" },
   { id: 18, title: "Seven Ate Nine", color: "#789" },
   { id: 19, title: "Crimson", color: "Crimson" },
   { id: 20, title: "Dark Orchid", color: "DarkOrchid" },
   { id: 21, title: "Lime Green", color: "LimeGreen" },
   { id: 22, title: "Tomato", color: "Tomato" },
   { id: 23, title: "Seven Ate Nine", color: "#789" },
   { id: 24, title: "Crimson", color: "Crimson" }
];


function Home() {
   return (
      <div>
         <Link to="/gallery">Visit the Gallery</Link>
         <h2>Featured Images</h2>
         <ul>
            <li>
               <Link to="/img/2">Tomato</Link>
            </li>
            <li>
               <Link to="/img/4">Crimson</Link>
            </li>
         </ul>
      </div>
   );
}

const PhotoGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 305px);
   justify-content: center;
   
   gap: 20px
`
function Gallery() {
   let location = useLocation();

   return (
      <div>
         <UserGrid />
         <PhotoGrid>
            {IMAGES.map(i => (
               <Link
                  key={i.id}
                  to={{
                     pathname: `/img/${i.id}`,
                     // This is the trick! This link sets
                     // the `background` in location state.
                     state: { background: location }
                  }}
               >
                  <Image index={i.id} />
               </Link>
            ))}
         </PhotoGrid>
      </div>
   );
}

function ImageView() {
   let { id } = useParams();
   let image = IMAGES[parseInt(id, 10)];

   if (!image) return <div>Image not found</div>;

   return (
      <div>
         <h1>{image.title}</h1>
         <Image index={image.id} />
      </div>
   );
}

function Modal() {
   let history = useHistory();
   let { id } = useParams();
   let image = IMAGES[parseInt(id, 10)];

   if (!image) return null;

   let back = e => {
      e.stopPropagation();
      history.goBack();
   };

   return (
      <div
         onClick={back}
         style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.15)"
         }}
      >
         <div
            className="modal"
            style={{
               position: "absolute",
               background: "#fff",
               top: 25,
               left: "10%",
               right: "10%",
               padding: 15,
               border: "2px solid #444"
            }}
         >
            <h1>{image.title}</h1>
            <Image inModal index={image.id} />
            <button type="button" onClick={back}>
               Close
        </button>
         </div>
      </div>
   );
}
