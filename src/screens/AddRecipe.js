import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createRecipe } from '../../graphql/mutations';

const { width } = Dimensions.get('window');

export default function AddRecipe({ navigation }) {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  // const [ ingredients, setIngredients ] = useState([]);
  // const [ instructions, setInstructions ] = useState([]);
  const [ category, setCategory ] = useState('');
  // const [ recipes, setRecipes ] = useState([]);

  const addRecipe = async () => {
    if (name !== '') {
      const input = { name, description, category };
      const result = await API.graphql(graphqlOperation(createRecipe, { input }));
      // const newRecipe = result.data.createRecipe;
      // const updatedRecipe = [newRecipe, ...recipes];
      // setRecipes(updatedRecipe);
      setName('');
      setDescription('');
      // setIngredients('');
      // setInstructions('');
      setCategory('');
      console.log('add recipe')
      navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder='Add Recipe Name'
        />
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={text => setCategory(text)}
          placeholder='Add Category'
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={text => setDescription(text)}
          placeholder='Add Description'
        />
        <TouchableOpacity onPress={() => navigation.navigate('AddIngredients')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add Ingredients To Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
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