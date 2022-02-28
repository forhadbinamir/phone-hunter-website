
// clock event handler 
document.getElementById('search-button').addEventListener('click', function () {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    if (inputField.value === 0) {
        document.getElementById('warning').style.display = 'none';
    }
    // console.log(inputValue)
    inputField.value = '';
    // get the value from API
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputField}`)
        .then(getphotos => getphotos.json())
        .then(phoneData => displayPhones(phoneData.data))
})

const displayPhones = phones => {
    // console.log(phones);
    const cardField = document.getElementById('card-field');
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div')
        div.className = 'col-4'
        div.innerHTML = `
        <div class="card">
                <img src="${phone.image}" class="card-img-top img-fluid w-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text"></p>
                    <a href="#" onclick="showDetails('${phone.slug}')" class="btn btn-primary">Details</a>
                </div>
            </div>
        `
        cardField.appendChild(div)

    })

}

const showDetails = detailsphone => {
    const url = `https://openapi.programming-hero.com/api/phone/${detailsphone}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
}