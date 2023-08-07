import React, {useState} from 'react';
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [openCamera, setOpenCamera] = useState(false);
  const [scannedData, setScannedData] = useState('Nothing found');

  const openScannedURL=async ()=>{
    const url = scannedData
      const supported = await Linking.canOpenURL(url); 
      if (supported) {
      await Linking.openURL(url); 
      } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
      }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.mainWrapper}>
        {openCamera ? (
          <QRCodeScanner
            onRead={data => setScannedData(data?.data)}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            reactivate={true}
            reactivateTimeout={2000}
            showMarker={true}
            bottomContent={
              <View style={styles.closeAndResult}>
                <Pressable
                  style={styles.primaryButton}
                  onPress={() => setOpenCamera(false)}>
                  <Text style={styles.primaryButtonHeading}>
                    Click to stop scan
                  </Text>
                </Pressable>
                <Text>{scannedData}</Text>
              </View>
            }
          />
        ) : (
          <>
            <Pressable
              style={styles.primaryButton}
              onPress={() => {setOpenCamera(true);setScannedData("Nothing found")}}>
              <Text style={styles.primaryButtonHeading}>
                Click to start scan
              </Text>
            </Pressable>

            <Pressable style={styles.primaryButton} onPress={openScannedURL}>
              <Text style={styles.primaryButtonHeading}>{scannedData}</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  mainWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('80%'),
  },

  primaryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'grey',
    borderRadius: 10,
    marginBottom: 20,
  },
  primaryButtonHeading: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
