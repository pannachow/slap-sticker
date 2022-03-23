import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "../useWebcamCapture";
import slap from "../assets/slap.png";
import slap2 from "../assets/slap2.png";
import slap3 from "../assets/slap3.png";

const useStyles = createUseStyles((theme) => ({
  Step: {
    fontWeight: "bold",
  },
  Slapper: {
    "& canvas": {
      background: theme.palette.secondary,
      width: "100%",
      height: "auto",
      borderRadius: "5px",
    },
    "& video": {
      display: "none",
    },
  },
  Stickers: {
    "& img": {
      height: "64px",
    },
    "& button + button": {
      marginLeft: "5px",
    },
  },
  StickerButton: {
    backgroundColor: theme.palette.textSecondary,
    "&:hover": {
      cursor: "pointer",
    },
  },
  StickerButtonActive: {
    backgroundColor: theme.palette.text,
  },
  Gallery: {
    "& img": {
      height: "200px",
    },
  },
  Pictures: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  Picture: {
    background: "#050505",
    position: "relative",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "10px",
    "& h3": {
      textAlign: "center",
      width: "100%",
    },
    "& button": {
      width: "100%",
    },
    "& button:hover": {
      cursor: "pointer",
    },
  },
}));

const stickers = [slap, slap2, slap3].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

// ref: https://stackoverflow.com/a/15832662/1466456
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
  const [activeSticker, setActiveSticker] = useState(stickers[0]);
  // title for the picture that will be captured
  const [title, setTitle] = useState("SLAPPE!");

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    pictures, // latest captured pictures data objects
  ] = useWebcamCapture(activeSticker?.img, title);

  return (
    <main>
      <section>
        <p>
          <span className={classes.Step}>Step 1:</span> Give it a name
        </p>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </section>
      <section className={classes.Stickers}>
        <p>
          <span className={classes.Step}>Step 2:</span> Select your sticker
        </p>
        {stickers.map((sticker) => (
          <button
            className={`${classes.StickerButton} ${
              sticker === activeSticker ? classes.StickerButtonActive : ""
            }`}
            key={sticker.url}
            onClick={() => setActiveSticker(sticker)}
          >
            <img src={sticker.url} alt="sticker" />
          </button>
        ))}
      </section>
      <section className={classes.Slapper}>
        <p>
          <span className={classes.Step}>Step 3:</span> Slap yourself!
        </p>
        <video ref={handleVideoRef} />
        <canvas
          ref={handleCanvasRef}
          width={2}
          height={2}
          onClick={handleCapture}
        />
      </section>
      <section className={classes.Gallery}>
        <p>
          <span className={classes.Step}>Step 4:</span> Cherish this moment
          forever
        </p>
        <div className={classes.Pictures}>
          {pictures.map((picture, i) => (
            <div key={i} className={classes.Picture}>
              <img src={picture.dataUri} alt="slapped sticker" />
              <h3>{picture.title}</h3>
              <button
                onClick={() =>
                  downloadURI(picture.dataUri, `${picture.title}.jpg`)
                }
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
