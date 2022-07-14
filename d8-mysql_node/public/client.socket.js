// ---------Socket---------------------------------
const socket = io();
// Formularios---------------
// ---------------Formulario productos------------------------------------------
const productForm = document.querySelector('#productForm');
const nameInput = document.querySelector('#nameInput');
const priceInput = document.querySelector('#priceInput');
const urlInput = document.querySelector('#urlInput');
// ----------------Formulario mensajes-------------------------------------------
const formMessage = document.querySelector('#formMessage');
const usernameInput = document.querySelector('#usernameInput');
const messageInput = document.querySelector('#messageInput');
const messagePool = document.querySelector('#messagePool');

//-FUNCTIONS--------------------------------------------------
// ----------------PRODUCTOS----------------------------------------------------
async function renderProducts(productos) {
    const response = await fetch('./hbs/productList.hbs');
    const plantilla = await response.text();

    document.querySelector('#productPool').innerHTML = "";

    productos.forEach(producto => {
        const template = Handlebars.compile(plantilla);
        const html = template(producto);
        document.querySelector('#productPool').innerHTML += html;
    })
} 

function submitHandlerProduct(event) {
    //EVITAR RECARGAR PAG PREVENTDEFAULT
    event.preventDefault();

    const title = nameInput.value;
    const price = priceInput.value;
    const thumbnail = urlInput.value;

    socket.emit('cliente:producto', { title, price, thumbnail });
}

// ---------------CHAT COLABORATIVO----------------------------------------------
function submitHandlerMessage(event) {
   //EVITAR RECARGAR PAG PREVENTDEFAULT
    event.preventDefault();

    const message = messageInput.value;
    const username = usernameInput.value;
    const datetime = new Date();
    const localTs = datetime.toLocaleString("fr-FR");

    socket.emit('cliente:mensaje', { username, localTs, message });
}

function renderMessage(messageArray) {
    const html = messageArray.map(messageInfo => {
        return(`<div>
                    <span class="msgUser">${messageInfo.username}</span>
                    [<span class="msgTs">${messageInfo.localTs}</span>]:
                    <span class="msgMsg">${messageInfo.message}</span>
                </div>`)
    }).join(" ");
    messagePool.innerHTML = html;
}

//--ADD EVEN LISTENER CUANDO LE DOY SUBMIT--EVENTO ESCUCHA Y RENDERIZA ENTRE CLIENTES
productForm.addEventListener('submit', submitHandlerProduct);
socket.on('server:productos', renderProducts);

formMessage.addEventListener('submit', submitHandlerMessage);
socket.on('server:mensaje', renderMessage);


