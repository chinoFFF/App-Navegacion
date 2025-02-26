import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CharacterDetail = () => {
    const route = useRoute();
    const { character } = route.params;
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDescription = async () => {
            try {
                // Obtén la descripción del Pokémon desde el endpoint de especies
                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${character.id}/`);
                if (!speciesResponse.ok) {
                    throw new Error('Error fetching Pokémon species');
                }
                const speciesData = await speciesResponse.json();

                // Encuentra la descripción en el idioma deseado (español en este caso)
                const descriptionText = speciesData.flavor_text_entries.find(
                    (entry) => entry.language.name === 'es' 
                )?.flavor_text || 'No hay descripción disponible.';

                setDescription(descriptionText.replace(/[\n\f]/g, ' ')); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDescription();
    }, [character.id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Imagen del Pokémon */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: character.imageUrl }} style={styles.image} />
                </View>

                {/* Nombre del Pokémon */}
                <Text style={styles.name}>{character.name}</Text>

                {/* Descripción del Pokémon */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    imageContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 100,
        padding: 16,
        marginBottom: 16,
    },
    image: {
        width: 150,
        height: 150,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'capitalize',
        color: '#333',
    },
    descriptionContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        width: '100%',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        lineHeight: 24,
    },
    detailsContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    detailText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 8,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default CharacterDetail;