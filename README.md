# Chat App
### a chat application where multiple users can join and share text messages, images, and their location.


## Key Features:
- Start Page: users can enter their name and choose a background color for the chat screen before joining the chat.
- Chat Page: displays the conversation, as well as an input field and a button to send.
- Storage: messages are stored for users on/offline
- Media: Users can take photos, send from camera roll, and send location

## User Stories:
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Installation & Configuration
### Expo
Expo provides tools that can help get you started and speeds up the app development. It has its own SDK(software development kit) which offers features that include access to the camera, retrieving geolocations and so on.

To create new projects and start running Expo, you’ll need to install the Expo Command Line Interface (CLI) on your machine.
npm install expo-cli --g
Download Expo App to your device
Signup for an Expo account
Go to your terminal, navigate to the repository and enter
expo start
(be sure to configure your database and emulator prior to launching the demo)


### Android Studio
Android Studio creates virtual devices to allow testing and preview of the app on a android operating system.

### Android Studio Emulator
For information to run the Android Emulator, please click here for full instuctions.

### Google Firebase
Firebase is being used as a cloud-based storage platform for the app.

Sign in to Google Firebase and select Add Project, then set up your project.
Then select Firebase Database from the options on the left under Build.
Select Start in Test Mode, choose your region, then create a collection.
To set authentication, go to Project Settings and click Register to recieve the configuration code.
This code is required for your app in order to use the firebase as your data storage.
This code can be viewed in my chatscreen.js file.

## Dependencies:
- React
- React-Native
- Expo
- Gifted Chat
- Google Firebase
- Android Studio - Emulator

## Screenshots

  ![Chat-App](https://user-images.githubusercontent.com/107372823/194375135-c7a2aee8-4f4b-4679-8ef8-acf4036ed0f4.png)
![Chat-Screen](https://user-images.githubusercontent.com/107372823/194375164-22ed4bb6-0d1a-4d54-a870-2bccfd129725.png)![Chat-Screen2](https://user-images.githubusercontent.com/107372823/194375176-102cde8a-f5cb-4418-a9f4-20fbf08882a1.png)

