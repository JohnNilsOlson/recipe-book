import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function ConfirmSignUp({ navigation }) {
  const [ username, setUsername ] = useState('');
  const [ authCode, setAuthCode ] = useState('');

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log('Code Confirmed!');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Verification Code Does Not Match.  Please Enter Valid Verfication Code!');
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon='account'
          placeholder='Enter Username'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <AppTextInput
          value={authCode}
          onChangeText={text => setAuthCode(text)}
          leftIcon='numeric'
          placeholder='Enter Verification Code'
          keyboardType='numeric'
        />
        <AppButton title='Confirm Sign Up' onPress={confirmSignUp} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15
  }
});