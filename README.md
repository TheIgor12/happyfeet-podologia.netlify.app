# HappyFEET Podologia Clínica

Site estático da clínica, publicado na Netlify em https://clinicahappyfeet.com.br/

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Página principal |
| `unha-encravada.html`, `fungo-na-unha.html`, `verruga-plantar.html`, `podoprofilaxia.html`, `atendimento-infantil.html`, `cuidados-para-idosos.html` | Páginas de cada tratamento (use como página de destino dos anúncios) |
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

## Adicionar uma avaliação do Google

Em `index.html`, na seção `id="avaliacoes"`, copie um bloco `<li class="review">...</li>` e troque o nome (primeiro nome e inicial do sobrenome), o mês/ano e o texto. Use sempre o texto exato publicado no Google.

## Atualizar a nota e o total de avaliações

A nota (5,0) e o total (47) aparecem em dois lugares de `index.html`: no selo do topo (`hero-rating`) e no selo da seção de avaliações (`rating-badge`). Atualize os dois quando o número mudar no Google.

## Publicação

O projeto na Netlify está ligado a este repositório. Todo merge no `main` é publicado automaticamente em https://clinicahappyfeet.com.br/ em cerca de 1 a 2 minutos. Não é mais necessário arrastar arquivos para a Netlify.
