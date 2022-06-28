import './Bauble.scss';
interface BaubleOptions {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
    isMarked: boolean;
}

class Bauble {
    options: BaubleOptions;
    constructor(options: BaubleOptions) {
        this.options = options;
    }
    public getView() {
        const view = `
          <div class="bauble-container active" data-num="${this.options.num}">
            <h3>${this.options.name}</h3>
            <img class="bauble-img" src="/assets/toys/${this.options.num}.png" alt="${this.options.name}">
            <p>Количество: ${this.options.count}</p>
            <p>Год покупки: ${this.options.year}</p>
            <p>Форма игрушки: ${this.options.shape}</p>
            <p>Цвет игрушки: ${this.options.color}</p>
            <p>Размер игрушки: ${this.options.size}</p>
            <p>Любимая: ${this.options.favorite ? 'да' : 'нет'}</p>
            <div class="bookmark ${this.options.isMarked ? 'marked' : ''}"></div>
          </div>
    `;
        return view;
    }
}

export default Bauble;
