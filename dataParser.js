//data parser
import { Asset } from 'expo-asset';
import Papa from 'papaparse';

export const loadGlacialLakes = async () => {
  try {
    const asset = Asset.fromModule(require('./assets/glofdata.csv'));
    await asset.downloadAsync(); // Ensure the asset is downloaded
    const response = await fetch(asset.localUri);
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });
  } catch (error) {
    throw new Error('Error loading glacial lakes');
  }
};

