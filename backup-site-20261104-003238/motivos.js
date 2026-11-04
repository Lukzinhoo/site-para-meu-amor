document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const abertura = $("abertura");
  const mural = $("mural");
  const creditos = $("creditos");
  const fotos = $("fotos");
  const musica = $("musica");
  const aviso = $("aviso-audio");
  const mensagem = $("mensagem-audio");

  const motivos = [
    "Porque seu sorriso ilumina meus dias. ❤️",
    "Porque cada momento com você é especial.",
    "Porque você me faz sorrir nos dias difíceis.",
    "Porque seu abraço é meu lugar favorito.",
    "Porque com você tudo fica mais bonito.",
    "Porque amo cada detalhe do seu jeitinho.",
    "Porque nossas lembranças são meus tesouros.",
    "Porque você torna tudo inesquecível.",
    "Porque meu coração escolhe você todos os dias.",
    "Porque eu escolheria você mil vezes. ❤️"
  ];

  const midias = [
    ["foto", "imagens/foto1.png"],
    ["video", "videos/video1.mp4"],
    ["foto", "imagens/foto2.png"],
    ["video", "videos/video2.mp4"],
    ["foto", "imagens/foto3.png"],
    ["video", "videos/video3.mp4"],
    ["foto", "imagens/foto4.png"],
    ["video", "videos/video4.mp4"],
    ["foto", "imagens/foto5.png"],
    ["video", "videos/video5.mp4"],
    ["foto", "imagens/foto6.png"],
    ["video", "videos/video6.mp4"],
    ["foto", "imagens/foto7.png"]
  ];

  const posicoes = [
    [4, 30, -12],
    [72, 25, 9],
    [23, 49, 7],
    [60, 54, -8],
    [2, 67, 10],
    [78, 68, -12],
    [41, 35, -5],
    [15, 22, 11],
    [53, 70, 8],
    [35, 65, -9],
    [73, 42, 7],
    [7, 49, -6],
    [56, 23, 12]
  ];

  let indice = 0;
  let timer = null;
  let pausado = false;
  let emCreditos = false;
  let tempoRestante = 5000;
  let inicioTimer = 0;
  let videoAtual = null;

  function tocarMusica() {
    if (!musica) return;

    musica.volume = 0.55;

    musica.play()
      .then(() => {
        aviso.classList.add("escondido");
        console.log("Música iniciada.");
      })
      .catch((erro) => {
        mensagem.textContent =
          "Não foi possível tocar a música. Confira musicas/temari.mp3.";
        aviso.classList.remove("escondido");
        console.error("Erro de áudio:", erro);
      });
  }

  function limparTimer() {
    clearTimeout(timer);
    timer = null;
  }

  function agendar(tempo) {
    limparTimer();
    tempoRestante = tempo;
    inicioTimer = performance.now();
    timer = setTimeout(proximo, tempo);
  }

  function pararVideos() {
    fotos.querySelectorAll("video").forEach((video) => {
      video.pause();
    });
    videoAtual = null;
  }

  function adicionarMidia(item, numero) {
    const [tipo, caminho] = item;
    const [x, y, rot] = posicoes[numero];

    const moldura = document.createElement("div");
    moldura.className = "polaroid";

    const largura = window.innerWidth <= 650 ? 34 : 17;
    moldura.style.left = Math.min(x, 100 - largura) + "%";
    moldura.style.top = y + "%";
    moldura.style.setProperty("--rot", rot + "deg");

    if (tipo === "foto") {
      const img = document.createElement("img");
      img.src = caminho;
      img.alt = "Uma lembrança nossa";
      moldura.appendChild(img);
    } else {
      const video = document.createElement("video");
      video.src = caminho;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      moldura.appendChild(video);
      videoAtual = video;
      video.play().catch(console.warn);
    }

    const legenda = document.createElement("span");
    legenda.textContent = "Nós dois ♡";
    moldura.appendChild(legenda);

    fotos.appendChild(moldura);
  }

  function proximo() {
    if (pausado || emCreditos) return;

    if (indice >= midias.length) {
      iniciarCreditos();
      return;
    }

    const numeroMotivo = Math.min(
      Math.floor(indice * motivos.length / midias.length),
      motivos.length - 1
    );

    $("frase-motivo").textContent = motivos[numeroMotivo];
    $("contador").textContent =
      String(numeroMotivo + 1).padStart(2, "0") + " / 10";

    if (videoAtual) {
      videoAtual.pause();
      videoAtual = null;
    }

    adicionarMidia(midias[indice], indice);

    const duracao = midias[indice][0] === "video"
      ? 8000
      : 5000;

    indice++;
    agendar(duracao);
  }

  function iniciar() {
    limparTimer();
    pararVideos();

    indice = 0;
    pausado = false;
    emCreditos = false;
    fotos.innerHTML = "";

    abertura.classList.add("escondido");
    creditos.classList.add("escondido");
    mural.classList.remove("escondido");

    $("pausar").textContent = "Pausar ⏸";

    if (musica) musica.currentTime = 0;
    tocarMusica();
    proximo();
  }

  function alternarPausa() {
    if (emCreditos) return;

    pausado = !pausado;

    if (pausado) {
      if (timer !== null) {
        tempoRestante = Math.max(
          0,
          tempoRestante - (performance.now() - inicioTimer)
        );
      }

      limparTimer();
      if (musica) musica.pause();
      if (videoAtual) videoAtual.pause();
      $("pausar").textContent = "Continuar ▶";
    } else {
      tocarMusica();
      if (videoAtual) videoAtual.play().catch(console.warn);
      $("pausar").textContent = "Pausar ⏸";
      agendar(tempoRestante);
    }
  }

  function montarCreditos() {
    const area = $("fotos-creditos");
    area.innerHTML = "";

    for (let coluna = 0; coluna < 2; coluna++) {
      const div = document.createElement("div");
      div.className = "coluna";

      for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = "imagens/foto" + (coluna * 3 + i + 1) + ".png";
        img.alt = "Uma foto nossa";
        div.appendChild(img);
      }

      area.appendChild(div);
    }
  }

  function iniciarCreditos() {
    if (emCreditos) return;

    emCreditos = true;
    limparTimer();
    pararVideos();

    mural.classList.add("escondido");
    creditos.classList.remove("escondido");

    montarCreditos();

    const texto = $("texto-creditos");
    texto.classList.remove("rolando");
    texto.style.setProperty(
      "--altura",
      (texto.scrollHeight + 100) + "px"
    );

    void texto.offsetWidth;
    texto.classList.add("rolando");

    if (musica && musica.paused) tocarMusica();
  }

  $("iniciar").addEventListener("click", iniciar);
  $("pausar").addEventListener("click", alternarPausa);
  $("pular").addEventListener("click", iniciarCreditos);
  $("repetir").addEventListener("click", iniciar);
  $("tentar-audio").addEventListener("click", tocarMusica);

  if (musica) {
    musica.addEventListener("error", () => {
      mensagem.textContent =
        "O navegador não conseguiu carregar musicas/temari.mp3.";
      aviso.classList.remove("escondido");
    });
  }

  window.addEventListener("pagehide", () => {
    if (musica) musica.pause();
    pararVideos();
  });
});
