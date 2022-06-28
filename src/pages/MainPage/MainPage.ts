import Page from '../Page';
import './MainPage.scss';

class MainPage extends Page {
    public async render() {
        const view = `
      <div class="main-container">
        <h1 class="main-title">Наряди елку</h1>
        <a class="button main-button" href="/#baubles">Начать</a>
        <div class="main-bauble-container big-bauble-container">
          <div class="thread"></div>
          <div class="main-bauble"></div>
        </div>
        <div class="main-bauble-container small-bauble-container">
          <div class="thread"></div>
          <div class="main-bauble"></div>
        </div>
      </div>
    `;
        return view;
    }
    public async afterRender() {
        return;
    }
}

export default MainPage;
