// Variables
const tshirtImage = document.getElementById('tshirt-image');
let currentImageIndex = 1;
const totalImages = 24;

document.addEventListener('deviceready', function () {
    // Activa el modo de mantener la pantalla encendida
    window.powerManagement.acquire(
        function () {
            console.log('Pantalla bloqueada para no apagarse.');
        },
        function (error) {
            console.error('Error al bloquear la pantalla:', error);
        }
    );
}, false);

document.addEventListener('pause', function () {
    window.powerManagement.release(
        function () {
            console.log('Pantalla desbloqueada.');
        },
        function (error) {
            console.error('Error al desbloquear la pantalla:', error);
        }
    );
}, false);

// Función para cambiar la imagen del polo con transición
function changeTshirtImage() {
    // Primero, hacemos un desvanecimiento de la imagen
    tshirtImage.style.opacity = 0;

    // Esperamos 1 segundo (el tiempo de la transición) para cambiar la imagen
    setTimeout(() => {
        currentImageIndex = (currentImageIndex % totalImages) + 1; // Aumenta el índice y lo reinicia al llegar al total
        tshirtImage.src = `images/tshirts/${currentImageIndex}.png`; // Cambia la fuente de la imagen

        // Luego, volvemos a mostrar la imagen con opacidad 1
        tshirtImage.style.opacity = 1;
    }, 1000); // 1000 ms es igual al tiempo de la transición en CSS
}

// Cambia la imagen cada 6 segundos
setInterval(changeTshirtImage, 6000);
