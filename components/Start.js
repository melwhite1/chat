

import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', color: '#D7C0AE' }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/Background-Image.png')} style={styles.image}>
          <Text style={styles.title}>Chat App</Text>
          <View style={styles.box}>
            {/* More than 2 styles we use [] */}
            <TextInput style={[styles.input, styles.text]}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Name'
            />
            <View style={styles.colorWrapper}>
              <Text style={[styles.text, styles.label]}>Choose Background Color</Text>
              <View style={styles.colors}>
                <TouchableOpacity style={[styles.color, styles.colorBlack]} onPress={() => this.setState({ color: '#090C08' })} />
                <TouchableOpacity style={[styles.color, styles.colorPurple]} onPress={() => this.setState({ color: '#474056' })} />
                <TouchableOpacity style={[styles.color, styles.colorGrey]} onPress={() => this.setState({ color: '#8A95A5' })} />
                <TouchableOpacity style={[styles.color, styles.colorGreen]} onPress={() => this.setState({ color: '#B9C6AE' })} />
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}>
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    resizeMode: 'cover',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },

  box: {
    backgroundColor: '#fff',
    width: '88%',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',
  },

  input: {
    height: 50,
    width: '88%',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    opacity: 50,
  },

  text: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center'
  },

  colorWrapper: {
    width: '88%',
    height: '60%',
    justifyContent: 'center',
    marginLeft: '6%',
  },

  label: {
    marginBottom: '8%',
  },

  colors: {
    flexDirection: 'row',
    marginBottom: 1,
    alignItems: 'center',
    cursor: 'ponter'
  },

  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 40,
  },

  colorBlack: {
    backgroundColor: '#090C08',
  },

  colorPurple: {
    backgroundColor: '#474056',
  },

  colorGrey: {
    backgroundColor: '#8A95A5',
  },

  colorGreen: {
    backgroundColor: '#B9C6AE',
  },

  buttonWrapper: {
    width: '88%',
    flex: 1,
    justifyContent: 'end',
  },

  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },

  buttonText: {
    padding: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
