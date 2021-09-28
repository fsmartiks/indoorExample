/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import IndoorAtlas from 'react-native-indooratlas';

const IA_API_KEY = '';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        console.log('Permission: ' + result);
      });
    }
    // start positioning
    IndoorAtlas.initialize({apiKey: IA_API_KEY})
      .watchPosition((position: any) => {
        console.log(
          'latitude: ' +
            position.coords.latitude +
            ', ' +
            'longitude: ' +
            position.coords.longitude +
            ', ' +
            'floor: ' +
            position.coords.floor,
        );
      })
      .getTraceId((traceId: any) => console.log('traceId: ' + traceId))
      .onStatusChanged((status: any) => console.log('status: +' + status.name))
      .watchVenue((venue: any) =>
        console.log('venue: ' + (venue.name || 'EXIT')),
      )
      .watchFloorPlan((fp: any) => console.log('fp: ' + JSON.stringify(fp)))
      .watchGeofences((type: any, geofence: any) =>
        console.log('geofence ' + type + ' ' + JSON.stringify(geofence)),
      );
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Merhaba</Text>
    </SafeAreaView>
  );
};

export default App;
