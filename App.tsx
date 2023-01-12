import React, {createRef, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

export default function App() {
  useEffect(() => {
    handlePosition();
  }, []);

  const [coordsCurrent, setCoordsCurrent] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.025,
    longitudeDelta: 0.0000001,
  });
  const mapRef = createRef();

  async function handlePosition() {
    Geolocation.getCurrentPosition(content => {
      setCoordsCurrent({
        latitude: content?.coords.latitude,
        longitude: content?.coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.0000001,
      });
    });
  }
  Geocoder.init('AIzaSyA6qHVVxQCw2tv3_0nC42jv6SBqYnlN1Uo', {language: 'en'});

  async function handleAdress() {
    Geocoder.from(coordsCurrent.latitude, coordsCurrent.longitude).then(
      content => {
        console.log(content.plus_code.compound_code.substring(9));
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Pesquisar" onPress={handleAdress} />
      <MapView
        onMapReady={() => {
          Platform.OS == 'android'
            ? PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              ).then(res => console.log('user aceitou', res))
            : null;
        }}
        style={{flex: 1}}
        showsUserLocation
        region={coordsCurrent}
        // region={{
        //   latitude: -7.9248627,
        //   longitude: -34.8306862,
        //   latitudeDelta: 0.015,
        //   longitudeDelta: 0.0121,
        // }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
});
