import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from './distanceUtils';

const MonitorScreen = () => {
  const [location, setLocation] = useState(null);
  const [glacialLakes, setGlacialLakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearbyLakes, setNearbyLakes] = useState([]);

  const mockGlacialLakes = [
    {
      'Lake name': 'Rajururi',
      Country: 'Peru',
      Latitude: '-9.062778',
      Longitude: '-77.681111',
    },
    {
      'Lake name': 'SomeOtherLake',
      Country: 'Nepal',
      Latitude: '22.9881',
      Longitude: '88.9250',
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
      } catch (err) {
        setError('Error fetching location');
        setLoading(false);
      }
    };

    fetchLocation();
    setGlacialLakes(mockGlacialLakes); // Set mock data for testing
    setLoading(false); // Stop loading once data is set
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
