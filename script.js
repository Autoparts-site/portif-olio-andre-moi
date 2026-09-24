/* ===== ANDRÉ MOI VEÍCULOS — scripts ===== */
(function () {
  'use strict';

  /* ---------- GALERIA ----------
     Para adicionar fotos: coloque o arquivo em /imagens e inclua uma linha aqui. */
  var FOTOS = [
    { src: 'imagens/fachada.jpg',  alt: 'Fachada da André Moi Veículos', legenda: 'Fachada' },
    { src: 'imagens/externa.jpg',  alt: 'Área externa da loja',          legenda: 'Área externa' },
    { src: 'imagens/veiculos.jpg', alt: 'Veículos da André Moi',         legenda: 'Veículos' },
    { src: 'imagens/detalhes.jpg', alt: 'Detalhes da loja',              legenda: 'Detalhes da loja' }
  ];

  var galeria = document.getElementById('galeria');
  var lightbox = document.getElementById('lightbox');
  var lbImg = lightbox.querySelector('img');

  function abrir(foto) {
    lbImg.src = foto.src; lbImg.alt = foto.alt;
    lightbox.hidden = false; document.body.style.overflow = 'hidden';
    lightbox.querySelector('button').focus();
  }
  function fechar() {
    lightbox.hidden = true; lbImg.src = ''; document.body.style.overflow = '';
  }

  FOTOS.forEach(function (foto) {
    var fig = document.createElement('figure');
    fig.className = 'reveal'; fig.tabIndex = 0;
    var img = new Image();
    img.loading = 'lazy'; img.alt = foto.alt; img.src = foto.src;
    var cap = document.createElement('figcaption'); cap.textContent = foto.legenda;
    fig.append(img, cap);
    /* Se a imagem ainda não existir na pasta, mostra um espaço reservado (sem erro) */
    img.onerror = function () {
      img.remove(); fig.classList.add('empty'); fig.style.cursor = 'default';
      fig.dataset.vazio = '1'; fig.insertAdjacentHTML('afterbegin', '<span class="empty">Adicione a foto em<br>' + foto.src + '</span>');
    };
    function clique() { if (!fig.dataset.vazio) abrir(foto); }
    fig.addEventListener('click', clique);
    fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); clique(); } });
    galeria.appendChild(fig);
  });

  lightbox.addEventListener('click', function (e) { if (e.target !== lbImg) fechar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { fechar(); fecharMenu(); } });

  /* ---------- LOGO (opcional) ---------- */
  var logo = document.querySelector('.brand__logo');
  var teste = new Image();
  teste.onload = function () { logo.src = teste.src; logo.hidden = false; };
  teste.src = 'imagens/logo.png';

  /* ---------- MENU MOBILE ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  function fecharMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var aberto = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', aberto);
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') fecharMenu(); });

  /* ---------- HEADER SÓLIDO AO ROLAR ---------- */
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function () { header.classList.toggle('solid', window.scrollY > 40); }, { passive: true });

  /* ---------- APARECER AO ROLAR ---------- */
  var itens = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    itens.forEach(function (el) { io.observe(el); });
  } else { itens.forEach(function (el) { el.classList.add('in'); }); }
})();
