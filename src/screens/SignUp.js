import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function SignUp({ navigation }) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      console.log('Sign Up Confirmed!');
      navigation.navigate('ConfirmSignUp');
    } catch (error) {
      console.log('Error Signing Up: ', error );
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create A New Account</Text>
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
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon='lock'
          placeholder='Enter Password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
          textContentType='password'
        />
        <AppTextInput
          value={email}
          onChangeText={text => setEmail(text)}
          leftIcon='email'
          placeholder='Enter Email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <AppButton title='Sign Up' onPress={signUp} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.forgotPasswordButton}>
              Already Have An Account?  Sign In!
            </Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600'
  }
})