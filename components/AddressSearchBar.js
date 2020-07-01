import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Searchbar, List, Card, TextInput, Button } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import { API_KEY } from 'react-native-dotenv';

const DEBOUNCE = 500;

function AddressSearchBar({
  latitude,
  longitude,
  radius,
  scrollRef,
  selectedPlace,
  setSelectedPlace,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [apiRequestPaused, setApiRequestPaused] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (searchSuggestions.length > 0) {
      scrollRef.current.scrollTo({ animated: true, y: 280 });
    }
  }, [searchSuggestions]);

  const onChangeSearch = async (query) => {
    setSearchTerm(query);
    if (!apiRequestPaused) {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${query}&location=${latitude},${longitude}&radius=${radius.toString()}&types=establishment&strictbounds`
      );
      const resString = await res.text();
      const { predictions } = JSON.parse(resString);
      console.log('predictions', predictions);
      const formattedPredictions = predictions.map((prediction) => {
        const name = prediction.description.split(',')[0];
        const address = prediction.description.split(',')[1];
        return { id: prediction.place_id, name, address };
      });
      setSearchSuggestions(formattedPredictions);
      setApiRequestPaused(true);
      setTimeout(() => {
        setApiRequestPaused(false);
      }, DEBOUNCE);
      // Hardcoded position, should use refs but couldnt get the .measure method working
    }
  };

  const handleItemPress = async (id) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&place_id=${id}&fields=formatted_address,name`
      );
      const resString = await res.text();
      const { result } = JSON.parse(resString);
      setSelectedPlace({ name: result.name, address: result.formatted_address });
      searchBarRef.current.blur();
      setSearchTerm(result.name);
      setSearchSuggestions([]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchPress = () => {
    console.log('searched');
  };

  return (
    <>
      <Searchbar
        placeholder="Search for Location"
        onChangeText={onChangeSearch}
        value={searchTerm}
        style={[searchTerm.length > 0 ? t.roundedBNone : '', t.shadowNone, t.border, t.mL4, t.mR4]}
        onIconPress={handleSearchPress}
        onBlur={() => setShowSearch(false)}
        onFocus={() => setShowSearch(true)}
        ref={searchBarRef}
      />

      {/* Search Results Dropdown */}
      {showSearch && searchSuggestions.length > 0 && (
        <Card style={[t.wFull]}>
          <List.Section>
            {searchSuggestions.map(({ name, address, id }) => (
              <List.Item
                title={name}
                description={address}
                key={id}
                onPress={() => handleItemPress(id)}
                right={() => <Button icon="check" />}
              />
            ))}
          </List.Section>
        </Card>
      )}

      {/* Inputs for address and Name */}
      <View style={[t.mT1, t.mB1]}>
        <TextInput
          dense
          label="Store Name"
          mode="outlined"
          style={[t.mL4, t.mR4]}
          value={selectedPlace.name}
          onChangeText={(text) => setSelectedPlace((prev) => ({ ...prev, name: text }))}
        />
        <TextInput
          dense
          label="Address"
          mode="outlined"
          style={[t.mL4, t.mR4]}
          value={selectedPlace.address}
          onChangeText={(text) => setSelectedPlace((prev) => ({ ...prev, address: text }))}
        />
      </View>
    </>
  );
}

export default AddressSearchBar;
