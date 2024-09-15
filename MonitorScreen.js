// MonitorScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { loadGlacialLakes } from './dataParser';
import { getDistance } from './distanceUtils';

const MonitorScreen = () => {
  const [location, setLocation] = useState(null);
  const [glacialLakes, setGlacialLakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearbyLakes, setNearbyLakes] = useState([]);

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
      } catch (err) {
        setError('Error fetching location');
        setLoading(false);
      }
    };

    const fetchGlacialLakes = async () => {
      try {
        const data = await loadGlacialLakes();
        setGlacialLakes(data);
      } catch (err) {
        setError('Error loading glacial lakes');
      }
    };

    fetchLocation();
    fetchGlacialLakes();
  }, []);

  useEffect(() => {
    if (location && glacialLakes.length) {
      const nearby = glacialLakes.filter((lake) => {
        const distance = getDistance(
          location.latitude,
          location.longitude,
          parseFloat(lake.Latitude),
          parseFloat(lake.Longitude)
        );
        return distance <= 50; // 50 km radius
      });
      setNearbyLakes(nearby);
    }
  }, [location, glacialLakes]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      <Text>Nearby Glacial Lakes:</Text>
      {nearbyLakes.map((lake, index) => (
        <View key={index}>
          <Text>{lake['Lake name']}</Text>
          <Text>{lake['Country']}</Text>
        </View>
      ))}
    </View>
  );
};

export default MonitorScreen;
