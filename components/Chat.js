import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
      },
    };

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

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

  //create reference to 'messages' collection
  this.referenceMessages = firebase.firestore().collection('messages');
}

onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    let data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: {
        _id: data.user._id,
        name: data.user.name,
      },
    });
  });
  this.setState({
    messages,
  });
}

addMessages() {
  const message = this.state.messages[0];
  this.referenceMessages.add({
    _id: message._id,
    text: message.text || "",
    createdAt: message.createdAt,
    user: message.user,
  });
}

componentDidMount() {
  // Set name as title chat
  let { name } = this.props.route.params;
  this.props.navigation.setOptions({ title: name });

  // Reference to load messages from Firebase
  this.referenceChatMessages = firebase.firestore().collection('messages');

  // Authenticate user anonymously
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
  });
}

componentWillUnmount() {
  this.unsubscribe();
  this.authUnsubscribe();
}

onSend(messages = []) {
  this.setState((previousState) => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),() => {
    this.addMessages();
  });
}
 renderBubble(props) {
   return (
     <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000',
        }
      }}
    />
  )
 }
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{ flex:1 }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{ _id: this.state.user._id, name: name }}
        />
        {Platform.OS === 'android' ? (
           <KeyboardAvoidingView behavior="height" />
         ) : null
        }
      </View>
    );
  }
}
