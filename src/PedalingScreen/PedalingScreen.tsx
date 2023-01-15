import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Button,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {RFValue} from 'react-native-responsive-fontsize';
import TopBar from '../component/geral/TopBar';

export default function PedalingScreen({navigation, route}) {
  const {coordsCurrent} = route.params;
  const [logradouro, setLogradouro] = useState('');
  const [startClock, setStartClock] = useState(false);
  const [resetClock, setResetClock] = useState(false);

  Geocoder.init('AIzaSyA_W1pnivvCCiFxniOW53ssiA7mA89JGm8');

  useEffect(() => {
    handleAdress();
  }, []);

  // função que pega o bairro/estado da pessoa que tá.
  async function handleAdress() {
    await Geocoder.from(coordsCurrent.latitude, coordsCurrent.longitude).then(
      content => {
        setLogradouro(content.plus_code.compound_code.substring(9));
      },
    );
  }

  // Aqui damos inicio no cronometro
  function startHoursClock() {
    setResetClock(false);
    setStartClock(true);
  }

  //  Estilização do cronometro

  const stopwatchStyle = {
    container: {
      alignItems: 'center',
      paddingTop: moderateScale(40),
      width: '100%',
      height: scale(140),
      backgroundColor: 'transparent',
    },
    text: {
      fontSize: moderateScale(30),
      color: '#181818',
      fontWeight: 'bold',
    },
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopBar hasBackButton={true} navigation={navigation} />
      {/* Mapa */}
      <MapView
        style={{flex: 1 / 1.75}}
        showsUserLocation
        region={{
          latitude: coordsCurrent.latitude,
          longitude: coordsCurrent.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.1,
        }}
      />
      <View style={styles.bodyHours}>
        <Text style={styles.youArePedalingText}>Você está pedalando em:</Text>
        <Text style={styles.publicPlace}>{logradouro}</Text>
        <Text style={styles.timer}>Tempo de corrida: </Text>
        <Stopwatch
          start={startClock}
          reset={resetClock}
          options={stopwatchStyle}
        />
      </View>
      <View style={styles.circleButton}>
        {!startClock ? (
          <Pressable
            onPress={() => startHoursClock()}
            style={styles.circleButtonIcon}>
            <Icon name="play" color={'white'} size={32} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setResetClock(true);
              setStartClock(false);
            }}
            style={styles.circleButtonIcon}>
            <Icon name="stop" color={'white'} size={32} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyHours: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{translateY: verticalScale(15)}],
  },
  youArePedalingText: {
    color: '#181818',
    fontSize: RFValue(18),
  },
  publicPlace: {
    color: '#181818',
    fontSize: RFValue(14),
    marginVertical: verticalScale(10),
  },

  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  circleButtonIcon: {
    backgroundColor: '#0563ff',
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    color: '#181818',
    fontSize: RFValue(17),
    marginVertical: verticalScale(10),
  },
});
