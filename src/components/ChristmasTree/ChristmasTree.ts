import AppState from '../../common/AppState';
import './ChristmasTree.scss';

class ChristmasTree {
    private state: AppState;
    private tree: HTMLImageElement;
    private container: HTMLDivElement;
    private garland: HTMLDivElement;
    private width: number;
    private timerId: NodeJS.Timeout | null = null;
    constructor() {
        this.state = AppState.getInstance();
        this.width = 800;
        this.tree = document.createElement('img');
        this.container = document.createElement('div');
        this.garland = document.createElement('div');
    }

    public getTree(container: HTMLDivElement) {
        this.tree.classList.add('main-tree');
        this.tree.alt = 'Christmas tree';
        this.tree.src = `assets/tree/${this.state.settings.tree}.png`;
        this.garland.classList.add('garland-tree-container');
        container.classList.add('main-tree-container');
        this.createGarland();
        this.state.settings.isGarland || this.garland.classList.add('hidden');
        const droppable1 = document.createElement('div');
        droppable1.classList.add('droppable', 'droppable1');
        const droppable2 = document.createElement('div');
        droppable2.classList.add('droppable', 'droppable2');
        const droppable3 = document.createElement('div');
        droppable3.classList.add('droppable', 'droppable3');
        container.append(this.garland, this.tree, droppable1, droppable2, droppable3);
        container.style.backgroundImage = `url(assets/bg/${this.state.settings.bg}.jpg)`;
        this.container = container;
        if (this.state.settings.isSnow) this.createSnow();
    }

    private getImageSrc(number: number, type: 'tree' | 'bg') {
        const extension = type === 'bg' ? 'jpg' : 'png';
        return `assets/${type}/${number}.${extension}`;
    }

    public updateTree() {
        const treeImageSrc = this.getImageSrc(this.state.settings.tree, 'tree');
        const bgImageSrc = `url(${this.getImageSrc(this.state.settings.bg, 'bg')})`;
        if (this.tree.src !== treeImageSrc) {
            this.tree.src = treeImageSrc;
        }
        if (this.container.style.backgroundImage !== bgImageSrc) {
            this.container.style.backgroundImage = bgImageSrc;
        }
    }

    public addGarland() {
        this.garland.classList.add(this.state.settings.garland);
        this.garland.classList.remove('hidden');
    }

    private createLightrope(initialNum: number, addNum: number, count: number, translate: number, ulNum: number): void {
        let j = initialNum;
        for (let i = 0; i < count; i++) {
            const li = document.createElement('li');
            li.style.transform = `rotate(${j}deg) translate(${translate}px) rotate(-${j}deg)`;
            this.garland.children[ulNum]?.append(li);
            j += addNum;
        }
    }

    private createGarland(): void {
        let j = 40;
        let current = 80;
        for (let i = 0; i < 8; i++) {
            const ul = document.createElement('ul');
            ul.classList.add('lightrope');
            current += j;
            ul.style.width = `${current}px`;
            ul.style.height = `${current}px`;
            this.garland.append(ul);
            if (i >= 4) {
                j += 5;
            } else {
                j += 10;
            }
        }
        this.createLightrope(65, 13, 5, 60, 0);
        this.createLightrope(60, 10, 7, 85, 1);
        this.createLightrope(60, 8, 8, 115, 2);
        this.createLightrope(60, 6, 11, 150, 3);
        this.createLightrope(55, 4, 18, 190, 4);
        this.createLightrope(55, 3.5, 21, 232.5, 5);
        this.createLightrope(58, 3, 24, 277.5, 6);
        this.createLightrope(58, 2.5, 29, 325, 7);
        this.garland.classList.add(this.state.settings.garland);
    }

    public removeGarland(): void {
        this.garland.classList.remove(this.state.settings.garland);
        this.garland.classList.add('hidden');
    }

    private createSnowflakes(): void {
        for (let i = 0; i < 5; i++) {
            const leftRandom: number = Math.floor(Math.random() * 2 * this.width - this.width);
            const sizeRandom: number = Math.floor(Math.random() * 11 + 10);
            const div: HTMLDivElement = document.createElement('div');
            div.style.width = `${sizeRandom}px`;
            div.style.height = `${sizeRandom}px`;
            div.classList.add('snow');
            div.style.left = leftRandom + 'px';
            this.container.append(div);
        }
    }

    public createSnow(): void {
        this.timerId = setInterval(this.createSnowflakes.bind(this), 1000);
        setTimeout(() => clearInterval(this.timerId as NodeJS.Timeout), 15000);
    }

    public removeSnow(): void {
        clearInterval(this.timerId as NodeJS.Timeout);
        const snow = <NodeListOf<HTMLElement>>document.querySelectorAll('.snow');
        snow.forEach((el: HTMLElement) => el.remove());
    }
}

export default ChristmasTree;
