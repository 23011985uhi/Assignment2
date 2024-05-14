

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
  
The goal was to increase support for user by providing a chat support service for any issues that may arise. The FAQ section would help minimise user queries being repeated as the most common or helpful admin replies would be displayed beside each help video to users before the need to contact support. The % hints on the answers would also influence user decisions as if they were not confident with their own answer they could check the % of attempts for each answer and then re-evaluate their decision and work if they suspected their answer to be wrong.
