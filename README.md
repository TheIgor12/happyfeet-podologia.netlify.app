# HappyFEET Podologia Clínica

Site estático da clínica, publicado na Netlify em https://happyfeet-podologia.netlify.app/

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Página principal |
| `privacidade.html` | Política de Privacidade (LGPD) |
| `404.html` | Página de erro |
| `styles.css` | Estilos de todas as páginas |
| `main.js` | Menu móvel, links do WhatsApp, copiar endereço, horário do dia, aviso de cookies |
| `config.js` | IDs do Google Analytics 4 e Google Ads |
| `analytics.js` | Carrega a medição somente após o consentimento do visitante |
| `netlify.toml` | Cabeçalhos de segurança e cache |
| `sitemap.xml`, `robots.txt`, `site.webmanifest` | SEO e ícones |

## Ativar Google Analytics 4 e conversões do Google Ads

1. Preencha `config.js` com `ga4Id`, `adsId` e `adsConversionLabel`.
2. No Google Ads, crie uma conversão do tipo "Website", categoria "Contato", e copie o rótulo (a parte depois da barra em `AW-123456789/AbCdEf`).
3. Cada clique em WhatsApp ou telefone gera o evento `generate_lead` no GA4 e a conversão no Ads.
4. Com os IDs preenchidos, o aviso de cookies passa a aparecer automaticamente.

## Imagens

- Use nomes em minúsculas, sem espaços, acentos ou parênteses (ex.: `unha-encravada.webp`). O servidor diferencia maiúsculas de minúsculas.
- Prefira WebP com no máximo 720 px de largura.

## Alterar o número do WhatsApp

O número aparece em `main.js` (constante `WA`), nos `href` de `index.html` e `privacidade.html` e no JSON-LD de `index.html`.
