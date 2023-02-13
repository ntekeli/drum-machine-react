import React from "react";

const VolumeContext = React.createContext({
    instrumentLevels: [],
    instrumentMute: [],
    instrumentPitch: [],
    volumeHandler: (level, id) => {},
    muteHandler: (id) => {},
    unmuteHandler: (id) => {},
});

export default VolumeContext;