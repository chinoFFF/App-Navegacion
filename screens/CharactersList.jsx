import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchAllPokemon } from '../utils/PokemoApi';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                const data = await fetchAllPokemon();
                console.log(data); // Verifica la estructura de los datos
                setCharacters(data);
                setFilteredCharacters(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        loadCharacters();
    }, []);

    const handleSearch = (query) => {
        const filtered = characters.filter(character =>
            character.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    const renderItem = ({ item }) => (
        <PokemonCard
            pokemon={item}
            onPress={() => navigation.navigate('CharacterDetail', { character: item })}
        />
    );
    
    return (
        <View style={styles.container}>
            <SearchBar onSearch={handleSearch} />
            <FlatList
                data={filteredCharacters}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    list: {
        paddingBottom: 16,
    },
});

export default CharactersList;