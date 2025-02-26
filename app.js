window.onload = function() {
    navigateTo('signin-page');
}

function navigateTo(pageId) {
    const currentPage = document.querySelector('.page.active');

    if (currentPage) {
        currentPage.classList.add('page-exit');

        setTimeout(() => {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
                page.classList.remove('page-exit');
            });

            const newPage = document.getElementById(pageId);
            newPage.classList.add('active', 'page-enter');

            setTimeout(() => {
                newPage.classList.remove('page-enter');
            }, 10);

            if(['home-page', 'map-page', 'alerts-page', 'profile-page'].includes(pageId)) {
                const index = ['home-page', 'map-page', 'alerts-page', 'profile-page'].indexOf(pageId);
                setActiveNav(document.querySelectorAll('.nav-item')[index]);
            }
        }, 300);
    } else {
        document.getElementById(pageId).classList.add('active');
    }
}

function setActiveNav(element) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    element.classList.add('active');
}

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        navigateTo('home-page');
    } else {
        alert('Please fill in all fields');
    }
}

function signUp() {
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (fullname && email && phone && password && confirmPassword) {
        if (password === confirmPassword) {
            navigateTo('home-page');
        } else {
            alert('Passwords do not match');
        }
    } else {
        alert('Please fill in all fields');
    }
}

let sosTimerInterval;
let sosCountdown = 30;
let currentActivePage = '';

function activateSOS() {
    document.querySelectorAll('.page').forEach(page => {
        if (page.classList.contains('active')) {
            currentActivePage = page.id;
        }
    });

    document.getElementById('sos-modal').classList.add('active');

    sosCountdown = 30;
    document.getElementById('sos-timer-count').textContent = sosCountdown;

    sosTimerInterval = setInterval(updateSOSTimer, 1000);
}

function updateSOSTimer() {
    sosCountdown--;
    document.getElementById('sos-timer-count').textContent = sosCountdown;

    if (sosCountdown <= 0) {
        clearInterval(sosTimerInterval);
        document.getElementById('sos-modal').classList.remove('active');
        alert("Working");
    }
}

function cancelSOS() {
    clearInterval(sosTimerInterval);

    document.getElementById('sos-modal').classList.remove('active');
}
