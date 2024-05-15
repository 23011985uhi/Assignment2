
# Project Setup Guide

The repository can be found at the following URL:
[https://github.com/23011985uhi/Assignment2](https://github.com/23011985uhi/Assignment2)

## Setup Instructions

### Using the Command Line Interface (CLI)

1. **Navigate to the desired directory**:
   Open your terminal or command prompt and change to the directory where you want to store the repository. For example: ``` cd C:\Users\user\Documents ```

2. **Clone Repository**:
  Use command ``` git clone https://github.com/23011985uhi/Assignment2.git ``` to save the repository to the desired location

3. **Open with VsCode**:
   Use command ``` start vscode://file/c:/users/user/documents/Assignment2``` to open the project with VScode.

### Using VSCode

1. **Open VSCode**:
   Launch VSCode on your computer.

2. **Clone Repository**:
   - Click the explorer icon on the sidebar or press `Ctrl+Shift+E`.
   - Click the "Clone Repository" button.
   - Enter the repository URL when prompted: ``` https://github.com/23011985uhi/Assignment2.git ```
   - Choose the folder where you want to save the cloned repository on your computer.

3. **Open with VSCode**:
   After cloning, VSCode will prompt you to open the project immediately. Select "Yes" to open the project.

## Startup
You will need to install any dependecies before being able to run the project locally
``` npm install ```
to install them.
To run the project locally you can either use ``` npm run preview``` or ```npm run dev``` to open at a local port.


# Introduction

The aim was to add 3 new features to an existing website, specifically to one page of the existing website (https://i-want-to-study-engineering.org/q/balances). It is to expand the functionality of the multiple choice style question system by adding:

- a hint system on the answers which shows a % number of how many times that answer has been selected.
- a live message system for users to ask questions and later get replies from admins or teachers.
- implement a frequently asked questions section which displays beside the help video and shows admin/teacher answers that have been identified as answers to regularly asked questions.
  
The goal is to enhance user support by providing a chat support service for any issues that may arise. Additionally, an FAQ section will be implemented to minimize repeated user queries by displaying the most common and helpful admin replies next to each help video. This will allow users to find answers quickly before needing to contact support. The answer hints and statistics feature will show the percentage of attempts for each answer, helping users make informed decisions. Users can check these percentages to re-evaluate their decisions if they are not confident in their own answers. 


# Methodology
This would be the "main" screen for the balances question and the final look with the answer percentages on display. 
![balances main look](https://github.com/23011985uhi/Assignment2/blob/main/balances%20question.PNG)
Before this there would be a login required which authenticates users by using firebase Google authentication.

## Authentication
A simple login page was created where ```onclick``` of a button the user is prompted to sign in through their google account. Most of the process is automated through firebase which only has to be initialised within the project and then there is easy access to all this functionality.
![login page](https://github.com/23011985uhi/Assignment2/blob/main/login%20page.PNG) 
![google login](https://github.com/23011985uhi/Assignment2/blob/main/google%20login.PNG)

When the user is authenticated they are redirected using react router to the main page shown earlier.

## Answer & Hints
The initial planning of tickets and processes was fairly basic , with ticket description minimal. There was a broad overarching plan, and only a few tickets were needed to outline the process.

![answer tickets](https://github.com/23011985uhi/Assignment2/blob/main/answer%20tickets.PNG)

Implementing the display of the answers from the stored data on firebase was fairly straightforward but an external API [KaTeX](https://katex.org/), had to be used for the answers to be displayed accurately in their mathematical form. Each answer button is its own component and so they all have ```Use effect``` to pull the corresponding data frome firebase and use the KaTeX API to convert it to a more readable format. Some ```props``` such as answerKey , increment functions and answer checking functions to allow each answer to increment the attempts database in firebase for each attempt and also activate onclick functions to display if the answer was correct or not.
![finished answers section](https://github.com/23011985uhi/Assignment2/blob/main/answers.PNG)

Its difficult to demonstrate with a static image but for each answer selected the button at the bottom changes from "correct" to "wrong" depending on the true/ false boolean for the answer stored in the database. The original design was that an aswer button was selected, then the middle buttom had to be clicked to confirm which would then display the appropriate answer response. With the addition of the % for each answer the choice process could be streamlined to a single button click rather than having to confirm after as the previous attempts % allows users to evaluate their decisions based off that data.
Each answer component has ```onClick``` events that increments the corresponding field and total field in the firestore holding these variables. They can then be displayed through ```useEffect``` when the component mounts with a small calculation for the % of the total for each answer. A listener is added within the ```useEffect``` that updates the values as they change in the database, resulting in an accurate % display with live updates for each answer attempt.

## User Questions & Live Chat
The question submission method was through the ```onClick``` of a "confused" button that was in the same modal or page as the help videos from the Hints section. Clicking one of these Hints buttons would open the corresponding help video which in turn would contain the button to activate the message submission option.

![Message submission](https://github.com/23011985uhi/Assignment2/blob/main/help%20modal.PNG)

Clicking the confused button opens this textarea in which the user can enter their question to be submitted for an admin to respond. The user details that are carried wthin the ```AuthContext``` from the login page are accessed when a message is sent which ties each message to a specific user. It sends the user: name, userID, the message text and a timestamp to identify when the message was sent.

![Chat database](https://github.com/23011985uhi/Assignment2/blob/main/Chat%20db.PNG)

Each message creates a document under chatrooms in the realtime database where the document ID is the timestamp the message was sent. Within these documents are the messages themselves and each message has a random ID to distinguish it from others. As you can see the user details are saved with the user input (text field) which can then be used to identify users within the live chat component. The number of message submissions was supposed to be 1 but this interpretation simulates multiple messages being sent and how they would be responded to. 

![adminbutton](https://github.com/23011985uhi/Assignment2/blob/main/adminbutton.PNG)

![admin panel](https://github.com/23011985uhi/Assignment2/blob/main/admin%20panel.PNG)

The button to open this panel is only available to admins and sits just above the question image. Users and admins are differentiated through their email address on login and another component is rendered only for users to access chats. The admin panel consists of 2 components which are connected by a ```context``` which retrieves all of the chat data. The chatlist component maps through the realtime database and displays each document as a separate card component with the timestamp ID to differentiate between them. The chat component ```onClick``` of one of the cards in the chatlist maps through the database for that specific chatroom and displays each message data within its own chat bubble. The colours and positioning of the chats are applied through checking the user ID with the user ID of the stored chat message resulting in the standard looking messaging service. There is a textarea in the chat component which sends the user input into the chatroom which has been selected as a new message again storing the same information ( name, text, userID , timestamp).

![userbutton](https://github.com/23011985uhi/Assignment2/blob/main/userchatbutton.PNG)

The user chat button is only available to users and it opens the same chat panel as the admin one. Users can then continue to message in each chatroom and further question about their original topic in a live chat environment.

#### Improvements
- Chat panels are fairly basic in design, could be improved
- only allow users to view chats where they already have sent a help message
- wanted to implement notifications for users where the chats button would display some sort of notification for updated chatrooms
- notifications in the chatlist for updated chatrooms as well
- implement image upload for chat messaging

## FAQ
The FAQ section was not fully implmented within the design mainly due to time constraints.

![faqtickets](https://github.com/23011985uhi/Assignment2/blob/main/faqtickets.PNG)

There was a plan to add a button to admin responses within the chats that only admins could interact with or see using the user within the ```AuthContext``` to identify between admins or users. This button would save the selected message to faq section in firestore. These FAQs could then get displayed in the hints video modal only if there was data in the FAQ database so the modal shape was not morphed without the data.

  ## Evaluation
On evaluation it can be concluded that 2 of the 3 features have been implemented fully and even expanded upon. 
The answer section hints process was mentioned earlier and was initially thought of as being a simple task. Upon implementation of the original specification of an aswer choice then a confirmatory click on the check answer button, there were some hurdles regarding the display change of the button and the incrementation in the database. The check answer button ```onclick``` was assigning and incrementing a new field in the database which was "undefined". This was identified and removed by removing the ```onClick``` for that button but each answer click was also incrementing the undefined field as well as its corresponding answer field. 

![AnswersDatabase](https://github.com/23011985uhi/Assignment2/blob/main/answersdb.PNG)

It was an unintentional total being incremented with each answer choice which was actually part of the required feature. It was decided to alter the specification slightly for answers to be checked on 1 click rather than 2 and linked the answer display function to each answer component ```onClick```. It has streamlined the answer process as the % attempts display has removed the need for a confirmatory answer submission button click.
One more change that could have been advantageous would have been the ability to toggle the % displays for the answers so that they weren't always on display but the user had full control over if they wanted/ needed the extra help. 

The message and live chat feature was also fully implemented and expanded upon. The specifications only required a single message and live chat where as the final implementation simulated multiple help messages which created multiple live chats and gives the ability to access and reply in all of them. This implementation added a bit more difficulty in having to retrieve and display multiple chatrooms while also having access to the messages within each chatroom. The main issue was displaying the correct data for each chatroom as the ID had to be passed between components with a different data retrieval depending on the ID being passed down. 
The final design surpasses the initial specification as the chat panel can be easily adapted into sections containing the chatrooms for multiple help videos with admins being able to reply to multiple users. It expands upon the requirements and allows for further development into a fully functional multi user chat service. 





  


