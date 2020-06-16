import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

const MyImpactScreen = props => {
    return (
        <ScrollView>
            <View>
                <Text>You've been on Appname for 10 days.</Text>
            </View>
            <View>
                <Text>Total Tasks</Text>
            </View>
            <View>
                <Text>Total Activity</Text>
            </View>
            <View>
                <Text>Last 30 Days</Text>
            </View>
        </ScrollView>
    );
};

MyImpactScreen.navigationOptions = {
    headerTitle: 'My Impact',
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

export default MyImpactScreen;