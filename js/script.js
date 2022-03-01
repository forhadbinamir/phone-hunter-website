
// clock event handler 
document.getElementById('search-button').addEventListener('click', function () {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    if (inputField.value == "") {
        document.getElementById('warning1').style.display = 'block';
    } else {

        // console.log(inputValue)
        inputField.value = '';
        // get the value from API
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputField}`)
            .then(getphotos => getphotos.json())
            .then(phoneData => displayPhones(phoneData.data))

        document.getElementById('warning1').style.display = 'none';

    }
})

const displayPhones = phones => {
    const slicephone = phones.slice(0, 20)
    // console.log(slicephone);
    const cardField = document.getElementById('card-field');
    slicephone.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div')
        div.className = 'col-lg-4 col-md-6 col-sm-12'
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
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phoneDes => {
    console.log(phoneDes)
    const phoneDetails = document.getElementById('phone-details')
    const cardField = document.getElementById('card-field');
    cardField.textContent = '';
    const div = document.createElement('div');
    div.className = 'row mt-5';
    div.innerHTML = `
            <div class="col-lg-6 col-sm-12">
                    <img src="${phoneDes.image}" class="card-img-top w-75"  alt="...">
                </div>
                <div class="col-6">
                    <div class="card-body">
                        <h3 class="card-title">${phoneDes.name}</h3>
                        <h5 class="card-title">${phoneDes.brand}</h5>
                        <p>${phoneDes.releaseDate}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${phoneDes.mainFeatures.chipSet}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.displaySize}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.storage}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.memory}</li>
                        
                        <li class="list-group-item"><span class="fw-bold">Sensors</span></li>
                        <li class="list-group-item">${phoneDes.mainFeatures.sensors[0]}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.sensors[1]}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.sensors[2]}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.sensors[3]}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.sensors[4]}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.sensors[5]}</li>
                        
                    </ul>
                </div>
    `
    phoneDetails.appendChild(div)
}