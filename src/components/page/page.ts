import './page.scss';
import { renderGarage } from '../garage/garage';

export const renderPage = (): void => {
  const pageContent = `
  <header class="header">
      <h1 class="header-title">Async Race</h1>
    </header>
    <main class="main">
      <aside class="main__tools tools">
        <div class="tools__pages">
          <button type="button" class="btn tools__garage-btn">Garage</button>
          <button type="button" class="btn tools__winners-btn">Winners</button>
        </div>
        <div class="tools__forms">
          <h2>Change garage:</h2>
          <form class="form create-form" id="create-form">
            <input class="input" id="create-name" name="name" type="text" required />
            <input
              class="color"
              id="create-color"
              name="color"
              type="color"
              value="#ffffff"
            />
            <button class="btn form-btn" type="submit">Create</button>
          </form>
          <form class="form update-form" id="update-form">
            <input
              class="input"
              id="update-name"
              name="name"
              type="text"
              disabled
              required
            />
            <input
              class="color"
              id="update-color"
              name="color"
              type="color"
              value="#ffffff"
              disabled
            />
            <button class="btn form-btn" id="update-btn" type="submit" disabled >Update</button>
          </form>
        </div>
        <ul class="tools__control control">
          <li class="control__item" ><button class="btn race-btn" id="race">Race</button></li>
          <li class="control__item" ><button class="btn reset-btn" id="reset" disabled>Reset</button></li>
          <li class="control__item" ><button class="btn generate-btn" id="generate">Generate</button></li>
      </ul>
      </aside>
      <article class="main__feed garage">
        <div id="garage" class="garage__container">${renderGarage()}</div>
        <div class="garage__pagination">
          <button class="btn prev-button" id="prev" disabled>Prev Page</button>
          <button class="btn next-button" id="next" disabled>Next Page</button>
        </div>
      </article>
    </main>
    <footer class="footer">
         <div class="footer__link">
          <img src="./assets/github.svg" alt="GitHub" />
          <a href="https://github.com/Alexej-Ilyutik" target="_blank">
            Alexej Ilyutik
          </a>
        </div>
        <p>2022</p>
    </footer>
`;
  const app = document.createElement('div');
  app.innerHTML = pageContent;
  document.body.appendChild(app);
};
