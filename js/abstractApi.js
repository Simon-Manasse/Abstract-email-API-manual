async function getAuthentication(email) {
    const api_key ="2697a39b988e4b0e895b558adb3c8881";
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${api_key}&email=${email}`
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    catch (err) {
        console.log('Error: ', err);
    }
}

async function checkEmail() {
    const email = document.getElementById("email").value;
    let isCorrectEmail = true;
    if (email === '') {
        alert('You must fill in your email');
    } else {
        try {
            const authentication = await getAuthentication(email);
            console.log(authentication);    
            isCorrectEmail = isValidFormat(authentication, isCorrectEmail);
            isCorrectEmail = isDsposableEmail(authentication, isCorrectEmail);

            goToNextPage(isCorrectEmail);
        } catch (error) {
            console.log('Error:', error);
        }
    }
}


function saveData() {
    localStorage.setItem('username', document.getElementById('name').value);
    localStorage.setItem('email',document.getElementById('email').value);
    // Hash password here
    localStorage.setItem('password', document.getElementById('password').value);
}

function isValidFormat(authentication, checkBool) {
    if (!authentication.is_valid_format.value) {
        alert('This email is not in a valid fomat.');
        checkBool = false;
    }
    return checkBool;
}

function isDsposableEmail(authentication, checkBool) {
    if (authentication.is_disposable_email.value) {
        alert("This can't be a disposable email.")
        checkBool = false;
    }
    return checkBool;
}

function goToNextPage(checkBool) {
    if (checkBool) {
        saveData();
        window.location = 'profile.html';
    }
}

if (window.location.pathname == '/profile.html') {
    window.addEventListener('load', function () {
        let email = this.document.getElementById('email');
        let username = document.getElementById('username')
        username.innerHTML = this.localStorage.getItem('username');
        email.innerHTML = `Email: ${this.localStorage.getItem('email')}`;
        console.log(this.localStorage.getItem('password'));
    });
}