import React, { useState } from "react";
import styled from "styled-components";
import junior from "./junior.jpg"; // Remplacez par le chemin réel de votre image
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageStyled = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  border-radius: 50%;
`;

const FullScreenImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FullScreenImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: -275px;
  right: -310px;
  color: white;
  background-color: transparent;
  &:hover {
    background-color: red; // Change the color to red when hovered
  }
`;

const ImageComponent = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const handleCloseClick = () => {
    setIsFullScreen(false);
  };

  return (
    <div>
      <ImageStyled src={junior} onClick={handleImageClick} />
      {isFullScreen && (
        <FullScreenImageContainer>
          <FullScreenImage src={junior} />
          <CloseButton onClick={handleCloseClick}>
            <CloseIcon />
          </CloseButton>
        </FullScreenImageContainer>
      )}
    </div>
  );
};

export default ImageComponent;
