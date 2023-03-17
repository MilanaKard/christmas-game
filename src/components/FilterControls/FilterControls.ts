import Component from '../Component';
import AppState from '../../common/AppState';
import './FilterControls.scss';
import * as noUiSlider from 'nouislider';
import '../../../node_modules/nouislider/dist/nouislider.css';

interface FilterControlsOptions {
    onChange(): void;
    onUpdate(): void;
    audioButton: HTMLButtonElement;
}

class FilterControls implements Component {
    private state: AppState;
    private options: FilterControlsOptions;
    private resetFiltersHandler = this.resetFilters.bind(this);
    private resetSettingsHandler = this.resetSettings.bind(this);
    private buttonsHandler = this.onButtonClick.bind(this);
    private searchHandler = this.onSearch.bind(this);
    private sortHandler = this.onSort.bind(this);
    private sliderHandler = this.onSliderChange.bind(this);
    private checkboxHandler = this.onCheckboxChange.bind(this);
    private audioButton: HTMLButtonElement;

    constructor(options: FilterControlsOptions) {
        this.options = options;
        this.state = AppState.getInstance();
        this.audioButton = options.audioButton;  
    }

    private onSliderChange(values: (string | number)[], type: string) {
        const sliderValues = values.map((value) => Math.round(Number(value)));
        this.state.settings[type] = sliderValues as number[];
        const startSliderOutput = <HTMLOutputElement>document.getElementById(`${type}-start`);
        const endSliderOutput = <HTMLOutputElement>document.getElementById(`${type}-end`);
        startSliderOutput.textContent = sliderValues[0].toString();
        endSliderOutput.textContent = sliderValues[1].toString();
        this.state.filterData();
        this.options.onChange();
    }

    private resetFilters() {
        this.state.resetFilters();
        this.options.onChange();
        this.options.onUpdate();
    }
    private onCheckboxChange() {
        this.state.settings.isFavorite = !this.state.settings.isFavorite;
        this.state.filterData();
        this.options.onChange();
    }
    private resetSettings() {
        this.state.resetSettings();
        this.options.onChange();
        this.options.onUpdate();
    }
    private onSearch(value: string) {
        this.state.setSearchValue(value);
        this.options.onChange();
    }
    private onButtonClick(ev: MouseEvent, btnType: 'color' | 'size' | 'shape') {
        const btn = <HTMLElement>ev.target;
        if (btn.tagName !== 'BUTTON') {
            return;
        }
        const value = <string>btn.dataset[btnType];
        this.state.setFilter(btnType, value);
        btn.classList.toggle('active');
        this.options.onChange();
    }

    private onSort(value: 'sort-name-asc' | 'sort-name-desc') {
        this.state.setSort(value);
        this.options.onChange();
    }

    static changeMarkedValue(number: number) {
        const markedContainer = <HTMLSpanElement>document.getElementById('marked');
        markedContainer.textContent = number.toString();
    }

