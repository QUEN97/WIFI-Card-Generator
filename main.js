function generateWifiCard() {
    const ssid = document.getElementById("ssid").value;
    const password = document.getElementById("password").value;
    const encryption = document.getElementById("encryption").value;

    // Validación de campos
    if (ssid === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Mostrar los detalles de la red WiFi en la tarjeta
    document.getElementById("ssidOutput").textContent = ssid;
    document.getElementById("passwordOutput").textContent = password;
    document.getElementById("encryptionOutput").textContent = encryption;

    // Ocultar el formulario
    document.getElementById("formulario").classList.add("hidden");

    // Mostrar la tarjeta de la red WiFi
    document.getElementById("wifiCard").classList.remove("hidden");

    // Generar el código QR
    const wifiConfig = `WIFI:T:${encryption};S:${ssid};P:${password};;`; // Formato para WiFi
    generateQRCode(wifiConfig);

    // Mostrar el botón de impresión en PDF
    document.querySelector('.print-container').classList.remove('hidden');
}

function generateQRCode(data) {
    // Limpiar cualquier código QR previo
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";  // Limpiar el contenedor de QR previo

    // Crear un nuevo elemento canvas para el código QR
    const canvas = document.createElement("canvas");
    qrcodeContainer.appendChild(canvas);  // Agregar el canvas al contenedor

    // Generar el código QR en el canvas
    QRCode.toCanvas(canvas, data, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log("QR generado!");
        }
    });
}

function resetForm() {
    // Mostrar el formulario de nuevo
    document.getElementById("formulario").classList.remove("hidden");
    
    // Limpiar los campos de entrada
    document.getElementById("ssid").value = "";
    document.getElementById("password").value = "";
    document.getElementById("encryption").value = "WPA2";

    // Ocultar la tarjeta WiFi y el QR generado
    document.getElementById("wifiCard").classList.add("hidden");
    document.querySelector('.print-container').classList.add('hidden');
}

function printToPDF() {
    // Asegurarse de que el contenido esté visible antes de capturarlo
    document.getElementById('wifiCard').classList.remove('hidden');
    
    // Convertir el contenido del div en canvas
    html2canvas(document.getElementById('wifiCard')).then(function (canvas) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Convertir el canvas a imagen y agregar al PDF
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10, 180, 160);

        // Mostrar el PDF en una nueva ventana
        doc.output('dataurlnewwindow');
    });
}
function testPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Prueba de PDF", 10, 10);  // Añadir texto simple
    doc.output('dataurlnewwindow');  // Mostrar en nueva ventana
}
