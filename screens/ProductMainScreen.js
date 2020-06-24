import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Portal, Modal, TextInput, Text, Title, HelperText } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../components/StyledButton';
import SortByMenu from '../components/DropDownMenu/SortByMenu';
import StoresMenu from '../components/DropDownMenu/StoresMenu';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';
import SearchBar from '../components/SearchBar';

export default function ProductMainScreen({ navigation }) {
  const [refineModalVisible, setRefineModalVisibility] = useState(false);
  const showRefineModal = () => setRefineModalVisibility(true);
  const hideRefineModal = () => setRefineModalVisibility(false);
  const handleRefineModalPress = () => {
    showRefineModal();
  };

  // Default 5km for the placeholder
  const [distance, setDistance] = useState('');

  const DistanceEntryError = () => {
    function isNormalInteger(str) {
      if (!str) return true;
      const trimStr = str.trim();
      if (!trimStr) {
        return false;
      }
      const input = trimStr.replace(/^0+/, '') || '0';
      const n = Math.floor(Number(input));
      return n !== Infinity && String(n) === input && n >= 0 && n < 200;
    }

    const errorVisibility = !isNormalInteger(distance);

    return (
      <HelperText type="error" visible={errorVisibility}>
        Invalid Entry. Please enter an integer between 0 and 200.
      </HelperText>
    );
  };

  return (
    <SafeAreaView style={[t.flex1, t.bgWhite]}>
      <View style={[t.flexRow, t.itemsCenter]}>
        {/* Account Button to open drawer navigator */}
        <StyledButton
          icon="account-circle-outline"
          title="Account"
          size="small"
          onPress={() => navigation.openDrawer()}
        />
        {/* Searchbar Placeholder */}
        {/* Refine Modal */}
        <Portal>
          <Modal
            contentContainerStyle={[t.bgWhite]}
            visible={refineModalVisible}
            onDismiss={hideRefineModal}
          >
            <Title style={[t.textCenter]}>SORT BY</Title>
            <SortByMenu />
            <Title style={[t.textCenter]}>FILTER BY</Title>
            <View style={[t.flexRow, t.itemsCenter]}>
              <TextInput
                label="Distance"
                value={distance}
                mode="outline"
                placeholder="5"
                onChangeText={(text) => setDistance(text)}
                style={[t.w3_4, t.m2]}
              />
              <Text>km</Text>
            </View>
            <DistanceEntryError />
            <StoresMenu />
          </Modal>
        </Portal>
        <StyledButton
          icon="playlist-edit"
          title="Refine"
          size="small"
          onPress={handleRefineModalPress}
        />
        {/* MapView / ListView Toggle Button Placeholder */}
      </View>

      <ScrollView contentContainerStyle={[t.p6]}>
        {/* Product card for product main page */}
        <ProductMainCard
          price={{ regular: 2.99, discounted: 0.99 }}
          totalVotes={10}
          storeName="T&T Supermarket"
          distance="500m"
        />
      </ScrollView>
      <SnackBar />
    </SafeAreaView>
  );
}
