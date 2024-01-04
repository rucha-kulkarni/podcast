import React from "react";
import Button from "../../Common/Button";
import './styles.css'

function EpisodeDetails({ index, title, description, audioFile, onClick }) {
  return (
    <div className="episode-detail-cont"
      style={{ width: "100%" }}>
        <div>
      <h1 style={{ textAlign: "left", margin: "10px"}}>
        {index}. {title}
      </h1>
      <p style={{ marginLeft: "1.5rem" }} className="podcast-description ">
        {description}
      </p>
      </div>
      <Button
        text={"Play"}
        onClick={() => onClick(audioFile)}
        width={"100px"}
      />
    </div>
  );
}

export default EpisodeDetails;