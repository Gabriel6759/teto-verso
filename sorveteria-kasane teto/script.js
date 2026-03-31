//CODIGO DO DOUGLAS
function abrirModal(botao) {
    const modal = document.getElementById('modal-container');
    const imagemModal = document.getElementById('img-modal');
   
    const card = botao.parentElement;
    const imagemOriginal = card.querySelector('img').src;

    imagemModal.src = imagemOriginal;
 
    modal.style.display = 'flex';
}
 
function fecharModal() {
    const modal = document.getElementById('modal-container');
    modal.style.display = 'none';
}
 
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        fecharModal();
    }
});

