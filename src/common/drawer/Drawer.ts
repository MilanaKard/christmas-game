import Component from '../../components/Component';
import Page from '../../pages/Page';
import './Drawer.scss';

class Drawer {
    static loader = '<div class="loader"></div>';

    static async drawBlock<T>(blockClass: new (options: T) => Component, container: HTMLElement, options: T) {
        const block: Component = new blockClass(options);
        container.innerHTML = await block.render();
        await block.afterRender();
    }

    static async drawPage(page: new () => Page) {
        const container: HTMLElement = document.getElementById('main') as HTMLElement;
        container.innerHTML = this.loader;
        this.drawBlock(page, container, {});
    }
}

export default Drawer;
