let btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    console.log("Button has been pressed");

    fetch('/info')
        .then(resp => resp.json())
        .then(data => console.log(data));
});