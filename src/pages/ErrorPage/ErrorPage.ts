import Page from '../Page';
import './ErrorPage.scss';

class Error extends Page {
    public async afterRender(): Promise<void> {
        return;
    }

    public async render() {
        const view = `
        <section class="section error">
            <h1>404 Ошибка</h1>
            <p>Страница не найдена</p>
        </section>
    `;
        return view;
    }
}

export default Error;
