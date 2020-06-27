import React, { useState } from 'react';
import { View } from 'react-native';
import { Searchbar, List, Card } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import { API_KEY } from 'react-native-dotenv';
import { AntDesign } from '@expo/vector-icons';

const DEBOUNCE = 200;

function AddressSearchBar({ latitude, longitude, radius }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [apiRequestPaused, setApiRequestPaused] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onChangeSearch = async (query) => {
    setSearchTerm(query);
    if (!apiRequestPaused) {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${query}&location=${latitude},${longitude}&radius=${radius}&types=establishment`
      );
      const resString = await res.text();
      const { predictions } = JSON.parse(resString);
      const formattedPredictions = predictions.map((prediction) => {
        const name = prediction.description.split(',')[0];
        const address = prediction.description.split(',')[1];
        return { id: prediction.id, name, address };
      });
      setSearchSuggestions(formattedPredictions);
      setApiRequestPaused(true);
      setTimeout(() => {
        setApiRequestPaused(false);
      }, DEBOUNCE);
    }
  };

  const handleItemPress = (name, address) => {
    setSelectedPlace({ name, address });
    setSearchSuggestions([]);
  };

  const handleSearchPress = () => {
    console.log('searched');
  };

  return (
    <>
      {selectedPlace && (
        <List.Item
          title={selectedPlace.name}
          description={selectedPlace.address}
          right={() => <AntDesign name="close" size={20} color="gray" />}
          onPress={() => setSelectedPlace(null)}
        />
      )}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchTerm}
        style={searchTerm.length > 0 ? t.roundedBNone : ''}
        onIconPress={handleSearchPress}
      />
      {searchSuggestions.length > 0 && (
        <View style={[t.h0, t.overflowVisible, t.z10]}>
          <Card style={[t.roundedTNone, t.z10]}>
            <List.Section>
              {searchSuggestions.map(({ name, address, id }) => (
                <List.Item
                  title={name}
                  description={address}
                  key={id}
                  onPress={() => handleItemPress(name, address)}
                />
              ))}
            </List.Section>
          </Card>
        </View>
      )}
    </>
  );
}

export default AddressSearchBar;
