import './AudioPlayer.scss';
class AudioPlayer {
    private audio: HTMLAudioElement;
    private container: HTMLDivElement | HTMLButtonElement;
    private isAudioPlaying: boolean;
    private audioHandler = this.toggleAudio.bind(this);
    constructor(container: HTMLDivElement | HTMLButtonElement) {
        this.container = container;
        this.audio = <HTMLAudioElement>new Audio();
        this.isAudioPlaying = false;
    }

    private toggleAudio(): void {
        if (this.isAudioPlaying) {
            this.audio.pause();
            this.isAudioPlaying = false;
        } else {
            this.audio.play();
            this.isAudioPlaying = true;
        }
        this.container.classList.toggle('mute');
    }

    public init() {
        this.container.classList.add('button', 'sound', 'mute');
        this.audio.src = './assets/audio/audio.mp3';
        this.container.addEventListener('click', this.audioHandler);
        this.audio.addEventListener('ended', () => {
            this.audioHandler();
        });
        window.addEventListener(
            'hashchange',
            () => {
                this.audio.pause();
            },
            { once: true }
        );
    }
}

export default AudioPlayer;
