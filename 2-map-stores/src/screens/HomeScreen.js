import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useRef } from "react";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import products from "../../products";

const HomeScreen = () => {
  const map = useRef(null);
  const initialRegion = {
    latitude: 41.01852,
    longitude: 28.682532,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  const handleZoom = (type) => {
    map.current.getCamera().then((camera) => {
      if (type === "ZOOM_IN") {
        camera.altitude /= 2;
      } else {
        camera.altitude *= 2;
      }
      map.current.animateCamera(camera);
    });
  };
  return (
    <View>
      <MapView
        ref={map}
        initialRegion={initialRegion}
        style={styles.map}
        mapType="standard"
      >
        {/* <UrlTile
          urlTemplate={"http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"}
          maximumZ={19}
          flipY={false}
        /> */}
      </MapView>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => handleZoom("ZOOM_IN")}>
          <AntDesign name="pluscircleo" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleZoom("ZOOM_OUT")}>
          <AntDesign name="minuscircleo" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ position: "absolute", bottom: 70 }}
        data={products}
        horizontal
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "#fff" }}>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  controls: {
    backgroundColor: "white",
    position: "absolute",
    right: 10,
    bottom: 70,
    borderRadius: 5,
    padding: 5,
    gap: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
