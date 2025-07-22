# O Que o Sol Faz com as Flores

Um site interativo e poético que celebra os pequenos momentos especiais do dia a dia.

## 🌻 Sobre o Projeto

"O Que o Sol Faz com as Flores" é um site que combina arte, tecnologia e poesia para criar uma experiência única. Cada dia é uma aventura especial, e este site captura essa essência através de:

- **Galeria Dinâmica**: Fotos que contam histórias de momentos únicos
- **Desenho Interativo**: Um jardim virtual onde você pode plantar flores
- **Música Ambiente**: Sons relaxantes para acompanhar sua experiência
- **Playlist Afetiva**: Músicas selecionadas para tocar o coração

## 🚀 Funcionalidades

### Galeria de Momentos
- Carregamento dinâmico de imagens
- Modal para visualização ampliada
- Legendas personalizadas para cada foto
- Design responsivo

### Desenho Interativo (p5.js)
- Clique para plantar flores virtuais
- Animações suaves de crescimento
- Partículas flutuantes
- Interação com o mouse

### Música Ambiente
- Player customizado com controles intuitivos
- Música lo-fi relaxante
- Controle de volume
- Reprodução automática (respeitando políticas do navegador)

### Playlist do Amazon Music
- Integração com Amazon Music
- Playlist afetiva selecionada
- Player embarcado

## 📁 Estrutura do Projeto

```
/
├── index.html          # Página principal
├── styles.css          # Estilos e design responsivo
├── gallery.js          # Script da galeria dinâmica
├── drawing.js          # Desenho interativo com p5.js
├── music.js            # Controle da música ambiente
├── assets/
│   ├── images/         # Imagens da galeria
│   │   ├── placeholder_1.png
│   │   ├── placeholder_2.png
│   │   ├── placeholder_3.png
│   │   └── dia*.jpg    # Suas fotos diárias
│   └── music/
│       └── ambient.mp3 # Música ambiente
└── README.md           # Este arquivo
```

## 🖼️ Como Adicionar Novas Fotos

1. **Nomeação**: Use o padrão `dia1.jpg`, `dia2.jpg`, etc.
2. **Localização**: Coloque as imagens na pasta `assets/images/`
3. **Formatos**: Suporta JPG, PNG, GIF e WebP
4. **Atualização**: O site detecta automaticamente novas imagens

### Exemplo:
```
assets/images/
├── dia1.jpg    # Primeira aventura
├── dia2.jpg    # Segunda aventura
├── dia3.jpg    # Terceira aventura
└── ...
```

## 🎵 Personalizando a Música

### Música Ambiente
- Substitua o arquivo `assets/music/ambient.mp3`
- Mantenha o nome do arquivo para compatibilidade
- Recomendado: músicas instrumentais ou lo-fi

### Playlist do Amazon Music
- Edite o iframe no `index.html`
- Substitua o ID da playlist na URL do embed

## 🎨 Personalização

### Cores
As cores principais estão definidas no CSS:
- `#d4a574` - Dourado principal
- `#8b6f47` - Marrom escuro
- `#ffecd2` - Bege claro
- `#fcb69f` - Pêssego

### Fontes
- Título: Georgia (serif)
- Corpo: Georgia (serif)

### Layout
O design é totalmente responsivo e se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo e animações
- **JavaScript**: Interatividade e funcionalidades
- **p5.js**: Desenho interativo
- **Amazon Music**: Integração de playlist

## 🌐 Deploy

### GitHub Pages
1. Faça upload dos arquivos para um repositório GitHub
2. Ative o GitHub Pages nas configurações
3. Seu site estará disponível em `https://seuusuario.github.io/nome-do-repo`

### Servidor Local
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 🎯 Próximas Funcionalidades

- [ ] Sistema de comentários nas fotos
- [ ] Modo escuro/claro
- [ ] Compartilhamento social
- [ ] Galeria em slideshow
- [ ] Mais opções de desenho interativo

## 💝 Inspiração

Este projeto nasceu da ideia de que cada dia traz uma aventura especial, por menor que seja. Como o sol faz as flores crescerem, os pequenos momentos fazem nossa vida florescer.

---

*"Cada dia é uma aventura especial"* ✨

