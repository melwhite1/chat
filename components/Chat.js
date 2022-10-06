import React, { Component } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCoqHxPjptB1fnkr2TnYuI6eagOLKmHjRc",
authDomain: "chat-app-17c51.firebaseapp.com",
projectId: "chat-app-17c51",
storageBucket: "chat-app-17c51.appspot.com",
messagingSenderId: "915003979239",
appId: "1:915003979239:web:88668c9aab6c32d6783942",
measurementId: "G-707VW0VG1Z"
};

export default class Chat extends Component {
  constructor(){
    super();
    this.state ={
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null
    }

    // initializes the Firestore app
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    //Stores and retrieves the chat messages users send
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

//Retrieve collection data & store in messages
onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
        // Get QueryDocumentSnapshot's data
        let data = doc.data();
        messages.push({
            _id: data._id,
            text: data.text || '',
            createdAt: data.createdAt.toDate(),
            user: {
                _id: data.user._id,
                name: data.user.name,
                avatar: data.user.avatar || ''
            },
            image: data.image || null,
            location: data.location || null,
        });
    });
    this.setState({
        messages,
    });
};

// save messages to local storage
async getMessages() {
  let messages = '';
  try {
    messages = await AsyncStorage.getItem('messages') || [];
    this.setState({
      messages: JSON.parse(messages)
    });
  } catch (error) {
    console.log(error.message);
  }
};

async saveMessages() {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}

async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}

componentDidMount() {

    //Display username in navigation
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    //If user is online --> authenticate & load messages via Firebase

    NetInfo.fetch().then(connection => {
        if (connection.isConnected) {
            this.setState({
                isConnected: true,
            });
            console.log('online');


            //Anonymous user authentication
            this.referenceChatMessages = firebase.firestore().collection('messages');


            this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    firebase.auth().signInAnonymously();
                }
                this.setState({
                    uid: user.uid,
                    messages: [],
                    user: {
                        _id: user.uid,
                        name: name,
                    },
                });
                this.unsubscribe = this.referenceChatMessages
                    .orderBy('createdAt', 'desc')
                    .onSnapshot(this.onCollectionUpdate);
                this.saveMessages();
            });
        }
        // If user is offline --> load & display messages from asyncStorage
        else {
            this.setState({
                isConnected: false,
            });
            console.log('offline');
            this.getMessages();
        }
    })
}

// stop listening to auth and collection changes

componentWillUnmount() {
    if (this.isConnected) {
        this.unsubscribe();
        this.authUnsubscribe();
    }
  }

 // Adds messages to cloud storage
 addMessages() {
  const message = this.state.messages[0];
  this.referenceChatMessages.add({
    uid: this.state.uid,
    _id: message._id,
    text: message.text || '',
    createdAt: message.createdAt,
    user: message.user,
    image: message.image || null,
    location: message.location || null,
  });
}

onSend(messages = []) {
  this.setState((previousState) => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),() => {
    this.addMessages();
    this.saveMessages();
    this.deleteMessages();
  });
}


// When user is offline disable sending new messages
renderInputToolbar(props) {
  if (this.state.isConnected == false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
}

// Customize the color of the sender bubble
renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        }
      }}
    />
  )
}

renderCustomActions = (props) => {
    return <CustomActions {...props} />;
};


//Returns MapView if message contains location data
renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
        return (
            <MapView
                style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
                region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        );
    }
    return null;
}

  render() {
    let { color, name } = this.props.route.params;
    return (
      <View style={[{ backgroundColor: color }, styles.container]}>
        <GiftedChat
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: name,
          }}
        />
     {/* Avoid keyboard to overlap text messages on older Andriod versions  */}
    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
