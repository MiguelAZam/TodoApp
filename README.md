# To-do App

Todo App written in React Native for Android. It has a simple server which make CRUD operations in the MongoDB server. Development version.

## Instructions:

You will need to have installed MongoDB server in your computer.

* git clone https://github.com/MiguelAZam/TodoApp
* Go to the Requests.js file and if you are running the server locally put your IPv4 Address plus the port in the DOMAIN variable (Ex. http://123.233.2.123:8080/) the port 8080 is the default, if you want to change it go to server/index.js and look for the port variable
* yarn (To download all dependencies)
* yarn server (To run the server)
* yarn start (To run the development server)

## Comments

I recommend to run the server and the development server in different command lines. Also, don't forget that the App is just for Android and it does not have a iOS version.

I did all the development part in my phone (Samsung Grand Prime +) which means that I didn't use the simulator provided by Android Studio

## Images

![Home Screen Pending Tasks](https://github.com/MiguelAZam/TodoApp/blob/master/assets/ScreenShots/PendingScreen.png)
![Home Screen Completed Tasks](https://github.com/MiguelAZam/TodoApp/blob/master/assets/ScreenShots/CompletedScreen.png)
![Home Screen Modal Tasks](https://github.com/MiguelAZam/TodoApp/blob/master/assets/ScreenShots/ModalScreen.png)
![Add/Edit Screen Tasks](https://github.com/MiguelAZam/TodoApp/blob/master/assets/ScreenShots/AddScreen.png)