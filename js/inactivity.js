let inactivityTimer;
let countdownTimer;
let countdownValue = 20;

// Mostrar aviso de inactividad
function showInactivityAlert() {
    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.id = 'inactivity-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Fondo oscuro
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // Crear el contenedor del aviso
    const alertContainer = document.createElement('div');
    alertContainer.style.position = 'relative';
    alertContainer.style.textAlign = 'center';

    // Imagen de aviso
    const alertImage = document.createElement('img');
    alertImage.src = 'images/areyouherefull.png';
    alertImage.alt = '¿Estás aquí?';
    alertImage.style.maxWidth = '75%';
    alertImage.style.height = 'auto';

    // Temporizador
    const timerText = document.createElement('p');
    timerText.id = 'countdown-timer';
    timerText.textContent = `Redirigiendo en ${countdownValue} segundos...`;
    timerText.style.color = 'white';
    timerText.style.fontSize = '24px';
    timerText.style.marginTop = '20px';

    // Agregar elementos al contenedor y al overlay
    alertContainer.appendChild(alertImage);
    alertContainer.appendChild(timerText);
    overlay.appendChild(alertContainer);
    document.body.appendChild(overlay);

    // Iniciar el temporizador de cuenta regresiva
    countdownTimer = setInterval(() => {
        countdownValue--;
        
        // Cambiar el texto del temporizador dependiendo del tiempo restante
        if (countdownValue === 1) {
            timerText.textContent = `Redirigiendo en 1 segundo...`;
        } else if (countdownValue == 0) {
            timerText.textContent = `Redirigiendo...`;
        } else {
            timerText.textContent = `Redirigiendo en ${countdownValue} segundos...`;
        }
        if (countdownValue === 0) {
            clearInterval(countdownTimer);
            window.location.href = 'index.html';
        }
    }, 1000);
}

// Función para ocultar el aviso y reiniciar los temporizadores
function resetInactivity() {
    clearTimeout(inactivityTimer);
    clearInterval(countdownTimer);

    // Restablecer el temporizador de inactividad
    inactivityTimer = setTimeout(showInactivityAlert, 60000); // 1 minuto

    // Reiniciar la cuenta regresiva y eliminar el overlay si existe
    countdownValue = 20;
    const overlay = document.getElementById('inactivity-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Detectar actividad
['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'].forEach((event) => {
    document.addEventListener(event, resetInactivity);
});

// Inicializar el temporizador de inactividad
inactivityTimer = setTimeout(showInactivityAlert, 60000); // 1 minuto
