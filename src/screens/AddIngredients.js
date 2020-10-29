import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createRecipe } from '../../graphql/mutations';

const { width } = Dimensions.get('window');

export default function AddIngredients() {
  const [ ingredient, setIngredient ] = useState('');
  const [ amount, setAmount ] = useState('')
  const [ ingredients, setIngredients ] = useState([]);

  const addToIngredients = () => {
    setIngredients([...ingredients, {name: ingredient, amt: amount}]);
    console.log(ingredients);
    setIngredient('');
    setAmount('');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          value={ingredient}
          onChangeText={text => setIngredient(text)}
          placeholder='Add Ingredient'
        />
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={text => setAmount(text)}
          placeholder='Add Amount'
        />
        <TouchableOpacity onPress={addToIngredients} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add Another Ingredient</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('!')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add Instructions</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.itemName}>Current Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemName}>{ingredient.name} - {ingredient.amt}</Text>
            </View>
        ))}
        </View>
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