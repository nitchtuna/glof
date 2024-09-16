import { Asset } from 'expo-asset';
import { readString } from 'react-native-csv'; // Import the parser

export const loadGlacialLakes = async () => {
  try {
    // Load the CSV file as an asset
    const asset = Asset.fromModule(require('./assets/glofdata.csv'));
    await asset.downloadAsync();

    // Fetch the CSV file
    const response = await fetch(asset.localUri);
    const csvText = await response.text();

    // Parse the CSV text using readString
    const results = readString(csvText, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true,
    });

    // Process the parsed data
    const lakes = results.data.map(record => ({
      LakeId: record['Lake ID'] || '',
      Region: record['Region'] || '',
      MajorRGIRegion: record['Major RGI Region'] || '',
      MountainRange: record['Mountain range region'] || '',
      Country: record['Country'] || '',
      Glacier: record['Glacier'] || '',
      RGIId: record['RGI glacier ID'] || '',
      LakeName: record['Lake name'] || '',
      LakeType: record['Lake type'] || '',
      Longitude: record['Longitude'] || '',
      Latitude: record['Latitude'] || '',
      River: record['River'] || '',
      OutburstMechanism: record['Outburst mechanism'] || ''
    }));

    return lakes;
  } catch (error) {
    throw new Error('Error loading glacial lakes: ' + error.message);
  }
};
