import Page from '../Page';
import { MAX_MARKED } from '../../common/AppState';
import Drawer from '../../common/drawer/Drawer';
import FilterControls from '../../components/FilterControls/FilterControls';
import BaublesContainer from '../../components/BaublesContainer/BaublesContainer';
import './BaublesPage.scss';

class BaublesPage extends Page {
    private baubleClickHandler = this.onBaubleClick.bind(this);
    public async render() {
        const view = `
     <div class="baubles-page-container">   
    <button id="audio-control"></button>
    <div class="settings" id="settings">
    </div>
    <div>
    <h2 class="title">Игрушки</h2>
        <div class="baubles-container" id="baubles-container"> 
        </div>
        </div>
        </div>
    `;
        return view;
    }

    private async renderControls() {
        const audioButton = document.createElement('button');
        this.addAudio(audioButton);
        const controlsContainer = <HTMLDivElement>document.getElementById('settings');
        await Drawer.drawBlock(FilterControls, controlsContainer, {
            onChange: async () => {
                await this.renderBaubles();
            },
            onUpdate: async () => {
                await this.renderControls();
            },
            audioButton
        });
    }

    private async renderBaubles() {
        const baublesContainer = <HTMLDivElement>document.getElementById('baubles-container');
        await Drawer.drawBlock(BaublesContainer, baublesContainer, {});
    }

    private onBaubleClick(ev: MouseEvent) {
        const element = <HTMLDivElement>ev.target;
        const el = <HTMLElement>element.closest('.bauble-container');
        if (el) {
            if (this.state.settings.marked.length === MAX_MARKED && !el.lastElementChild?.classList.contains('marked')) {
                this.showPopup();
                return;
            }
            this.state.setMarkedByNum(el.dataset.num || '');
            el.lastElementChild?.classList.toggle('marked');
            FilterControls.changeMarkedValue(this.state.settings.marked.length);
        }
    }

    public async afterRender() {
        this.addPopup('Все 20 слотов заполнены.');
        const baublesContainer = <HTMLDivElement>document.getElementById('baubles-container');
        baublesContainer.addEventListener('click', (ev: MouseEvent) => this.baubleClickHandler(ev));
        this.state.filterData();
        this.renderControls();
        this.renderBaubles();
    }
}
export default BaublesPage;
