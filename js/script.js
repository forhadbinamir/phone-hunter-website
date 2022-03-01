// loading Spinner 
const loadingSpinner = displayLoding => {
    document.getElementById('spinner').style.display = displayLoding;
}
// clock event handler 
document.getElementById('search-button').addEventListener('click', function () {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    // display Spinner 
    loadingSpinner('block')
    if (inputField.value == "") {
        const cardField = document.getElementById('card-field');
        cardField.textContent = ''
        const phoneDetails = document.getElementById('phone-details')
        phoneDetails.textContent = ''
        document.getElementById('warning1').style.display = 'block';
        document.getElementById('warning2').style.display = 'none';
    }
    else if (isNaN(inputValue) === false) {
        document.getElementById('warning2').style.display = 'block';
        document.getElementById('warning1').style.display = 'none';
    }
    else {

        // console.log(inputValue)
        inputField.value = '';
        // get the value from API
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(getphotos => getphotos.json())
            .then(phoneData => displayPhones(phoneData.data))

        document.getElementById('warning1').style.display = 'none';
        document.getElementById('warning2').style.display = 'none';

    }

})
// display phone with using arrow function in UI 
const displayPhones = phones => {
    const slicephone = phones.slice(0, 20)
    const cardField = document.getElementById('card-field');
    cardField.textContent = ''
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = ''
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
        cardField.appendChild(div);
        loadingSpinner('none')
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
                        <h3 class="card-title"><span class="fw-bold">Phone Name: </span>${phoneDes.name}</h3>
                        <h5 class="card-title">Brand Name: ${phoneDes.brand}</h5>
                        <p><span class="fw-bold">Release Date: </span> ${phoneDes.releaseDate ? phoneDes.releaseDate : ""}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${phoneDes.mainFeatures.chipSet}</li>
                        <li class="list-group-item"><span class="fw-bold">Display Size: </span>${phoneDes.mainFeatures.displaySize}</li>
                        <li class="list-group-item"><span class="fw-bold">Storage: </span>${phoneDes.mainFeatures.storage}</li>
                        <li class="list-group-item">${phoneDes.mainFeatures.memory}</li>

                        
                        <li class="list-group-item"><span class="fw-bold">Sensors</span></li>
                        <li class="list-group-item">${phoneDes.mainFeatures.sensors[0] ? phoneDes.mainFeatures.sensors[0] : ""}, ${phoneDes.mainFeatures.sensors[1] ? phoneDes.mainFeatures.sensors[1] : ""}, ${phoneDes.mainFeatures.sensors[2] ? phoneDes.mainFeatures.sensors[2] : ""}, ${phoneDes.mainFeatures.sensors[3] ? phoneDes.mainFeatures.sensors[3] : ""}, ${phoneDes.mainFeatures.sensors[4] ? phoneDes.mainFeatures.sensors[4] : ""}, ${phoneDes.mainFeatures.sensors[5] ? phoneDes.mainFeatures.sensors[5] : ""}, ${phoneDes.mainFeatures.sensors[6] ? phoneDes.mainFeatures.sensors[6] : ""}</li>
                        <li class="list-group-item"><span class="fw-bold">Others information</span></li>
                        <li class="list-group-item"><span class="fw-bold">WLAN: </span>${phoneDes.others.WLAN ? phoneDes.others.WLAN : ""}</li>
                        <li class="list-group-item"><span class="fw-bold">Bluetooth: </span>${phoneDes.others.Bluetooth ? phoneDes.others.Bluetooth : ""}</li>
                        <li class="list-group-item"><span class="fw-bold">GPS: </span>${phoneDes.others.GPS ? phoneDes.others.GPS : ""}</li>
                        <li class="list-group-item"><span class="fw-bold">NFC: </span>${phoneDes.others.NFC ? phoneDes.others.NFC : ""}</li>
                        <li class="list-group-item"><span class="fw-bold">Radio: </span>${phoneDes.others.Radio ? phoneDes.others.Radio : ""}</li>
                        <li class="list-group-item"><span class="fw-bold">USB: </span>${phoneDes.others.USB ? phoneDes.others.USB : ""}</li>
                        
                    </ul>
                </div>
    `
    phoneDetails.appendChild(div)
}