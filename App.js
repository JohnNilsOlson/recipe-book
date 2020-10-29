import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import config from './aws-exports';

import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ConfirmSignUp from './src/screens/ConfirmSignUp';
import AddRecipe from './src/screens/AddRecipe';
import RecipeDetails from './src/screens/RecipeDetails';
import AddIngredients from './src/screens/AddIngredients';

Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode='none'>
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name='SignUp' component={SignUp} />
      <AuthenticationStack.Screen name='ConfirmSignUp' component={ConfirmSignUp} />
    </AuthenticationStack.Navigator>
  );
}

const AppNavigator = props => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Home'>
        {screenProps => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>
      <AppStack.Screen name='AddRecipe' component={AddRecipe} options={{ title: 'Add New Recipe'}} />
      <AppStack.Screen name='RecipeDetails' component={RecipeDetails} options={{ title: 'Recipe Details'}} />
      <AppStack.Screen name='AddIngredients' component={AddIngredients} options={{ title: 'Add Ingredient'}} />
    </AppStack.Navigator>
  );
}

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='tomato' />
    </View>
  );
}

function App() {
  const [ isUserLoggedIn, setUserLoggedIn ] = useState('initializing');

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('User is signed in!');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('User is not signed in!');
      setUserLoggedIn('loggedOut');
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && ( <AppNavigator updateAuthState={updateAuthState}/>)}
      {isUserLoggedIn === 'loggedOut' && ( <AuthenticationNavigator updateAuthState={updateAuthState} />)}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;