
// clock event handler 
document.getElementById('search-button').addEventListener('click', function () {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    console.log(inputValue)
    inputField.value = '';
    // get the value from API
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputField}`)
        .then(getphotos => getphotos.json())
        .then(phoneData => console.log(phoneData.data))
})

// const getPhones = () => {

// }