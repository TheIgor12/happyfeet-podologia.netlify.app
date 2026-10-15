/* Medição com consentimento (LGPD): o gtag.js só é carregado depois que o visitante aceita. */
(function () {
  var cfg = window.HF_CONFIG || {};
  var ids = [cfg.ga4Id, cfg.adsId].filter(Boolean);
  var KEY = "hf-consent";
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function load() {
    if (loaded || !ids.length) return;
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ids[0]);
    document.head.appendChild(s);
    gtag("js", new Date());
    ids.forEach(function (id) { gtag("config", id); });
  }

  window.HF = {
    enabled: ids.length > 0,
    consent: read,
    setConsent: function (v) {
      save(v);
      if (v === "granted") load();
      else if (loaded) location.reload();
    },
    track: function (name, isLead) {
      if (!loaded) return;
      gtag("event", isLead ? "generate_lead" : "click", { event_label: name });
      if (isLead && cfg.adsId && cfg.adsConversionLabel) {
        gtag("event", "conversion", { send_to: cfg.adsId + "/" + cfg.adsConversionLabel });
      }
    }
  };

  if (read() === "granted") load();
})();
