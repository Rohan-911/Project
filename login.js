document.addEventListener('DOMContentLoaded', function() {
    // Demo credentials
    const demoCredentials = {
        police: [
            { id: 'POL001', password: 'police123', name: 'Officer John Smith' },
            { id: 'POL002', password: 'police456', name: 'Officer Sarah Johnson' }
        ],
        public: [
            { email: 'user@example.com', password: 'user123', name: 'John Doe' },
            { email: 'citizen@example.com', password: 'citizen456', name: 'Jane Smith' }
        ]
    };

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');
    const registerFormElement = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            loginForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding form
            const formId = btn.dataset.tab + 'LoginForm';
            document.getElementById(formId).classList.add('active');

            // Hide register form if visible
            registerFormElement.style.display = 'none';
        });
    });

    // Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            btn.classList.toggle('fa-eye');
            btn.classList.toggle('fa-eye-slash');
        });
    });

    // Show registration form
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.login-forms').style.display = 'none';
        registerFormElement.style.display = 'block';
    });

    // Show login form
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerFormElement.style.display = 'none';
        document.querySelector('.login-forms').style.display = 'block';
    });

    // Handle police login
    const policeLoginForm = document.getElementById('policeLoginForm');
    policeLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const policeId = document.getElementById('policeId').value;
        const password = document.getElementById('policePassword').value;
        const remember = document.getElementById('policeRemember').checked;

        // Check credentials
        const policeUser = demoCredentials.police.find(
            user => user.id === policeId && user.password === password
        );

        if (policeUser) {
            // Store login info
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', 'police');
            localStorage.setItem('userName', policeUser.name);
            if (remember) {
                localStorage.setItem('rememberedUser', JSON.stringify({
                    id: policeId,
                    type: 'police'
                }));
            }
            alert(`Welcome back, ${policeUser.name}!`);
            window.location.href = 'home.html';
        } else {
            alert('Invalid Police ID or password!');
        }
    });

    // Handle public login
    const publicLoginForm = document.getElementById('publicLoginForm');
    publicLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('publicEmail').value;
        const password = document.getElementById('publicPassword').value;
        const remember = document.getElementById('publicRemember').checked;

        // Check credentials
        const publicUser = demoCredentials.public.find(
            user => user.email === email && user.password === password
        );

        if (publicUser) {
            // Store login info
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', 'public');
            localStorage.setItem('userName', publicUser.name);
            if (remember) {
                localStorage.setItem('rememberedUser', JSON.stringify({
                    email: email,
                    type: 'public'
                }));
            }
            alert(`Welcome back, ${publicUser.name}!`);
            window.location.href = 'home.html';
        } else {
            alert('Invalid email or password!');
        }
    });

    // Handle registration
    registerFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Check if email already exists
        if (demoCredentials.public.some(user => user.email === email)) {
            alert('Email already registered!');
            return;
        }

        // Add new user to demo credentials
        demoCredentials.public.push({
            email: email,
            password: password,
            name: name
        });

        alert('Registration successful! Please login.');
        registerFormElement.style.display = 'none';
        document.querySelector('.login-forms').style.display = 'block';
        document.querySelector('[data-tab="public"]').click();
    });

    // Check for remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        const user = JSON.parse(rememberedUser);
        if (user.type === 'police') {
            document.getElementById('policeId').value = user.id;
            document.getElementById('policeRemember').checked = true;
            document.querySelector('[data-tab="police"]').click();
        } else {
            document.getElementById('publicEmail').value = user.email;
            document.getElementById('publicRemember').checked = true;
            document.querySelector('[data-tab="public"]').click();
        }
    }

    // Check if user is already logged in
    function checkAuth() {
        // Here you would typically check for a valid session/token
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            window.location.href = 'home.html';
        }
    }

    // Run auth check
    checkAuth();
}); 