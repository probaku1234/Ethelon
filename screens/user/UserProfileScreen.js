import User from "../../models/user";

import React, { Component, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  StyleSheet, 
  View, 
  Image, 
  TouchableOpacity, 
  Text, 
  ScrollView, 
  RefreshControl,
  ActivityIndicator,
  Button,
  AsyncStorage 
} from "react-native";
import { SearchBar, Avatar, Icon } from "react-native-elements";
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import * as usersActions from '../../store/actions/users';
import Colors from '../../constants/Colors';


const UserProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [text, setText] = useState("");
  const [user, setUser] = useState({firstName: 'qwe', lastName: 'qwe', imageUrl: '', description: '', title: '', phone: '', userId: '', email: ''});
  const [userId, setUserId] = useState('');
  const [retrieve, setRetrieve] = useState(false);
  
  useEffect(() => {
    setError(null);
    setIsRefreshing(true);
    const retrieveData = async () => {
      try {
        const valueString = await AsyncStorage.getItem('userData');
        const value = JSON.parse(valueString);
        // Other set states
        setUserId(value.userId);
        console.log(value);
      } catch (error) {
        console.log(error);
        setError(err.message);
      }
    };
    // Retrieve if has new data
    if (!retrieve) {
      retrieveData();
      setRetrieve(true);
    }
    setIsRefreshing(false);
  }, [retrieve, setIsLoading]);

  useEffect(() => {
      setIsLoading(true);
      console.log(userId);
      fetch(
        "https://react-b8d93.firebaseio.com/users.json"
      )
      .then(resp => resp.json())
      .then(resData => {
        const loadedUsers = [];
        
        for (const key in resData) {
          loadedUsers.push(
            new User(
              key,
              resData[key].firstName,
              resData[key].lastName,
              resData[key].email,
              resData[key].imageUrl,
              resData[key].description,
              resData[key].title,
              resData[key].phone,
              resData[key].userId
            )
          );
        }
        filteredUser = loadedUsers.filter((item) => item.userId === userId); 
        console.log(filteredUser);
        console.log(filteredUser[0]);
        if (filteredUser.length > 0) {
          const fetchedUserObject = {
            firstName: filteredUser[0].firstName, 
            lastName: filteredUser[0].lastName, 
            imageUrl: filteredUser[0].imageUrl, 
            description: filteredUser[0].description, 
            title: filteredUser[0].title, 
            phone: filteredUser[0].phone,
            userId: filteredUser[0].userId,
            email: filteredUser[0].email
          };
          setUser(fetchedUserObject);
        }
        
        
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  }, [userId]);

  useEffect(() => {
    setIsLoading(false);
    console.log(user);
  }, [user]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      // refreshControl={<RefreshControl onRefresh={loadUser} refreshing={isRefreshing}/>}
    >
      <View style={styles.header}>
        <View>
          <MenuProvider style={{ flexDirection: "row", padding: 30 }}>
            <Menu>
              <MenuTrigger
                
                
              >
                <Icon
                  
                  type="material"
                  color="black"
                  name="more-vert"
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => props.navigation.navigate('MyImpact')} text="View My Impact" />
                <MenuOption onSelect={() => props.navigation.navigate('MyOrganization')}>
                  <Text>View My Organization</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </MenuProvider>
        </View>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: user.imageUrl,
            }}
          />

          <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
          <Text>{user.title}</Text>
          <Text>{user.phone}</Text>
          <Text style={styles.userInfo}>{user.email}</Text>
          <Text style={styles.userInfo}>
            {user.description}
          </Text>
        </View>
      </View>
      <SearchBar
        placeholder="Search Task"
        onChangeText={(text) => setText(text)}
        value={text}
        platform="android"
      />
    </ScrollView>
  );
};

UserProfileScreen.navigationOptions = {
  headerTitle: 'My Profile',
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center' 
  }
});

export default UserProfileScreen;
