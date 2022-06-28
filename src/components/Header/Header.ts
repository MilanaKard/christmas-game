import Component from '../Component';
import './Header.scss';
class Header implements Component {
    public async render() {
        const view = `
        <a href="#" class="button logo"></a>
        <a href="#baubles" class="button">Игрушки</a>
        <a href="#christmas-tree" class="button"">Ёлка</a>
        `;
        return view;
    }
    public async afterRender(): Promise<void> {
        return;
    }
}

export default Header;
