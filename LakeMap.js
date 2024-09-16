import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

const LakeMap = () => {
  const navigation = useNavigation(); // Get navigation object

  const lakeData = [
    { id: 1, name: 'Lake A', latitude: 30.0, longitude: 80.0 },
    { id: 2, name: 'Lake B', latitude: 31.0, longitude: 81.0 },
    // Add more lake coordinates here
  ];

  const handleLakeSelection = (lake) => {
    navigation.navigate('MonitorScreen', { selectedLake: lake });
  };
  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType="hybrid" // Set to "hybrid" for better water texture
        initialRegion={{
          latitude: 30.0,
          longitude: 80.0,
          latitudeDelta: 5.0,
          longitudeDelta: 5.0,
        }}
      >
        {lakeData.map((lake) => (
          <Marker
            key={lake.id}
            coordinate={{ latitude: lake.latitude, longitude: lake.longitude }}
            title={lake.name}
            onPress={() => handleLakeSelection(lake)} // Pass entire lake object
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LakeMap;
