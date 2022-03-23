import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "../useWebcamCapture";
import slap from "../assets/slap.png";
import slap2 from "../assets/slap2.png";
import slap3 from "../assets/slap3.png";

const useStyles = createUseStyles((theme) => ({
  Main: {
    background: theme.palette.secondary,

    "& canvas": {
      marginTop: "10px",
      marginBottom: "10px",
      width: "100%",
      height: "auto",
    },
    "& video": {
      display: "none",
    },

    paddingTop: "10px",
  },
  Stickers: {
    "& img": {
      height: "64px",
    },
    paddingBottom: "15px",
  },
  Gallery: {
    "& img": {
      height: "200px",
    },
    paddingTop: "20px",
    paddingBottom: "15px",
  },
  Pictures: {
    display: "flex",
    flexWrap: "wrap",
  },
  Picture: {
    background: "black",
    position: "relative",
    margin: 2,
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
    },
  },
  Input: {
    marginLeft: "8px",
  },
  StickerButton: {
    marginLeft: "8px",
  },
}));

const stickers = [slap, slap2, slap3].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

// Ref: https://stackoverflow.com/a/15832662/1466456
function downloadURI(uri, name) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Home(props) {
  const classes = useStyles(props);
  // currently active sticker
  const [sticker, setSticker] = useState();
  // title for the picture that will be captured
  const [title, setTitle] = useState("SLAPPE!");

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    pictures, // latest captured pictures data objects
  ] = useWebcamCapture(sticker?.img, title);

  return (
    <main>
      <section className={classes.Gallery}>
        Step one: Give it a name
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className={classes.Input}
        />
      </section>
      <section className={classes.Stickers}>
        Step 2: select your sticker...
        {stickers.map((sticker) => (
          <button
            key={sticker.url}
            onClick={() => setSticker(sticker)}
            className={classes.StickerButton}
          >
            <img src={sticker.url} alt="sticker" />
          </button>
        ))}
      </section>
      <section className={classes.Main}>
        Step three: Slap your self!
        <video ref={handleVideoRef} />
        <canvas
          ref={handleCanvasRef}
          width={2}
          height={2}
          onClick={handleCapture}
        />
      </section>
      <section className={classes.Gallery}>
        Step 4: Cherish this moment forever
        <div className={classes.Pictures}>
          {pictures.map((picture) => (
            <div key={picture.dataUri} className={classes.Picture}>
              <img src={picture.dataUri} alt="slapped sticker" />
              <h3>{picture.title}</h3>
              <button
                onClick={() => downloadURI(picture.dataUri, "slapped.jpg")}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
