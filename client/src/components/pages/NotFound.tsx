import React, { useRef } from "react";
import "./NotFound.css";
// import sound from "../../public/vine-boom-holy-moly.mp3";

const NotFound = () => {
  // const audioElementRef = useRef<HTMLAudioElement>(null);

  // const playAudio = () => {
  //   if (audioElementRef.current) {
  //     audioElementRef.current.play().catch(error => {
  //       console.error("Error playing audio:", error);
  //     });
  //   }
  // };

  return (
    <div className="NotFound">
      <div className="u-hideOverflow NotFound-container">
        <div className="u-flexColumn NotFound-textContainer">
          <h1>Page Not Found</h1>
          <div>
            <div className="u-flex u-flex-justifyCenter u-flex-alignCenter">
              <center>
                <img src="https://media.tenor.com/TmvqZuZdfqQAAAAM/holy-moly-holy.gif" alt="" />
              </center>
            </div>
            <br></br>
            Unfortunately, this page (<strong>{window.location.pathname}</strong>) doesn't exist.
            <br></br>
            What you see in the bar is what we've got!
          </div>
          {/* <button onClick={playAudio}>Play Sound</button>
          <audio ref={audioElementRef} src={sound} /> */}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
