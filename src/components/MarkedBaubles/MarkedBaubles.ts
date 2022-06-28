import Component from '../Component';
import AppState from '../../common/AppState';
import './MarkedBaubles.scss';

class MarkedBaubles implements Component {
    private state: AppState;
    private removeBaublesHandler = this.removeBaubles.bind(this);
    private mouseDownHandler = this.onMouseDown.bind(this);
    constructor() {
        this.state = AppState.getInstance();
    }

    public async render() {
        const view = `
          <div id="marked-cards-container" class="favorites-container">${this.getMarkedCards()}</div> 
    `;
        return view;
    }
    private removeBaubles(): void {
        const images = <NodeListOf<HTMLImageElement>>document.querySelectorAll('.favorites-card-img');
        images.forEach((el: HTMLImageElement) => {
            if (el.style.position === 'absolute') el.remove();
        });
    }

    private getMarkedCards(): string {
        const markedCards = this.state.getMarked();
        let view = '';
        markedCards.forEach(
            (card) =>
                (view += `
            <div class="favorites-card" data-num="${card.num}">
                   <p class="favorites-count" data-count="${card.count}">${card.count}</p> 
                  <img class="favorites-card-img" src="assets/toys/${card.num}.png" data-num="${card.num}" alt="bauble"></div>
                `)
        );
        return view;
    }

    private onMouseDown(ev: MouseEvent): void {
        const element = <HTMLImageElement>ev.target;
        if (element.tagName !== 'IMG') {
            return;
        }

        function createImg(): void {
            const container = <HTMLDivElement>document.querySelector(`.favorites-card[data-num="${element.dataset.num}"]`);
            const img: HTMLImageElement = document.createElement('img');
            img.src = element.src;
            img.classList.add('favorites-card-img');
            img.setAttribute('data-num', `${element.dataset.num}`);
            img.onload = () => {
                container?.append(img);
            };
        }

        element.addEventListener('dragstart', (event: DragEvent) => {
            event.preventDefault();

            const shiftX: number = event.clientX - element.getBoundingClientRect().left;
            const shiftY: number = event.clientY - element.getBoundingClientRect().top;

            if (element.style.position !== 'absolute') {
                const container = <HTMLElement>element.parentElement;
                const counter = <HTMLElement>element.previousElementSibling;
                const count = Number(counter.dataset.count);
                counter.dataset.count = `${count - 1}`;
                counter.innerHTML = `${count - 1}`;
                element.style.position = 'absolute';
                element.style.zIndex = '1000';
                document.body.append(element);
                if (container.children.length < 2 && count > 1) {
                    createImg();
                }
            }

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX: number, pageY: number): void {
                element.style.left = pageX - shiftX + 'px';
                element.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event: MouseEvent): void {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            element.addEventListener(
                'mouseup',
                (event: MouseEvent) => {
                    element.style.display = 'none';
                    const elemBelow = <HTMLElement>document.elementFromPoint(event.clientX, event.clientY);
                    element.style.display = 'block';
                    const droppableBelow = <HTMLElement>elemBelow.closest('.droppable');
                    if (!droppableBelow) {
                        const container = <HTMLElement>document.querySelector(`.favorites-card[data-num="${element.dataset.num}"]`);
                        element.remove();
                        const counter = <HTMLElement>container.firstElementChild;
                        const count = Number(counter.dataset.count);
                        counter.dataset.count = `${count + 1}`;
                        counter.innerHTML = `${count + 1}`;
                        if (container.children.length < 2 && count >= 0) {
                            createImg();
                        }
                    }
                    document.removeEventListener('mousemove', onMouseMove);
                },
                { once: true }
            );
        });
    }

    public async afterRender(): Promise<void> {
        const markedContainer = document.getElementById('marked-cards-container');
        markedContainer?.addEventListener('mousedown', (ev: MouseEvent) => this.mouseDownHandler(ev));
        window.addEventListener('hashchange', this.removeBaublesHandler, { once: true });
    }
}

export default MarkedBaubles;
