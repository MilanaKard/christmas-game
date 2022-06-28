import Component from '../Component';
import Bauble from '../Bauble/Bauble';
import AppState from '../../common/AppState';
import './BaublesContainer.scss';

class BaublesContainer implements Component {
    state: AppState;
    constructor() {
        this.state = AppState.getInstance();
    }

    public async render() {
        const data = this.state.getFilteredData();
        let view = '';
        if (!data[0]) {
            return `<p>Игрушки, удовлетворяющие критериям поиска, не найдены.</p>`;
        }
        data.forEach((item) => {
            const isMarked = this.state.settings.marked.findIndex((el) => el.num === item.num) >= 0;
            const bauble = new Bauble({ ...item, isMarked });
            view += bauble.getView();
        });
        return view;
    }
    public async afterRender(): Promise<void> {
        return;
    }
}

export default BaublesContainer;
