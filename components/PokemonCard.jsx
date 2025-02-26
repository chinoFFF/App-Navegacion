
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PokemonCard = ({ pokemon, onPress }) => {
    if (!pokemon) {
        return null; // Si no hay datos, no renderices nada
    }

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{pokemon.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
});

export default PokemonCard;