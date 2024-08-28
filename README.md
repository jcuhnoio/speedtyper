# Speedtyper

**By Juno Choi and Ben Kim.** This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Speedtyper is a typing game that times the player while they type out a randomly generated string of words. After 30 seconds, the player receives their words per minute (WPM) average, as well as the overall accuracy percentage.

## How does it work?

Speedtyper was created using React. Here are some explanations for our implementation:

1.  **useState and useEffect**: The game utilizes `useState` for managing various states such as score, timer, current word list, and user input. The `useEffect` hook is helps initialize the game, adding words, managing the countdown timer, and transitioning to the end game state once the timer expires.

2.  **Word Management**: The `PlayGame` component generates a random list of words from a preset array (`wordSet`) and manages the current typing position and user input, facilitating the typing test mechanism.

3.  **Typing Handler (`handleChangeTyping`)**: This function updates the user's current input and handles the transition to the next word when a space is entered. It also activates the timer upon the first input and evaluates the correctness of the typed characters via `checkResult`.

4.  **Score Handling (`checkScore` and `onChangeScore`)**: `checkScore` assesses each typed word for correctness and updates the score by invoking `onChangeScore`, which modifies the game's score state based on correct or incorrect entries.

5.  **Component Structure**: The application dynamically alters its layout based on the game status (`statusGame`), transitioning between different views/components (`Home`, `PlayGame`, and `EndGame`) to guide the player through the game's various stages (starting, playing, and ending).

## Challenges:

One of the biggest challenges when implementing this game was streamlining the typing experience. There were many different ways to implement it, and required lots of tweaking in order to make it feel natural. There could be possible areas of improvement to the typing experience still, like adding a typing cursor, or the space key acting dynamically to where the user is currently typing, instead of moving the user onto the next word.

## How to run:

A build of speedtyper is deployed at: <https://jcuhnoio.github.io/speedtyper/>

To run locally, install the latest version of [Node.js](https://nodejs.org/) on your system. Then, in the project directory, run `npm start`. This runs the app in the development mode. Open <http://localhost:3000> to view it in your browser.