    public async render() {
        const view = `
          <div class="header-settings" id="search-audio-container">
            <button id="audio-control"></button>
            <input class="search" autocomplete="off" onfocus="(this.type='search')"
            onblur="(this.type='text')"
            placeholder="Поиск" value="${this.state.settings.search}">
            <div class="select"><span id="marked">${this.state.settings.marked.length}</span></div>
         </div>
        <div class="sort">
          <h3 class="settings-title">Сортировать</h3>
          <select class="sort-select" value="${this.state.settings.sort}">
            <option selected value="sort-name-asc">По названию от «А» до «Я»</option>
            <option value="sort-name-desc">По названию от «Я» до «А»</option>
            <option value="sort-year-asc">По году покупки по возрастанию</option>
            <option value="sort-year-desc">По году покупки по убыванию</option>
          </select>
          </div>
          <div class="filters">
          <h3 class="settings-title">Категории</h3>
          <p class="settings-text">Форма</p>
          <div class="shape">
            <button class="${this.state.settings.shape.includes('шар') ? 'active' : ''}" data-shape="шар"></button>
            <button class="${this.state.settings.shape.includes('колокольчик') ? 'active' : ''}" data-shape="колокольчик"></button>
            <button class="${this.state.settings.shape.includes('шишка') ? 'active' : ''}" data-shape="шишка"></button>
            <button class="${this.state.settings.shape.includes('снежинка') ? 'active' : ''}" data-shape="снежинка"></button>
            <button class="${this.state.settings.shape.includes('фигурка') ? 'active' : ''}" data-shape="фигурка"></button>
          </div>
      <div class="range">
          <p class="settings-text">Количество экземпляров</p> 
            <div class="slider-container">       
              <div class="slider count-slider"></div>
              <div class="output-container">
              <output class="slider-output" id="count-start">${this.state.settings.count[0].toFixed(0)}</output>
              <output class="slider-output" id="count-end">${this.state.settings.count[1].toFixed(0)}</output>
              </div>
            </div>          
          <p class="settings-text">Год приобретения</p> 
            <div class="slider-container"> 
              <div class="slider year-slider"></div>
              <div class="output-container">
              <output class="slider-output" id="year-start">${this.state.settings.year[0]}</output>
              <output class="slider-output" id="year-end">${this.state.settings.year[1]}</output>
              </div>
            </div>          
          <p class="settings-text">Цвет</p>
          <div class="color">  
            <button class="${this.state.settings.color.includes('белый') ? 'active' : ''}" data-color="белый"></button>
            <button class="${this.state.settings.color.includes('желтый') ? 'active' : ''}" data-color="желтый"></button>
            <button class="${this.state.settings.color.includes('красный') ? 'active' : ''}" data-color="красный"></button>
            <button class="${this.state.settings.color.includes('синий') ? 'active' : ''}" data-color="синий"></button>
            <button class="${this.state.settings.color.includes('зелёный') ? 'active' : ''}" data-color="зелёный"></button>
          </div>
          <p class="settings-text">Размер</p>
          <div class="size">
            <button class="${this.state.settings.size.includes('большой') ? 'active' : ''}" data-size="большой"></button>
            <button class="${this.state.settings.size.includes('средний') ? 'active' : ''}" data-size="средний"></button>
            <button class="${this.state.settings.size.includes('малый') ? 'active' : ''}" data-size="малый"></button>
          </div>
          <div class="favorite-container">
            <div class="form-group">
              <input type="checkbox" class="favorite-input" id="checkbox" />
              <label for="checkbox" class="favorite-input-label"></label>
              <p class="settings-text">Только любимые</p>
            </div>   
          </div>   
        </div>
        <div class="bauble-buttons-container">
            <button class="button bauble-button reset-filters">Сброс фильтров</button>
          <button class="button bauble-button reset-settings">Сброс настроек</button>
          </div>
        </div>
      </div>
    `;
        return view;
    }

    public async afterRender(): Promise<void> {
        const search = <HTMLInputElement>document.querySelector('.search');
        const sort = <HTMLSelectElement>document.querySelector('.sort-select');
        const shapeContainer = <HTMLDivElement>document.querySelector('.shape');
        const colorContainer = <HTMLDivElement>document.querySelector('.color');
        const sizeContainer = <HTMLDivElement>document.querySelector('.size');
        const isFavorite = <HTMLInputElement>document.querySelector('.favorite-input');
        const resetSettings = <HTMLButtonElement>document.querySelector('.reset-settings');
        const resetFilters = <HTMLButtonElement>document.querySelector('.reset-filters');
        const count = <noUiSlider.target>document.querySelector('.count-slider');
        const year = <noUiSlider.target>document.querySelector('.year-slider');
        const headerSettings = <HTMLDivElement>document.getElementById('search-audio-container');
        headerSettings.prepend(this.audioButton);

        noUiSlider.create(count, {
            start: this.state.settings.count,
            connect: true,
            range: {
                min: 1,
                max: 12,
            },
        });
        noUiSlider.create(year, {
            start: this.state.settings.year,
            connect: true,
            range: {
                min: 1940,
                max: 2021,
            },
        });

        count.noUiSlider?.on('update', (values: (string | number)[]) => this.sliderHandler(values, 'count'));
        year.noUiSlider?.on('update', (values: (string | number)[]) => this.sliderHandler(values, 'year'));

        search.focus();

        isFavorite.checked = this.state.settings.isFavorite;

        resetFilters.addEventListener('click', this.resetFiltersHandler);
        resetSettings.addEventListener('click', this.resetSettingsHandler);
        colorContainer.addEventListener('click', (ev: MouseEvent) => this.buttonsHandler(ev, 'color'));
        shapeContainer.addEventListener('click', (ev: MouseEvent) => this.buttonsHandler(ev, 'shape'));
        sizeContainer.addEventListener('click', (ev: MouseEvent) => this.buttonsHandler(ev, 'size'));
        search.addEventListener('keyup', () => this.searchHandler(search.value));
        isFavorite.addEventListener('click', this.checkboxHandler);
        sort.addEventListener('change', () => this.sortHandler(sort.value as 'sort-name-asc' | 'sort-name-desc'));
    }
}

export default FilterControls;
