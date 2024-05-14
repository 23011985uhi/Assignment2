

Achieved most goals except the FAQ section.
Would have liked to incorporate image or video upload to messages as well


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
The features aim to create a comprehensive support system, reducing the need for direct support in the long run and providing real time relevant information.

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

Implementing the display of the answers from the stored data on firebase was fairly straightforward but an external API [KaTeX](https://katex.org/), had to be used for the answers to be displayed accurately in their mathematical form. Each answer button is its own component and so they all have ```Use effect``` to pull the corresponding data frome firebase and use the KaTeX API to convert it to a more readable format. Some ```props``` such as answerKey , increment functions and answer checking functions to allow each answer to increment the attempts db in firebase for each attempt and also activate onclick functions to display if the answer was correct or not.
![finished answers section](https://github.com/23011985uhi/Assignment2/blob/main/answers.PNG)

