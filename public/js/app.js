

const weatherForm = document.querySelector('form');
const search      = document.querySelector('input');
const message1    = document.querySelector('#message-1');
const message2    = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    message1.textContent = 'loading';
    message2.textContent = '';
    e.preventDefault()
    const location = search.value;
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((output)=>{
            if (output.error){
                message1.textContent = output.error;
            }
            else{
                message1.textContent = output.location;
                message2.textContent = output.forecast;
            }
        });
    });


})