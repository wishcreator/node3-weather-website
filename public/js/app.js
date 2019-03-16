console.log('Client side');




const form = document.querySelector('form');

const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

form.addEventListener('submit', e => {
    e.preventDefault();

    const search = e.target.elements.location.value;

    msg1.textContent = 'Loadin...';
    msg2.textContent = '';

    fetch('http://localhost:3000/weather?search='+search).then(res => {
    res.json().then(data => {
        if(data.error){
            return  msg1.textContent = data.error;
        }
        msg1.textContent = data.address;
        msg2.textContent = data.forecast;
    })
})
})