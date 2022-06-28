import Drawer from '../common/drawer/Drawer';
import Page from '../pages/Page';
import Error from '../pages/ErrorPage/ErrorPage';
import Main from '../pages/MainPage/MainPage';
import Baubles from '../pages/BaublesPage/BaublesPage';
import ChristmasTree from '../pages/ChristamasTreePage/ChristmasTreePage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const routes: Record<string, new () => Page> = {
    '/': Main,
    baubles: Baubles,
    'christmas-tree': ChristmasTree,
};

class Router {
    private headerContainer: HTMLElement;
    private footerContainer: HTMLElement;

    constructor() {
        this.headerContainer = document.getElementById('header') as HTMLElement;
        this.footerContainer = document.getElementById('footer') as HTMLElement;
    }

    private async router(): Promise<void> {
        const hash = window.location.hash;
        const index = hash.lastIndexOf('#');
        const url = index !== -1 ? window.location.hash.slice(index + 1).toLowerCase() : '/';
        const page: new () => Page = routes[url] ? routes[url] : Error;
        await Drawer.drawPage(page);
    }

    private async renderHeaderAndFooter(): Promise<void> {
        await Drawer.drawBlock(Header, this.headerContainer, {});
        await Drawer.drawBlock(Footer, this.footerContainer, {});
    }

    public init(): void {
        this.renderHeaderAndFooter();
        this.router();
        window.addEventListener('hashchange', this.router);
    }
}

export default Router;
