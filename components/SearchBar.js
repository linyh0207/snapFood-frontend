import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Searchbar, List, Card } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

function SearchBar({ searcher, latitude, longitude, radius }) {
  const [searchSuggestions, setSearchSuggestions] = useState(['bread', 'banana', 'chocolate']);
  const [searchTerm, setSearchTerm] = useState('');
  const onChangeSearch = (query) => {
    setSearchTerm(query);
  };

  const loadData = async () => {
    const apiData = await fetch(
      `http://10.0.3.2:8000/tags?latitude=${latitude}&longitude=${longitude}&radius=${radius}&searcher=${searcher}`
    );
    const responseText = await apiData.text();
    const { tags } = JSON.parse(responseText);
    setSearchSuggestions(tags || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const matchTags = (tag) => {
    try {
      const re = new RegExp(`${searchTerm}`, 'i');
      return tag.match(re).length > 0;
    } catch {
      return false;
    }
  };

  const handleItemPress = (text) => {
    setSearchTerm(text);
    console.log(text);
  };

  const handleSearchPress = () => {
    console.log('searched');
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchTerm}
        style={searchTerm.length > 0 ? t.roundedBNone : ''}
        onIconPress={handleSearchPress}
      />
      {searchTerm.length > 0 && (
        <Card style={[t.roundedTNone, t.z10]}>
          <List.Section>
            {searchSuggestions.filter(matchTags).length > 0 ? (
              searchSuggestions
                .filter(matchTags)
                .map((text, i) => (
                  <List.Item title={text} key={text} onPress={() => handleItemPress(text)} />
                ))
            ) : (
              <List.Item title="No matching tags found." />
            )}
          </List.Section>
        </Card>
      )}
    </>
  );
}

export default SearchBar;
