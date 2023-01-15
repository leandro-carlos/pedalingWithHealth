import React, {createRef, useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {verticalScale, scale} from 'react-native-size-matters';
import TopBar from '../component/geral/TopBar';
import {RFValue} from 'react-native-responsive-fontsize';

export default function Home({navigation}) {
  useEffect(() => {
    handlePosition();
  }, []);

  const [coordsCurrent, setCoordsCurrent] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.025,
    longitudeDelta: 0.0000001,
  });

  // Funcao pra pegar as coordenadas do usuario após ele permitir o uso do gps.
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

  // Pegar permissao do gps
  async function handlePermissionGps() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permitir acesso ao GPS',
        message:
          'É necessário a autorização pra poder usar o aplicativo por inteiro.',
        buttonNeutral: 'Perguntar Depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'PERMITIR',
      },
    ).then(res => {
      return true;
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Component topBar pra manter a padronização entre as telas  */}
      <TopBar hasBackButton={false} />
      <MapView
        style={{flex: 1}}
        onMapReady={() => {
          handlePermissionGps();
        }}
        showsUserLocation
        region={coordsCurrent}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PedalingScreen', {
            coordsCurrent: coordsCurrent,
          })
        }
        style={styles.btnStartActivity}>
        <Text style={{color: 'white', fontSize: RFValue(18)}}>
          Iniciar Atividade
        </Text>
        <Icon2 name="arrow-right" size={28} color={'white'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
