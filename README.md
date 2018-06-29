<div align="center">
<h2>Реакт драг-энд-дроп интерфейс</h2>
  <a href="https://reactjs.org/">
    <img width="100" heigth="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png">
  </a>
  <br>
  <br>
  </div>
<h3 align="center">Быстрая ссылка</h3>

Здесь ссылка на продакшн билд (index.html, bundle.js, bundle.css) - [Google Drive](https://drive.google.com/open?id=1E-m1lbb8KC0DgaJFmBQ8KEBiBa66Dea7). 

<h3 align="center">Описание</h3>

Выполнено на стеке React+SASS. Бойлерплейт - [create-react-app](https://github.com/facebook/create-react-app). Интерфейс использует внешний стейт(точнее два стейта: для данных и для UI, в отдельных файлах), работа с ним происходит с помощью маленькой библиотеки (<3кБ) [react-contextual](https://github.com/drcmda/react-contextual) на основе Context API. Сам драг-энд-дроп интерфейс реализован через библиотеку [react-spring](https://github.com/drcmda/react-spring), без использования нативных API (droppable и т.д.), поэтому работает на мобильных устройствах.

<h3 align="center">Как запустить</h3>

* Клонировать репозиторий

* Перейти в консоли в папку с проектом

* Установить зависимости:

```bash
npm i
```
* Запустить:

```bash
npm start```

* Сделать production билд:

```bash
npm run build
```
