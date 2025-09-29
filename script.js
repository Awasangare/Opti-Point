const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const wrapper = document.querySelector(".wrapper");
const titleHeader = document.getElementById("formTitle");

function loginFunction() {
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;
    registerForm.style.left = "150%";
    registerForm.style.opacity = 0;
    wrapper.style.height = "500px";
    titleHeader.innerHTML = `L<span class="yellow">O</span>G<span class="red">I</span>N`;
}

function registerFunction() {
    loginForm.style.left = "-50%";
    loginForm.style.opacity = 0;
    registerForm.style.left = "50%";
    registerForm.style.opacity = 1;
    wrapper.style.height = "580px";
    titleHeader.innerHTML = `S<span class="yellow">I</span>GN<span class="red">U</span>P`;
}

function handleRegister() {
    const company = document.getElementById('reg-company').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const agree = document.getElementById('agree').checked;

    if (!company || !email || !phone) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    if (!agree) {
        showNotification('Veuillez accepter les termes et conditions', 'error');
        return;
    }

    fetch('register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nomEntreprise: company,
            email: email,
            telephone: phone
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessModal();
            document.getElementById('reg-company').value = '';
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-phone').value = '';
            document.getElementById('agree').checked = false;
        } else {
            showNotification((data.message || 'Erreur lors de l\'inscription') + (data.erreur ? " : " + data.erreur : ""), 'error');
        }
    })
    .catch((error) => {
        showNotification('Erreur de connexion au serveur : ' + error, 'error');
    });
}

function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">
                <i class="bx bx-check-circle"></i>
            </div>
            <h2>Inscription réussie!</h2>
            <p>Votre demande d'inscription sera bien prise en compte et un email vous sera envoyé dans les 24H</p>
            <button onclick="closeSuccessModal()" class="modal-btn">Compris</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.remove();
    }
}

function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Particules déco
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
    `;
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    document.body.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 5000);
}
setInterval(createParticle, 500);

// Login affiché par défaut au chargement
window.onload = loginFunction;