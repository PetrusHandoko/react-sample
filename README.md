# Learning React

This projects is build to learn react.
See in action: https://tictactoe-7ba8x0sdi-petrus-handokos-projects.vercel.app

## How the work setup.  
To work on this project, I setup a clone the git source into my Mac Mini. I access my mini from my Ipad as my main development platform.  Ipad is being used since I want to do the works on the weekend away from home and my mini.  

### Here is the setup and tools used in building the project

Setup ssh with public key only access.  This way, hopefully more secure than allowing login with password.  With ssh, I can allow my xifinity gateway to allow poert forwarding only port 22.  
From IPad I use Testactic application to access the source ( sftp ) and open ssh terminal to mini.  Any changes that I want to test, will be uploaded to mini.  Reach was started in terminal with npm start.

## React sample app
From https://react.dev/learn As you can see the sample still exist in the page.  

Once I am able to build tictactoe without copying from the webside, I cantinue to read and expanding the tic tac toe application.  

Original Tic Tac Toe allow you to play against second person.  T learn more I added the following feature:

* How to play with computer.
* Make the computer response randomly. 
* Add a bit rule base inteligence for computer to play.
* Set buttons, checkbox etc to learn how to interact with elements in the app.  

### Feature added
* Add new feature to allow computer play against you.  This accomplish by select a random postion to response or start the game.  Add a way to select next available position to play when the random generated was not available.  
* Add feature to allow computer to play first.
* Add some inteligence such that computer will block when needed and also will complete the row when available.  

### Next feature want to experimented
* Ability to learn how to play without any rules. This may include training the computer the best moved to win.

## Chatgpt
I was looking at some code in c++ that I was not be able to find a good solution.  Then I was thinking, why not asked chatgpt instead of search.  One thing lead to another, I was asking chatgpt to build a c++ version of Tic Tac Toe.  
The experience is quite interesting.  
First it generate the simple turn base Tic Tac Toe application.  Similar to the react app sample code.  Then I asked to add ability to play with computer.  ChatGPT added the computer player and use random function to generate the move.  Then I asked to provide React version of this.  ChatCPT refers the computer random moves as AI base Tic Tac Toe application and suggested to implement some learning mechanism. :-) While I was labeling my enhancement as Intelligence branch since I added some extra moved that ChatCPT does not provides in the code.  

This is similar to what my whole experiance. I guess ChatGPT may already replace me as developer.  



Hope you enjoy as I did.  Roughly I spend 3 days on and off on the project.

