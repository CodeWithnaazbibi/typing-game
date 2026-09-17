
const topSection = document.querySelector('.top-section');
const keyboard = document.querySelector('.keyboard');
const toggleBtn = document.getElementById('toggle-keyboard-btn');


const allKeys = document.querySelectorAll('.key, .keyspace');



window.addEventListener('keydown', function(event) {
    let pressedKey = event.key.toUpperCase();



    if (event.code === 'Space') {
        pressedKey = 'SPACE';
    }


    allKeys.forEach(function(keyButton) {
        if (keyButton.innerText.trim() === pressedKey) {
            keyButton.classList.add('active');
        }
    });
});



window.addEventListener('keyup', function(event) {
    let releasedKey = event.key.toUpperCase();

    if (event.code === 'Space') {
        releasedKey = 'SPACE';
    }

    allKeys.forEach(function(keyButton) {
        if (keyButton.innerText.trim() === releasedKey) {
            keyButton.classList.remove('active');
        }
    });
});




toggleBtn.addEventListener('click', function() {
    // Toggle hidden state on keyboard
    keyboard.classList.toggle('hidden');
    

    topSection.classList.toggle('full-height');

  
    if (keyboard.classList.contains('hidden')) {
        toggleBtn.innerText = 'Show Keyboard';
    } else {
        toggleBtn.innerText = 'Hide Keyboard';
    }
});
