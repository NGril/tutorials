// THIS PROJECT IS VERY COOL & EASY BUT UNFORTUNATELY GOOGLE API IS NOT FREE AFTER THE TRIAL

import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'write your api key here'; //find this on your google account

// declare var google: any; // -> not needed since @types are installed

type GoogleApiResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // you can tell TS the expected return type in get, noice
    axios
        .get<GoogleApiResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {

            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location!');
            }
            const coordinates = response.data.results[0].geometry.location;

            const map = new google.maps.Map(document.getElementById('map')!, {
                center: coordinates,
                zoom: 10
            });

            new google.maps.Marker({
                position: coordinates,
                map: map,
            });

        })
        .catch(error => {
            alert(error.message);
            console.log(error);
        });
}

form.addEventListener('submit', searchAddressHandler);
