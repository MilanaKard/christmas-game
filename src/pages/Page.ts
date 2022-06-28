import Component from '../components/Component';
import AppState from '../common/AppState';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import Popup from '../components/Popup/Popup';

abstract class Page implements Component {
    abstract render(): Promise<string>;
    abstract afterRender(): Promise<void>;
    public state: AppState;
    private popup: Popup | null = null;
    constructor() {
        this.state = AppState.getInstance();
    }

    protected addAudio(audioContainer: HTMLButtonElement | HTMLDivElement) {
        const audio = new AudioPlayer(audioContainer);
        audio.init();
    }

    protected addPopup(text: string) {
        document.querySelector('.popup')?.remove();
        this.popup = new Popup(text);
        this.popup.createPopup();
    }

    protected showPopup() {
        if (this.popup) {
            this.popup.showPopup();
        }
    }
}

export default Page;
