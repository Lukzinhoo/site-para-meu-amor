
document.addEventListener("DOMContentLoaded", () => {
  const imagens = document.querySelectorAll(".moldura img");

  imagens.forEach((imagem) => {
    function mostrarPlaceholder() {
      imagem.classList.add("invisivel");
    }

    imagem.addEventListener("error", mostrarPlaceholder);

    if (imagem.complete && imagem.naturalWidth === 0) {
      mostrarPlaceholder();
    }
  });
});
