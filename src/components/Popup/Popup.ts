import './Popup.scss';
class Popup {
    private text: string;
    private popup: HTMLDivElement;
    private closePopupHandler = this.closePopup.bind(this);

    constructor(text: string) {
        this.text = text;
        this.popup = document.createElement('div');
    }

    public createPopup() {
        this.popup.classList.add('popup');
        this.popup.innerHTML = this.getPopup();
        this.popup.querySelector('.popup-close')?.addEventListener('click', this.closePopupHandler);
        this.popup.querySelector('.button')?.addEventListener('click', this.closePopupHandler);
        this.popup.addEventListener('click', (ev: MouseEvent) => {
            const el = <HTMLElement>ev.target;
            if (!el.closest('.popup-content')) {
                this.closePopup();
            }
        });
        document.body.append(this.popup);
    }

    private closePopup() {
        this.popup.classList.remove('active');
    }

    public showPopup() {
        this.popup.classList.add('active');
    }

    private getPopup() {
        return `       
        <div class="popup-body">
          <div class="popup-content">
            <p class="popup-text">${this.text}</p>
            <button class="button popup-button">Ок</button>
            <div class="popup-close"></div>
          </div>
        </div>`;
    }
}

export default Popup;
