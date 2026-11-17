/*
 * Medição com Modo de Consentimento do Google (LGPD).
 * A tag do Google é carregada em todas as páginas, mas começa com tudo "negado":
 * sem cookies de anúncios ou de análise até o visitante clicar em "Aceitar".
 * Isso permite que o Google Ads detecte a tag e meça os cliques no WhatsApp
 * de forma anônima, respeitando a escolha do visitante.
 */
(function () {
  var cfg = window.HF_CONFIG || {};
  var gtagIds = [cfg.ga4Id, cfg.adsId].filter(Boolean);
  var KEY = "hf-consent";

  window.dataLayer = window.dataLayer || [];
  var gtag = window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function consentState(v) {
    var s = v === "granted" ? "granted" : "denied";
    return {
      ad_storage: s,
      ad_user_data: s,
      ad_personalization: s,
      analytics_storage: s
    };
  }

  // 1. Consentimento padrão: negado até o visitante aceitar
  var d = consentState("denied");
  d.wait_for_update = 500;
  gtag("consent", "default", d);
  gtag("set", "ads_data_redaction", true);
  if (read() === "granted") gtag("consent", "update", consentState("granted"));

  // 2. Tag do Google (contêiner GTM-...), indicada pelo próprio Google Ads
  if (cfg.gtmId) {
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(cfg.gtmId);
    document.head.appendChild(g);
  }

  // 3. IDs avulsos (GA4 "G-..." e Google Ads "AW-..."), se forem preenchidos
  if (gtagIds.length) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gtagIds[0]);
    document.head.appendChild(s);
    gtag("js", new Date());
    gtagIds.forEach(function (id) { gtag("config", id); });
  }

  window.HF = {
    enabled: Boolean(cfg.gtmId || gtagIds.length),
    consent: read,
    setConsent: function (v) {
      save(v);
      gtag("consent", "update", consentState(v));
    },
    track: function (name, isLead) {
      if (!window.HF.enabled) return;
      // Evento para o contêiner do Google (WhatsApp ou telefone = "contato_click")
      window.dataLayer.push({ event: isLead ? "contato_click" : "site_click", click_name: name });
      gtag("event", isLead ? "generate_lead" : "click", { event_label: name });
      if (isLead && cfg.adsId && cfg.adsConversionLabel) {
        gtag("event", "conversion", { send_to: cfg.adsId + "/" + cfg.adsConversionLabel });
      }
    }
  };
})();
