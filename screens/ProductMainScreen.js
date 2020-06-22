import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { t } from 'react-native-tailwindcss';
import StyledButton from '../components/StyledButton';
import DropDownMenu from '../components/DropDownMenu';
import SnackBar from '../components/SnackBar';
import ProductMainCard from '../components/ProductMainCard';
import SearchBar from '../components/SearchBar';

export default function ProductMainScreen() {
  // For account button to open drawer navigator
  const navigation = useNavigation();

  return (
    <View style={[t.flex1, t.bgWhite]}>
      <SearchBar searcher={1} latitude={5} longitude={10} radius={40000000} />
      <ScrollView contentContainerStyle={[t.p6]}>
        {/* Product card for product main page */}
        <ProductMainCard
          price={{ regular: 2.99, discounted: 0.99 }}
          totalVotes={10}
          storeName="T&T Supermarket"
          distance="500m"
        />

        {/* This is the drop down menu component - for ex: sortFilterMenu modal */}
        <DropDownMenu />

        {/* Account Button to open drawer navigator */}
        <StyledButton
          icon="account"
          title="Account"
          size="small"
          onPress={() => navigation.openDrawer()}
        />
      </ScrollView>

      {/* Sample Snackbar */}
      <SnackBar />
    </View>
  );
}
