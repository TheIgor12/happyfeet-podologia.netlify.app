document.documentElement.classList.add("js");

(function () {
  var WA = "https://wa.me/554788604551";
  var DEFAULT_MSG = "Olá! Gostaria de agendar uma avaliação na HappyFEET.";

  // Links do WhatsApp com mensagem pronta (específica por serviço quando houver)
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = WA + "?text=" + encodeURIComponent(a.getAttribute("data-wa") || DEFAULT_MSG);
  });

  // Menu móvel
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  // Copiar endereço com confirmação
  var status = document.querySelector(".copy-status");
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function (ok) {
        if (!status) return;
        status.textContent = ok ? "Endereço copiado." : "Não foi possível copiar. Endereço: " + text;
        clearTimeout(btn._t);
        btn._t = setTimeout(function () { status.textContent = ""; }, 4000);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  });

  // Destaca o dia de hoje na tabela de horários (fuso de Jaraguá do Sul)
  var day;
  try {
    var wd = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/Sao_Paulo" }).format(new Date());
    day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  } catch (e) { day = new Date().getDay(); }
  document.querySelectorAll(".hours tr[data-days]").forEach(function (tr) {
    if (tr.getAttribute("data-days").split(",").indexOf(String(day)) > -1) tr.classList.add("today");
  });

  // Carrossel de avaliações
  var track = document.querySelector(".reviews");
  if (track) {
    var prev = document.querySelector(".carousel-btn.prev");
    var next = document.querySelector(".carousel-btn.next");
    var stepSize = function () {
      var item = track.querySelector(".review");
      return item ? item.getBoundingClientRect().width + 24 : track.clientWidth;
    };
    var update = function () {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener("click", function () { track.scrollBy({ left: -stepSize() }); });
    next.addEventListener("click", function () { track.scrollBy({ left: stepSize() }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Animação de entrada das seções
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // Ano do rodapé
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Medição de cliques (WhatsApp e telefone contam como contato)
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el || !window.HF) return;
    var name = el.getAttribute("data-track");
    window.HF.track(name, /^(whatsapp|telefone)/.test(name));
  });

  // Aviso de cookies (só aparece se houver medição configurada)
  var banner = document.querySelector(".consent");
  var prefs = document.querySelector("[data-open-consent]");
  if (banner && window.HF && window.HF.enabled) {
    var show = function (v) {
      banner.hidden = !v;
      document.body.classList.toggle("consent-open", v);
    };
    if (!window.HF.consent()) show(true);
    banner.addEventListener("click", function (e) {
      var b = e.target.closest("[data-consent]");
      if (!b) return;
      window.HF.setConsent(b.getAttribute("data-consent"));
      show(false);
    });
    if (prefs) {
      prefs.hidden = false;
      prefs.addEventListener("click", function () { show(true); });
    }
  }
})();
