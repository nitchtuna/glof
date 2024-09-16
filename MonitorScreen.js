import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from './distanceUtils';

const MonitorScreen = () => {
  const [location, setLocation] = useState(null);
  const [glacialLakes, setGlacialLakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearbyLakes, setNearbyLakes] = useState([]);
  const [selectedLake, setSelectedLake] = useState(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  
  // Initialize animation values
  const scaleAnims = nearbyLakes.map(() => new Animated.Value(1));

  // Mock data
  const mockGlacialLakes = [
    {
      'Lake name': 'Rajururi',
      River: 'None',
      Glacier: 'RGI60-16.02480',
      'Type of Lake': 'Moraine',
      Region: 'Low-latitude Andes',
      Country: 'Peru',
      Latitude: '37.4221',
      Longitude: '-122.0839',
    },
    {
      'Lake name': 'SomeOtherLake',
      River: 'None',
      Glacier: 'RGI60-16.02481',
      'Type of Lake': 'Moraine',
      Region: 'Himalayas',
      Country: 'Nepal',
      Latitude: '37.4221',
      Longitude: '-122.0839',
    },
    // Add more lake objects as needed
  ];

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
      setSelectedLake(nearby[0] || null);
      setLoading(false);
    }
  }, [location]);

  const handleButtonPress = (index) => {
    // Reset all buttons to default scale
    scaleAnims.forEach((anim, i) => {
      Animated.spring(anim, {
        toValue: i === index ? 1.1 : 1,
        useNativeDriver: true,
      }).start();
    });
    setSelectedButtonIndex(index);
    setSelectedLake(nearbyLakes[index]);
  };

  if (loading) return <ActivityIndicator />; // Loading spinner
  if (error) return <Text>{error}</Text>; // Error message

  return (
    <View style={styles.container}>
      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Latitude: {location.latitude.toFixed(4)}</Text>
          <Text style={styles.locationText}>Longitude: {location.longitude.toFixed(4)}</Text>
        </View>
      )}

      <View style={styles.modelContainer}>
        {/* Placeholder for the 3D model */}
        <Text style={styles.modelPlaceholder}>3D Model Placeholder</Text>
      </View>

      {selectedLake && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Lake Name: {selectedLake['Lake name'] || 'N/A'}</Text>
          <Text style={styles.detailText}>River: {selectedLake['River'] || 'N/A'}</Text>
          <Text style={styles.detailText}>Glacier: {selectedLake['Glacier'] || 'N/A'}</Text>
          <Text style={styles.detailText}>Type of Lake: {selectedLake['Type of Lake'] || 'N/A'}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0F7FA', // Icy background color
  },
  locationContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Medium', // Professional font
  },
});

export default MonitorScreen;
