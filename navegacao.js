(function () {
  const paginas = new Set([
    "inicio.html",
    "historia.html",
    "jogo.html",
    "motivos.html"
  ]);

  function destinoValido(valor) {
    if (!valor || typeof valor !== "string") return null;

    try {
      const url = new URL(valor, window.location.href);

      if (url.origin !== window.location.origin) return null;

      const nome = url.pathname.split("/").pop();

      if (nome === "index.html" || nome === "site.html") {
        return "inicio.html";
      }

      return paginas.has(nome) ? nome : null;
    } catch {
      return null;
    }
  }

  function abrirPagina(destino) {
    const nome = destinoValido(destino);
    if (!nome) return false;

    if (
      window.parent !== window &&
      typeof window.parent.navegar === "function"
    ) {
      window.parent.navegar(nome);
      return true;
    }

    window.location.href = nome;
    return true;
  }

  window.abrirPaginaRomantica = abrirPagina;

  // Capturar links internos antes dos scripts antigos.
  document.addEventListener("click", function (evento) {
    const elemento = evento.target.closest("a[href]");
    if (!elemento) return;

    if (elemento.hasAttribute("download")) return;

    const destino = destinoValido(elemento.getAttribute("href"));
    if (!destino) return;

    if (window.parent !== window) {
      evento.preventDefault();
      evento.stopImmediatePropagation();
      abrirPagina(destino);
    }
  }, true);

  // Capturar redirecionamentos feitos por botoes
  // que chamam location.href diretamente.
  document.addEventListener("click", function (evento) {
    if (window.parent === window) return;

    const elemento = evento.target.closest(
      "[onclick]"
    );

    if (!elemento) return;

    const codigo = elemento.getAttribute("onclick") || "";

    const match = codigo.match(
      /(?:location\.href|location\.assign)\s*(?:=|\()\s*['"]([^'"]+\.html)['"]/
    );

    if (!match) return;

    const destino = destinoValido(match[1]);

    if (destino) {
      evento.preventDefault();
      evento.stopImmediatePropagation();
      abrirPagina(destino);
    }
  }, true);
})();
