 let wordList = ["html", "css", "code", "game", "apple", "water", "hello", "world", "keyboard", "mouse", "screen", "pixel", "beginner", "script", "style"];
        
        let playerLives = 3;
        let startingEnemySpeed = 1;
        let enemySpawnRate = 2000;
        
        let score = 0;
        let combo = 0;
        let wave = 1;
        let activeEnemies = [];
        let currentTypedWord = "";
        
        let gameLoopTimer;
        let spawnTimer;
        let isGameOver = false;

        function startGame() {
            document.getElementById("start-screen").style.display = "none";
            document.getElementById("game-over-screen").style.display = "none";
            
            isGameOver = false;
            
            document.addEventListener("keydown", handleTyping);

            gameLoopTimer = setInterval(updateGame, 50); 
            spawnTimer = setInterval(spawnEnemy, enemySpawnRate);
        }

        function resetGame() {
            score = 0;
            combo = 0;
            wave = 1;
            playerLives = 3;
            currentTypedWord = "";
            activeEnemies = [];
            startingEnemySpeed = 1;
            enemySpawnRate = 2000;
            
            let container = document.getElementById("game-container");
            let oldEnemies = document.getElementsByClassName("enemy");
            while(oldEnemies.length > 0){
                oldEnemies[0].parentNode.removeChild(oldEnemies[0]);
            }

            updateHUD();
            document.getElementById("current-input").innerText = currentTypedWord;
            
            startGame();
        }

        function spawnEnemy() {
            if (isGameOver) return;

            let randomIndex = Math.floor(Math.random() * wordList.length);
            let randomWord = wordList[randomIndex];

            let newEnemyDiv = document.createElement("div");
            newEnemyDiv.className = "enemy";
            
            let randomX = Math.floor(Math.random() * 700);
            newEnemyDiv.style.left = randomX + "px";
            newEnemyDiv.style.top = "-50px";

            newEnemyDiv.innerHTML = `
                <div class="enemy-image"></div>
                <div class="enemy-word">${randomWord}</div>
            `;

            document.getElementById("game-container").appendChild(newEnemyDiv);

            let enemyObject = {
                element: newEnemyDiv,
                word: randomWord,
                yPosition: -50,
                speed: startingEnemySpeed + (Math.random() * 0.5)
            };
            
            activeEnemies.push(enemyObject);
        }

        function updateGame() {
            if (isGameOver) return;

            for (let i = activeEnemies.length - 1; i >= 0; i--) {
                let enemy = activeEnemies[i];
                
                enemy.yPosition += enemy.speed;
                enemy.element.style.top = enemy.yPosition + "px";

                if (enemy.yPosition > 450) {
                    enemy.element.querySelector(".enemy-word").style.backgroundColor = "orange";
                }

                if (enemy.yPosition > 550) {
                    takeDamage();
                    enemy.element.remove();
                    activeEnemies.splice(i, 1);
                }
            }

            if (score > wave * 500) {
                wave++;
                startingEnemySpeed += 0.5;
                
                clearInterval(spawnTimer);
                enemySpawnRate = enemySpawnRate - 200; 
                if (enemySpawnRate < 500) enemySpawnRate = 500;
                spawnTimer = setInterval(spawnEnemy, enemySpawnRate);
                
                updateHUD();
            }
        }

        function handleTyping(event) {
            if (isGameOver) return;

            let key = event.key.toLowerCase();
            let alphabet = "abcdefghijklmnopqrstuvwxyz";

            if (key === "backspace") {
                currentTypedWord = currentTypedWord.slice(0, -1);
                document.getElementById("current-input").innerText = currentTypedWord;
                return;
            }

            if (key === " " || key === "enter") {
                currentTypedWord = "";
                document.getElementById("current-input").innerText = currentTypedWord;
                return;
            }

            if (alphabet.includes(key)) {
                currentTypedWord += key;
                document.getElementById("current-input").innerText = currentTypedWord;
                
                checkWordMatch();
            }
        }

        function checkWordMatch() {
            for (let i = 0; i < activeEnemies.length; i++) {
                if (activeEnemies[i].word === currentTypedWord) {
                    combo++;
                    score += 10 * combo;
                    
                    activeEnemies[i].element.remove();
                    activeEnemies.splice(i, 1);
                    
                    currentTypedWord = "";
                    document.getElementById("current-input").innerText = currentTypedWord;
                    
                    updateHUD();
                    break;
                }
            }
        }

        function takeDamage() {
            playerLives--;
            combo = 0;
            
            let container = document.getElementById("game-container");
            
            // CHANGED: Flash a red overlay, then go back to transparent so image shows
            container.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            setTimeout(function() {
                container.style.backgroundColor = "transparent";
            }, 100);

            updateHUD();

            if (playerLives <= 0) {
                gameOver();
            }
        }

        function updateHUD() {
            document.getElementById("score-text").innerText = score;
            document.getElementById("combo-text").innerText = combo;
            document.getElementById("wave-text").innerText = wave;

            let hearts = "";
            for (let i = 0; i < playerLives; i++) {
                hearts += "❤️";
            }
            document.getElementById("lives-text").innerText = hearts;
        }

        function gameOver() {
            isGameOver = true;
            clearInterval(gameLoopTimer);
            clearInterval(spawnTimer);
            document.removeEventListener("keydown", handleTyping);

            document.getElementById("final-score").innerText = score;
            document.getElementById("game-over-screen").style.display = "flex";
        }

