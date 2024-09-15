//data parser
import { Asset } from 'expo-asset';
import { parse } from 'csv-parse/sync'; // Import synchronous parser

export const loadGlacialLakes = async () => {
  try {
    // Load the CSV file as an asset
    const asset = Asset.fromModule(require('./assets/glofdata.csv'));
    await asset.downloadAsync(); // Ensure the asset is downloaded

    // Fetch the CSV file
    const response = await fetch(asset.localUri);
    const csvText = await response.text();

    // Parse the CSV text
    const records = parse(csvText, {
      columns: true, // Use the first row as column headers
      skip_empty_lines: true, // Skip empty lines
    });

    return records;
  } catch (error) {
    throw new Error('Error loading glacial lakes: ' + error.message);
  }
};


