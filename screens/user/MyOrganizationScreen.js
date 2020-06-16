import React from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import {
    Text
} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const MyOrganizationScreen = props => {
    return (
        <ScrollView>
            <View style={styles.box}>
                <Text h3 style={styles.titleText}>Pike Place Food Bank</Text>
                <Text>description</Text>
            </View>
            <View style={styles.box}>
                <Text h4>Members in your organization</Text>
            </View>
        </ScrollView>
    );
};

MyOrganizationScreen.navigationOptions = {
    headerTitle: 'My Organization',
    headerRight: <View/>
};

const styles = StyleSheet.create({
    box: {
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    titleText: {
        flex: 1,
        alignSelf: 'center'
    }
});

export default MyOrganizationScreen;