const calButtons = document.getElementsByClassName('btns')[0].querySelectorAll('button');
for (let i = 0; i < calButtons.length; i++) {
    const btn = calButtons[i];
    btn.addEventListener('mouseup', () => {
        btn.style.transform = 'scale(1)';
    })

    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.85)';
    })
}