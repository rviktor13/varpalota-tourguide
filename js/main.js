//navigáció

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

//validáció

document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('foglalas-form');
    const successBox = document.getElementById('success-message');
    const savePdfBtn = document.getElementById('save-pdf-btn');
    const newBookingBtn = document.getElementById('new-booking-btn');
    const confirmationBox = document.getElementById('print-confirmation');

    if (form) {
        
        const nev = document.getElementById('nev');
        const email = document.getElementById('email');
        const datum = document.getElementById('datum');
        const tura = document.getElementById('tura-tipus');
        const felnott = document.getElementById('felnott');
        const gyerek = document.getElementById('gyerek');
        const megjegyzes = document.getElementById('megjegyzes');
        const adatkezeles = document.getElementById('adatkezeles');

        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            clearErrors();
            
            let isValid = true;
            const today = new Date().setHours(0, 0, 0, 0);

            if (nev.value.trim() === '') {
                showError('nev-error', 'A név kitöltése kötelező.');
                nev.classList.add('invalid');
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError('email-error', 'Érvénytelen e-mail cím.');
                email.classList.add('invalid');
                isValid = false;
            }

            const selectedDate = new Date(datum.value);
            if (!datum.value || selectedDate < today) {
                showError('datum-error', 'A dátum nem lehet múltbeli vagy üres.');
                datum.classList.add('invalid');
                isValid = false;
            }

            if (tura.value === '') {
                showError('tura-error', 'Kérjük, válasszon túra típust.');
                tura.classList.add('invalid');
                isValid = false;
            }

            if (parseInt(felnott.value, 10) < 1) {
                showError('felnott-error', 'Legalább 1 felnőtt részvétele szükséges.');
                felnott.classList.add('invalid');
                isValid = false;
            }

            if (!adatkezeles.checked) {
                showError('adatkezeles-error', 'A foglaláshoz el kell fogadni a feltételeket.');
                adatkezeles.classList.add('invalid');
                isValid = false;
            }
            
            if (isValid) {
                
                generateConfirmationHTML();

                form.style.display = 'none';

                successBox.style.display = 'block';
                
                form.reset(); 
            }
        });

        savePdfBtn.addEventListener('click', () => {
            window.print();
        });

        newBookingBtn.addEventListener('click', () => {
            successBox.style.display = 'none';
            form.style.display = 'block';
            confirmationBox.innerHTML = '';
        });
        
        function generateConfirmationHTML() {
            const nevData = nev.value.trim();
            const emailData = email.value.trim();
            const datumData = new Date(datum.value).toLocaleDateString('hu-HU');
            const turaData = tura.options[tura.selectedIndex].text;
            const felnottData = felnott.value;
            const gyerekData = gyerek.value;
            const fizetesData = document.querySelector('input[name="fizetes"]:checked').parentElement.textContent.trim();
            const megjegyzesData = megjegyzes.value.trim() === '' ? 'Nincs megjegyzés' : megjegyzes.value.trim();

            confirmationBox.innerHTML = `
                <h2>Foglalás Visszaigazolás</h2>
                <p>Generálás dátuma: ${new Date().toLocaleDateString('hu-HU')}</p>
                <hr>
                <h3>Kedves ${nevData}!</h3>
                <p>Köszönjük foglalását a Várpalota Tourguide oldalon. Az alábbiakban látja a megadott részleteket:</p>
                
                <p><strong>Név:</strong> ${nevData}</p>
                <p><strong>E-mail cím:</strong> ${emailData}</p>
                <br>
                <p><strong>Kiválasztott túra:</strong> ${turaData}</p>
                <p><strong>Időpont:</strong> ${datumData}</p>
                <p><strong>Létszám:</strong> ${felnottData} felnőtt, ${gyerekData} gyerek</p>
                <br>
                <p><strong>Fizetési mód:</strong> ${fizetesData}</p>
                <p><strong>Megjegyzés:</strong> ${megjegyzesData}</p>
                <br>
                <p><em>Várjuk szeretettel Várpalotán!</em></p>
            `;
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        function clearErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.style.display = 'none');
            
            const invalidFields = document.querySelectorAll('.invalid');
            invalidFields.forEach(field => field.classList.remove('invalid'));
        }
    }
});