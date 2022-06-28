import Component from '../Component';
import AppState from '../../common/AppState';
import ChristmasTree from '../ChristmasTree/ChristmasTree';
import './ChristmasTreeControls.scss';

interface ChristmasTreeControlsOptions {
    controlsContainer: HTMLDivElement;
    treeContainer: HTMLDivElement;
    audioButton: HTMLButtonElement;
}

class ChristmasTreeControls implements Component {
    private state: AppState;
    private tree: ChristmasTree;
    private controlsContainer: HTMLDivElement;
    private treeContainer: HTMLDivElement;
    private audioButton: HTMLButtonElement;
    private buttonsHandler = this.onButtonClick.bind(this);
    private snowHandler = this.onSnowClick.bind(this);
    private garlandHandler = this.garlandToggle.bind(this);
    constructor(options: ChristmasTreeControlsOptions) {
        this.state = AppState.getInstance();
        this.tree = new ChristmasTree();
        this.controlsContainer = options.controlsContainer;
        this.treeContainer = options.treeContainer;
        this.audioButton = options.audioButton;
    }
    public async render() {
        const view = `
          <div class="snow-audio-container menu-container" id="snow-audio-container">
            <button class="button snow-control" id="snow"></button>          
          </div>
          <div id="tree-container" class="tree-container menu-container">
            <div class="tree menu-item ${this.state.settings.tree === 1 ? 'active' : ''}" data-type="tree" data-value="1"></div>
            <div class="tree menu-item ${this.state.settings.tree === 2 ? 'active' : ''}" data-type="tree" data-value="2"></div>
            <div class="tree menu-item ${this.state.settings.tree === 3 ? 'active' : ''}" data-type="tree" data-value="3"></div>
            <div class="tree menu-item ${this.state.settings.tree === 4 ? 'active' : ''}" data-type="tree" data-value="4"></div>
            <div class="tree menu-item ${this.state.settings.tree === 5 ? 'active' : ''}" data-type="tree" data-value="5"></div>
            <div class="tree menu-item ${this.state.settings.tree === 6 ? 'active' : ''}" data-type="tree" data-value="6"></div>
          </div>
          <div id="bg-container" class="bg-container menu-container">
            <div class="bg menu-item ${this.state.settings.bg === 1 ? 'active' : ''}" data-type="bg" data-value="1"></div>
            <div class="bg menu-item ${this.state.settings.bg === 2 ? 'active' : ''}" data-type="bg" data-value="2"></div>
            <div class="bg menu-item ${this.state.settings.bg === 3 ? 'active' : ''}" data-type="bg" data-value="3"></div>
            <div class="bg menu-item ${this.state.settings.bg === 4 ? 'active' : ''}" data-type="bg" data-value="4"></div>
            <div class="bg menu-item ${this.state.settings.bg === 5 ? 'active' : ''}" data-type="bg" data-value="5"></div>
            <div class="bg menu-item ${this.state.settings.bg === 6 ? 'active' : ''}" data-type="bg" data-value="6"></div>
            <div class="bg menu-item ${this.state.settings.bg === 7 ? 'active' : ''}" data-type="bg" data-value="7"></div>
            <div class="bg menu-item ${this.state.settings.bg === 8 ? 'active' : ''}" data-type="bg" data-value="8"></div>
            <div class="bg menu-item ${this.state.settings.bg === 9 ? 'active' : ''}" data-type="bg" data-value="9"></div>
            <div class="bg menu-item ${this.state.settings.bg === 10 ? 'active' : ''}" data-type="bg" data-value="10"></div>
          </div>        
          <div id="garland-container" class="garland-container menu-container">          
            <div class="garland-btns">
              <button class="menu-item color-btn multicolor-btn ${
                  this.state.settings.garland === 'multicolor' && this.state.settings.isGarland ? 'active' : ''
              }" data-type="garland" data-value="multicolor"></button>
              <button class="menu-item color-btn red-btn ${
                  this.state.settings.garland === 'red' && this.state.settings.isGarland ? 'active' : ''
              }" data-type="garland" data-value="red"></button>
              <button class="menu-item color-btn blue-btn ${
                  this.state.settings.garland === 'blue' && this.state.settings.isGarland ? 'active' : ''
              }" data-type="garland" data-value="blue"></button>
              <button class="menu-item color-btn yellow-btn ${
                  this.state.settings.garland === 'yellow' && this.state.settings.isGarland ? 'active' : ''
              }" data-type="garland" data-value="yellow"></button>
              <button class="menu-item color-btn green-btn ${
                  this.state.settings.garland === 'green' && this.state.settings.isGarland ? 'active' : ''
              }" data-type="garland" data-value="green"></button>
            </div>
            <div class="onoffswitch">
              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">
              <label class="onoffswitch-label" for="myonoffswitch">
                  <div class="onoffswitch-inner"></div>
                  <div class="onoffswitch-switch"></div>
              </label>
            </div>
          </div>
    `;
        return view;
    }
    private onButtonClick(ev: MouseEvent) {
        const element = ev.target as HTMLElement;
        if (!element.classList.contains('menu-item')) return;
        const type = element.dataset.type as string;
        const value = element.dataset.value;
        const container = document.getElementById(`${type}-container`) as HTMLDivElement;
        switch (type) {
            case 'bg':
            case 'tree':
                container.children[this.state.settings[type] - 1].classList.remove('active');
                this.state.settings[type] = Number(value);
                this.tree.updateTree();
                break;
            case 'garland':
                this.deselectGarland();
                this.tree.removeGarland();
                this.state.settings[type] = value as string;
                this.tree.addGarland();
                this.state.settings.isGarland = true;
                (document.getElementById('myonoffswitch') as HTMLInputElement).checked = true;
                break;
        }
        element.classList.add('active');
        this.state.saveState();
    }

    private deselectGarland() {
        this.controlsContainer.querySelectorAll('.color-btn').forEach((button) => button.classList.remove('active'));
    }

    private onSnowClick() {
        this.state.settings.isSnow ? this.tree.removeSnow() : this.tree.createSnow();
        this.state.settings.isSnow = !this.state.settings.isSnow;
        this.state.saveState();
    }

    private garlandToggle() {
        const switcher = <HTMLInputElement>document.getElementById('myonoffswitch');
        if (this.state.settings.isGarland) {
            this.deselectGarland();
            this.tree.removeGarland();
        } else {
            this.tree.addGarland();
            const color = this.state.settings.garland;
            document.querySelector(`[data-value='${color}']`)?.classList.add('active');
        }
        switcher.checked = !this.state.settings.isGarland;
        this.state.settings.isGarland = !this.state.settings.isGarland;
        this.state.saveState();
    }

    public async afterRender(): Promise<void> {
        const audioContainer = <HTMLDivElement>document.getElementById('snow-audio-container');
        audioContainer.prepend(this.audioButton);
        this.tree.getTree(this.treeContainer);
        const snowButton = <HTMLButtonElement>document.getElementById('snow');
        const switcher = <HTMLInputElement>document.getElementById('myonoffswitch');
        if (this.state.settings.isGarland) switcher.checked = true;
        switcher.addEventListener('click', this.garlandHandler);
        this.controlsContainer.addEventListener('click', (ev: MouseEvent) => this.buttonsHandler(ev));
        snowButton.addEventListener('click', this.snowHandler);
    }
}

export default ChristmasTreeControls;
