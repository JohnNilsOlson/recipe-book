import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function RecipeDetails({ route }) {
  const { recipe } = route.params;
  console.log(recipe);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{recipe.name}</Text>
      </View>
      <Text style={styles.description}>{recipe.category}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <View>
        <Text>Ingredients</Text>
      </View>
      <View>
        <Text>Instructions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    width: '80%',
    paddingBottom: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    color: 'tomato',
    marginTop: 20
  }
});