import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
    View,
    StyleSheet,
    Text,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import RNSchedule from "rnschedule";

import * as eventsActions from '../store/actions/events';
import Colors from '../constants/Colors';
import { ScrollView } from "react-native-gesture-handler";

const CalendarScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
  const [data, setData] = useState([]);
  const events = useSelector(state => state.events.availableEvents);
  const dispatch = useDispatch();

  const loadEvents = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(eventsActions.fetchEvents());
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  const createTestEvent = useCallback(async () => {
    var startTime = new Date();
    startTime.setHours(startTime.getHours()  + 2);
    var endTime = new Date();
    endTime.setHours(endTime.getHours() + 4);

    try {
        await dispatch(
            eventsActions.createEvent(
                'title',
                'description',
                'US',
                10,
                [],
                startTime,
                endTime,
                []
            )
        );
    } catch (err) {
        setError(err.message);
        console.log(err.message);
    }
  });

  const buttonHandler = () => {
    createTestEvent();
    console.log('button');
  };

  useEffect(() => {
    setIsLoading(true);
    loadEvents().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadEvents]);

  useEffect(() => {
    console.log(events);
    var eventDataArray = [];

    for (let i = 0; i < events.length; i++) {
        console.log(events[i]);
        eventDataArray.push({title: events[i].title, start: events[i].startTime, end: events[i].dueDate});
    }

    setData(data.concat(eventDataArray));
  }, [events]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      <ScrollView>
      <View><Button onPress={buttonHandler} title='sefasef'/></View>
<RNSchedule dataArray={data} onEventPress={(appt) => Alert.alert('Event Detail', appt.toString())} />
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
  });

  
export default CalendarScreen;
