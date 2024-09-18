import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from './distanceUtils';
import { useNavigation, useRoute } from '@react-navigation/native';
import mockGlacialLakes from './AratakiItto';
import LottieView from 'lottie-react-native';


const MonitorScreen = () => {
  const [location, setLocation] = useState(null);
  const [nearbyLakes, setNearbyLakes] = useState([]);
  const [selectedLake, setSelectedLake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const route = useRoute();
  const navigation = useNavigation();

  // Use lake selected from the LakeMap, if available
  const { selectedLake: lakeFromMap } = route.params || {};

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission not granted');
          setLoading(false);
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync();
        setLocation(coords);
        setLoading(false);
      } catch (err) {
        setError('Error fetching location');
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(true);
      const nearby = mockGlacialLakes.filter((lake) => {
        const distance = getDistance(
          location.latitude,
          location.longitude,
          parseFloat(lake.Latitude),
          parseFloat(lake.Longitude)
        );
        return distance <= 50; // 50 km radius
      });

      setNearbyLakes(nearby);

      // Use lake from map if present, otherwise select the first nearby lake
      setSelectedLake(lakeFromMap || (nearby[0] || null));
      setLoading(false);
    }
  }, [location, lakeFromMap]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {/* Add your Lottie animation here */}
        <LottieView
          source={require('./assets/fish.json')} // Update this to your actual Lottie file
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chooseLakeButton}
        onPress={() => navigation.navigate('LakeMap')}
      >
        <Text style={styles.buttonText}>Choose a Glacial Lake</Text>
      </TouchableOpacity>

      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Latitude: {location.latitude.toFixed(4)}</Text>
          <Text style={styles.locationText}>Longitude: {location.longitude.toFixed(4)}</Text>
        </View>
      )}

      {nearbyLakes.length === 0 ? (
        <View style={styles.noLakesContainer}>
          <Text style={styles.noLakesText}>No nearby lakes found. Please choose a glacial lake to monitor.</Text>
        </View>
      ) : (
        <>
          <View style={styles.modelContainer}>
            {/* Placeholder for the 3D model */}
            <Text style={styles.modelPlaceholder}>3D Model Placeholder</Text>
          </View>

          {selectedLake && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Lake Name: {selectedLake['Lake name'] || 'N/A'}</Text>
              <Text style={styles.detailText}>River: {selectedLake['River'] || 'N/A'}</Text>
              <Text style={styles.detailText}>Glacier: {selectedLake['Glacier'] || 'N/A'}</Text>
              <Text style={styles.detailText}>Type of Lake: {selectedLake['Lake type'] || 'N/A'}</Text>
              <Text style={styles.detailText}>Region: {selectedLake['Region'] || 'N/A'}</Text>
              <Text style={styles.detailText}>Country: {selectedLake['Country'] || 'N/A'}</Text>
            </View>
          )}

          {nearbyLakes.length > 1 && (
            <View style={styles.toggleContainer}>
              {nearbyLakes.map((lake, index) => (
                <Animated.View
                  key={index}
                  style={[styles.buttonContainer, { transform: [{ scale: scaleAnims[index] }] }]}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleButtonPress(index)}
                  >
                    <Text style={styles.buttonText}>{lake['Lake name']}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0F7FA', // Icy background color
  },
  chooseLakeButton: {
    position: 'absolute',
    top: 16,
    left: 10,
    backgroundColor: '#1c0166',
    padding: 6,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 14,
  },
  locationContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 0, // No rounding, for rectangular shape
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Medium', // Professional font
  },
  modelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
  },
  modelPlaceholder: {
    fontSize: 20,
    fontFamily: 'HelveticaNeue-Bold',
    color: '#00115b', // Dark, icy tone for text
  },
  noLakesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLakesText: {
    fontSize: 20,
    fontFamily: 'HelveticaNeue-Bold',
    color: '#00115b',
    textAlign: 'center',
  },
  detailsContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Medium', // Professional font
    color: '#00115b',
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
  },
  buttonContainer: {
    margin: 8,
  },
  button: {
    backgroundColor: '#00115b', // Demure background color
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  lottie: {
    width: 150,
    height: 150,
  },
});

export default MonitorScreen;
