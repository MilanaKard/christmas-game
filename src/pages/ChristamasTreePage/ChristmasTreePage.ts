import Page from '../Page';
import ChristmasTreeControls from '../../components/ChristmasTreeControls/ChristmasTreeControls';
import MarkedBaubles from '../../components/MarkedBaubles/MarkedBaubles';
import Drawer from '../../common/drawer/Drawer';
import './ChristmasTreePage.scss';

class ChristmasTreePage extends Page {
    public async render() {
        const view = `   
        <div class="page-container">
          <div id="controls" class="favorites-menu"></div>
          <div id="tree"></div>
          <div class="favorites-aside" id="marked-container"></div>
        </div>         
        `;

        return view;
    }

    public async afterRender() {
        const audioButton = document.createElement('button');
        this.addAudio(audioButton);
        const controlsContainer = <HTMLDivElement>document.getElementById('controls');
        const treeContainer = <HTMLDivElement>document.getElementById('tree');
        const markedContainer = <HTMLDivElement>document.getElementById('marked-container');
        Drawer.drawBlock(ChristmasTreeControls, controlsContainer, { controlsContainer, treeContainer, audioButton });
        Drawer.drawBlock(MarkedBaubles, markedContainer, {});
    }
}

export default ChristmasTreePage;
