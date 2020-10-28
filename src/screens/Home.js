import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { deleteRecipe } from '../../graphql/mutations';
import { listRecipes } from '../../graphql/queries';
import { Feather as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home ({ navigation, updateAuthState }) {
  // const [ name, setName ] = useState('');
  const [ recipes, setRecipes ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error Signing Out: ', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchRecipes();
    }, [])
  );

  async function fetchRecipes() {
    try {
      setLoading(true);
      const recipeData = await API.graphql(graphqlOperation(listRecipes));
      const recipes = recipeData.data.listRecipes.items;
      // console.log(recipes);
      setRecipes(recipes);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching data', error);
      setLoading(false);
    }
  }

  // const addRecipe = async () => {
  //   if (name !== '') {
  //     const input = { name };
  //     const result = await API.graphql(graphqlOperation(createRecipe, { input }));
  //     const newRecipe = result.data.createRecipe;
  //     const updatedRecipe = [newRecipe, ...recipes];
  //     setRecipes(updatedRecipe);
  //     setName('');
  //     console.log('add recipe')
  //   }
  // }

  const removeRecipe = async id => {
    try {
      const input = { id };
      const result = await API.graphql(graphqlOperation(deleteRecipe, { input }));
      const deletedRecipeId = result.data.deleteRecipe.id;
      const updatedRecipe = recipes.filter(recipe => recipe.id !== deletedRecipeId);
      setRecipes(updatedRecipe);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Button title='Sign Out' color='tomato' onPress={signOut} />
      <Button title='Add A New Recipe' color='tomato' onPress={() => navigation.navigate('AddRecipe', { recipes })} />
      <ScrollView>
        {/* <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder='Add Recipe Name'
        />
        <TouchableOpacity onPress={addRecipe} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add Recipe</Text>
        </TouchableOpacity> */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='tomato' />
          </View>
        )}
        {recipes.map((recipe, index) => (
          <View key={index} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('RecipeDetails', { recipe: recipe } )}>
              <Text style={styles.itemName}>{recipe.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => removeRecipe(recipe.id)}>
              <Icon name='trash-2' size={18} color='tomato' />
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'tomato',
    marginVertical: 10,
    width: width * 0.8,
    fontSize: 16
  },
  buttonContainer: {
    backgroundColor: 'tomato',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: width * 0.8
  },
  buttonText: {
    color: '#fff',
    fontSize: 24
  },
  itemContainer: {
    width: width * 0.8,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 18
  },
  loadingContainer: {
    marginVertical: 10
  }
});