// frontend/src/components/MarkerBasedAR.js
import React, { useEffect } from "react";
import "aframe";
import "mind-ar-js"; // Ensure you have this package installed for marker-based AR

const MarkerBasedAR = () => {
  useEffect(() => {
    // Set up your AR scene here if needed
  }, []);

  return (
    <div className="marker-based-ar">
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-marker preset="hiro">
          <a-box position="0 0.5 0" material="color: yellow;"></a-box>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default MarkerBasedAR;
