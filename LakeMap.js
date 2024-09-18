import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import mockGlacialLakes from './AratakiItto';
import mapAnimation from './assets/map.json'; // Import your Lottie animation

const LakeMap = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const handleMapLoad = () => {
    setLoading(false);
  };

  const handleLakeSelection = (lake) => {
    navigation.navigate('MonitorScreen', { selectedLake: lake });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <LottieView
            source={mapAnimation} // Use the imported Lottie animation
            autoPlay
            loop
            style={[styles.lottie, { width: 400, height: 400 }]}
          />
        </View>
      )}

      <MapView
        style={styles.map}
        mapType="hybrid"
        initialRegion={{
          latitude: 30.0,
          longitude: 80.0,
          latitudeDelta: 5.0,
          longitudeDelta: 5.0,
        }}
        onMapReady={handleMapLoad} // Hide loading when the map is ready
      >
        {mockGlacialLakes.map((lake) => {
          const latitude = parseFloat(lake.Latitude);
          const longitude = parseFloat(lake.Longitude);

          if (isNaN(latitude) || isNaN(longitude)) {
            console.warn(`Invalid coordinates for lake: ${lake['Lake name']}`);
            return null;
          }

          return (
            <Marker
              key={lake.LakeId}
              coordinate={{ latitude, longitude }}
              title={lake['Lake name']}
              onPress={() => handleLakeSelection(lake)}
            />
          );
        })}
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 10, // Ensure loading screen appears above the map
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default LakeMap;
