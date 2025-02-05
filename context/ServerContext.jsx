import React, { createContext, useState, useContext } from "react";

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
    const [selectedServer, setSelectedServer] = useState(null);

    return (
        <ServerContext.Provider value={{ selectedServer, setSelectedServer }}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => useContext(ServerContext);
