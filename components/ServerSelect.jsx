import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useServer } from "../context/ServerContext";

const servers = [
  { id: 1, label: "Server 1", url: "https://flicky.host/embed/" },
  { id: 2, label: "Server 2", url: "https://multiembed.mov/directstream.php?" },
  { id: 3, label: "Server 3", url: "https://vidsrc.xyz/embed/" },
];

const ServerSelect = () => {

  const { selectedServer, setSelectedServer } = useServer();

  useEffect(() => {
    if (!selectedServer) {
      setSelectedServer(servers[0]);
    }
  }, []);

  const handleSelect = (server) => {
    setSelectedServer(server);
  };

  return (
    <View style={{ padding: 15 }}>
      <FlatList
        data={servers}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            className = {selectedServer?.id === item.id ? "bg-blue-600" : "bg-gray-800"} 
            style={{
              padding: 10,
              borderRadius: 10,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ServerSelect;
