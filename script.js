
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // CORAÇÕES ANIMADOS
  // =====================================

  const areaCoracoes = document.getElementById("coracoes");

  function criarCoracao() {
    if (!areaCoracoes) return;

    const coracao = document.createElement("span");

    coracao.className = "coracao";
    coracao.textContent =
      Math.random() > 0.5 ? "♡" : "♥";

    coracao.style.left = Math.random() * 100 + "%";

    coracao.style.fontSize =
      (12 + Math.random() * 20) + "px";

    const duracao = 7 + Math.random() * 6;

    coracao.style.animationDuration = duracao + "s";

    areaCoracoes.appendChild(coracao);

    setTimeout(() => {
      coracao.remove();
    }, duracao * 1000);
  }

  setInterval(criarCoracao, 650);

  // =====================================
  // MÚSICA AUTOMÁTICA
  // =====================================

  const musica = document.getElementById("musica-romantica");

  if (!musica) return;

  musica.volume = 0.5;

  function iniciarMusica() {
    if (!musica.paused) return;

    musica.play().then(() => {
      console.log("Música iniciada! ❤️");
    }).catch((erro) => {
      console.log(
        "O navegador bloqueou a reprodução automática.",
        erro
      );
    });
  }

  // Tenta tocar assim que o site abrir.
  iniciarMusica();

  // Tenta novamente quando estiver pronta.
  musica.addEventListener(
    "canplay",
    iniciarMusica,
    { once: true }
  );

  // Caso o navegador bloqueie,
  // inicia na primeira interação.
  document.addEventListener(
    "pointerdown",
    iniciarMusica
  );

  document.addEventListener(
    "keydown",
    iniciarMusica
  );

  // Verifica se o arquivo está disponível.
  musica.addEventListener("error", () => {
    console.error(
      "Erro ao carregar: musicas/temari.mp3"
    );
  });

});
