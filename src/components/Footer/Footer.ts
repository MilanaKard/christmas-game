import Component from '../Component';
import './Footer.scss';

class Footer implements Component {
    public async render() {
        const view = `
    <p>
        <date>2021</date><a href="https://github.com/milanakard">MilanaKard</a>
    </p>
    `;
        return view;
    }
    public async afterRender(): Promise<void> {
        return;
    }
}

export default Footer;
