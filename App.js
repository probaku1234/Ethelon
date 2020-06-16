import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import eventReducer from './store/reducers/events';
import taskReducer from './store/reducers/tasks';
import userReducer from './store/reducers/users';
import NavigationContainer from './navigation/NavigationContainer';
import GooglePlacesInput from './screens/location/GooglePlaceInputScreen';
import CalenderScreen from './screens/CalendarScreen';
import UserProfileScreen from './screens/user/UserProfileScreen';
import MyOrganizationScreen from './screens/user/MyOrganizationScreen';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  events: eventReducer,
  users: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
      {/* <UserProfileScreen></UserProfileScreen> */}
      {/* <GooglePlacesInput></GooglePlacesInput> */}
      {/* <CalenderScreen></CalenderScreen> */}
      {/* <MyOrganizationScreen></MyOrganizationScreen> */}
    </Provider>
    //<GooglePlacesInput></GooglePlacesInput>
    //<CalenderScreen></CalenderScreen>
    //<UserProfileScreen></UserProfileScreen>
  );
}
