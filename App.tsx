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
  TouchableOpacity,
  View,
} from 'react-native';

import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {verticalScale, scale} from 'react-native-size-matters';

export default function App() {
  const [logradouro, setLogradouro] = useState('');

  useEffect(() => {
    handlePosition();
    handleAdress();
  });

  const [coordsCurrent, setCoordsCurrent] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.025,
    longitudeDelta: 0.0000001,
  });

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
  Geocoder.init('AIzaSyA6qHVVxQCw2tv3_0nC42jv6SBqYnlN1Uo');

  async function handleAdress() {
    await Geocoder.from(coordsCurrent.latitude, coordsCurrent.longitude).then(
      content => {
        setLogradouro(content.plus_code.compound_code.substring(9));
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} color={'black'} />

        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{fontSize: 19, color: 'black'}}>PEDALADA</Text>
        </View>
      </View>
      <MapView
        style={{flex: 1}}
        onMapReady={() => {
          Platform.OS == 'android'
            ? PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              ).then(res => console.log('user aceitou', res))
            : null;
        }}
        showsUserLocation
        region={coordsCurrent}
      />

      <TouchableOpacity style={styles.btnStartActivity}>
        <Text style={{color: 'white', fontSize: 18}}>Iniciar Atividade</Text>
        {/* <Icon name="arrow-back" size={28} color={'black'} /> */}
        <Icon2 name="arrow-right" size={28} color={'white'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    height: verticalScale(65),
  },
  btnStartActivity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0563FF',
    margin: '5%',
    height: verticalScale(40),
    borderRadius: 7,
    alignItems: 'center',
  },
});
