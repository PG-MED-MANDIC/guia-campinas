# Guia Campinas · São Leopoldo Mandic

E-book interativo para os alunos: shoppings, hotéis perto da faculdade, passeios, cultura e restaurantes em Campinas, com botões para o Google Maps, o Instagram e o site de cada lugar.

É um **site estático**: só HTML, CSS e JavaScript, sem servidor, banco de dados nem login. Funciona em qualquer hospedagem de arquivos estáticos.

## Estrutura

```
index.html            página principal (só marcação)
servidor.bat          abre um servidor local em http://localhost:8080
css/
  main.css            ponto de entrada (importa todos os demais)
  base/               variáveis/temas, reset, ícones
  layout/             container (.wrap)
  components/         topbar, capa, cards, mapa, rodapé, galeria, gaveta...
  utilities/          animações
  responsive.css      media queries
  print.css           impressão
js/
  main.js             ponto de entrada: monta a página e liga os módulos
  data/               conteúdo: chapters.js, places.js, links.js
  ui/                 icons.js e render.js (geração do HTML)
  modules/            favorites, filters, lightbox, drawer, theme, scroll
  utils/              dom.js e urls.js
img/                  fotos dos lugares e logo
```

## Publicar no GitHub Pages

1. Entre em github.com e crie um repositório novo (por exemplo, `guia-campinas`). No plano gratuito, ele precisa ser **público** para usar o Pages.
2. Na página do repositório, clique em **Add file → Upload files** e arraste **o conteúdo** desta pasta: `index.html`, `README.md` e as pastas `css`, `js` e `img`. Depois clique em **Commit changes**.
   - O `index.html` precisa ficar na raiz do repositório, e não dentro de uma subpasta.
3. Vá em **Settings → Pages**. Em *Build and deployment*, escolha **Deploy from a branch**, a branch **main** e a pasta **/(root)**, e clique em **Save**.
4. Em 1 a 2 minutos aparece o link, no formato `https://SEU-USUARIO.github.io/guia-campinas/`. Esse é o link para enviar aos alunos.

## Atualizar o conteúdo

Tudo o que é texto fica em `js/data/`:

- **CHAPTERS** (`chapters.js`): os capítulos (título, descrição, foto do sumário).
- **PLACES** (`places.js`): cada lugar, com nome, descrição, detalhes (`facts`), dica (`tip`) e fotos (`imgs`, nomes dos arquivos em `img/` sem o `.jpg`). Um lugar com `imgs: []` usa a capa ilustrada.
- **LINKS** (`links.js`): endereço (`addr`), Instagram (`ig`, sem o @), site (`site`) e o texto de busca do Maps (`maps`). O `id` do lugar precisa ser igual nos dois objetos.

Para editar no GitHub, abra o arquivo, clique no lápis, faça a alteração e clique em **Commit changes**. O site atualiza sozinho em cerca de 1 minuto.

**Para incluir uma foto nova:** envie o arquivo `.jpg` para a pasta `img/` e coloque o nome dele, sem o `.jpg`, em `imgs` no lugar correspondente.

## Testar no computador

Como o JavaScript usa módulos, não funciona abrindo o `index.html` direto (file://). Dê dois cliques em `servidor.bat` (precisa do Python) ou rode `python -m http.server 8080` na pasta e abra http://localhost:8080. Para ver as fontes, é preciso internet (Google Fonts).

## Observações

- Horários, preços e endereços podem mudar. Revise o conteúdo de tempos em tempos.
- O site usa a marca São Leopoldo Mandic e fotos de divulgação dos lugares. Confirme o uso com o Marketing antes de divulgar.
- "Meu roteiro" e o tema escolhido ficam salvos só no navegador de cada aluno (localStorage). Nenhum dado é enviado a lugar algum.
