const topSection = document.querySelector('.top-section');

const keyboardSection = document.querySelector('.keyboard');

const toggleButton = document.getElementById('toggle-keyboard-btn');

const keyboardKeys = document.querySelectorAll('.key, .keyspace');




function getOnScreenKey(event) {

    const targetKey = event.code === 'Space' ? 'SPACE' : event.key.toUpperCase();

    return Array.from(keyboardKeys).find(button => button.textContent.trim() === targetKey);

}




window.addEventListener('keydown', (event) => {

    const matchedKey = getOnScreenKey(event);

    if (matchedKey) {

        matchedKey.classList.add('active');

    }

});




window.addEventListener('keyup', (event) => {

    const matchedKey = getOnScreenKey(event);

    if (matchedKey) {

        matchedKey.classList.remove('active');

    }

});




toggleButton.addEventListener('click', () => {

    const isHidden = keyboardSection.classList.toggle('hidden');

    topSection.classList.toggle('full-height', isHidden);

    toggleButton.textContent = isHidden ? 'Show Keyboard' : 'Hide Keyboard';

});