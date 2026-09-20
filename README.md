⌨️⚔️ Typing Game
A fast-paced, retro-style typing survival game built entirely with HTML, CSS, and Vanilla JavaScript. Test your typing speed, build your combo, and survive as long as you can against endless waves of falling words!

🚀 Features
Endless Survival Gameplay: Enemies fall from the top of the screen. Type their words correctly to destroy them before they reach the bottom.

Wave Progression: The game gets progressively harder. Survive long enough, and enemies will spawn faster and drop quicker!

Combo System: Chain correct words together without taking damage to multiply your score.

Visual Feedback: Enemies turn orange when they get dangerously close to the bottom, and the screen flashes red when you take damage.

Beginner-Friendly Code: Written with clear, understandable logic without using any external frameworks or game engines.

Easily Customizable: Drop in your own background and enemy images with zero coding experience required.

🎮 How to Play
Click Start Game.

Look at the words falling from the top of the screen.

Type the words using your keyboard. What you are currently typing appears at the bottom of the screen.

Finish spelling a word exactly to destroy the enemy!

Mistakes? Press Backspace to delete a letter, or press Spacebar / Enter to clear your current typing completely.

Don't let the enemies touch the bottom, or you lose a life (❤️). Lose 3 lives, and it's Game Over!

🛠️ Installation & Setup
Because this game uses vanilla web technologies, you don't need to install any servers or dependencies.

Download or clone the repository.

Ensure you have an image named background.png in the same folder as the index.html file.

Double-click index.html to open it in your favorite web browser.

Start typing!

🎨 How to Customize the Game
This game was designed to be easily modified. Open index.html in any text editor (like Notepad, VS Code, or Sublime Text) to make these changes:

1. Change the Background Image
Make sure your image is named background.png and is in the same folder as your HTML file. If your image is named something else (like my-bg.jpg), find this line in the CSS (<style> section) and update it:

CSS
background-image: url('background.png'); 
2. Change the Enemy Image
Find .enemy-image in the CSS (<style> section). Remove the red background color and add your image URL like this:

CSS
.enemy-image {
    width: 50px;
    height: 50px;
    background-image: url('your-enemy-sprite.png');
    background-size: cover;
    margin: 0 auto;
}
3. Add Your Own Words
Scroll down to the JavaScript (<script> section) and find the wordList array. You can replace the default words with whatever you like!

JavaScript
let wordList = ["your", "custom", "words", "go", "here"];
4. Adjust the Difficulty
Right below the word list, you can tweak the starting stats:

JavaScript
let playerLives = 3;             // Give yourself more lives
let startingEnemySpeed = 1;      // Make enemies fall faster/slower
let enemySpawnRate = 2000;       // Milliseconds between new enemies
💻 Technologies Used
HTML5: Game structure and UI (Heads Up Display, Menus).

CSS3: Styling, layout, and visual damage effects.

Vanilla JavaScript: Game loop, collision detection, arrays, typing logic, and wave progression.

📜 License
This project is open-source and free to use. Feel free to modify it, learn from it, and use it for your own beginner coding projects!
