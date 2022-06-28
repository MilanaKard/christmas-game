/* eslint-disable no-case-declarations */
import data from './data';
export interface ISettings {
    [index: string]: string | number | boolean | number[] | string[] | DataType[] | undefined;
    sort: string;
    shape: string[];
    count: number[];
    year: number[];
    color: string[];
    size: string[];
    isFavorite: boolean;
    marked: DataType[];
    search: string;
    tree: number;
    bg: number;
    isSnow: boolean;
    isSound: boolean;
    isGarland: boolean;
    garland: string;
}

export type DataType = {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
};

export type Filters = 'shape' | 'count' | 'year' | 'color' | 'size' | 'isFavorite';

export const defaultSettings: ISettings = {
    sort: 'sort-name-asc',
    shape: [],
    count: [1, 12],
    year: [1940, 2021],
    color: [],
    size: [],
    isFavorite: false,
    marked: [],
    search: '',
    tree: 1,
    bg: 1,
    isSnow: false,
    isGarland: false,
    isSound: false,
    garland: 'multicolor',
};

export const MAX_MARKED = 20;

class AppState {
    public settings: ISettings;
    public filteredData: DataType[];
    constructor() {
        this.settings = localStorage.getItem('christmas-game-settings') ? JSON.parse(localStorage.getItem('christmas-game-settings') as string) : { ...defaultSettings };
        this.filteredData = [];
    }
    static instance: AppState;

    public setFilter(filter: Filters, value: string | boolean | number[]) {
        switch (filter) {
            case 'shape':
            case 'color':
            case 'size':
                const index = this.settings[filter].indexOf(value as string);
                if (index >= 0) {
                    this.settings[filter].splice(index, 1);
                } else {
                    this.settings[filter].push(value as string);
                }
                break;
            case 'isFavorite':
                this.settings.isFavorite = value as boolean;
                break;
            case 'count' || 'year':
                this.settings[filter] = value as number[];
                break;
            default:
                throw new Error('Filter data is incorrect');
        }
        this.filterData();
    }
    public setSort(value: 'sort-name-asc' | 'sort-name-desc') {
        this.settings.sort = value;
        this.sortData();
    }
    public saveState() {
        localStorage.setItem('christmas-game-settings', JSON.stringify(this.settings));
    }
    public getFilteredData() {
        return this.filteredData;
    }

    public setMarkedByNum(num: string) {
        const el = data[Number(num) - 1];
        const index = this.settings.marked.findIndex((el) => el.num === num);
        if (index >= 0) {
            this.settings.marked.splice(index, 1);
        } else {
            this.settings.marked.push(el);
        }
        this.saveState();
    }

    public setSearchValue(value: string) {
        this.settings.search = value;
        this.filterData();
    }

    public getMarked() {
        if (this.settings.marked.length === 0) {
            this.settings.marked.push(...data.splice(0, MAX_MARKED - 1));
        }
        return this.settings.marked;
    }

    private sortData() {
        if (this.settings.sort === 'sort-name-asc' || this.settings.sort === 'sort-name-desc') {
            this.filteredData.sort((a, b) => {
                const firstTitle: string = a.name;
                const secondTitle: string = b.name;
                if (firstTitle > secondTitle) {
                    return this.settings.sort === 'sort-name-asc' ? 1 : -1;
                }
                if (firstTitle < secondTitle) {
                    return this.settings.sort === 'sort-name-asc' ? -1 : 1;
                }
                return 0;
            });
        } else
            this.filteredData.sort((a, b) => {
                const firstYear = Number(a.year);
                const secondYear = Number(b.year);
                if (firstYear > secondYear) {
                    return this.settings.sort === 'sort-year-asc' ? 1 : -1;
                }
                if (firstYear < secondYear) {
                    return this.settings.sort === 'sort-year-asc' ? -1 : 1;
                }
                return 0;
            });
        this.saveState();
    }

    public filterData() {
        this.filteredData = data.filter((item) => {
            if (
                (this.settings.color.includes(item.color) || !this.settings.color.length) &&
                (this.settings.shape.includes(item.shape) || !this.settings.shape.length) &&
                (this.settings.size.includes(item.size) || !this.settings.size.length) &&
                Number(item.year) <= this.settings.year[1] &&
                Number(item.year) >= this.settings.year[0] &&
                Number(item.count) <= this.settings.count[1] &&
                Number(item.count) >= this.settings.count[0] &&
                (item.name.toLocaleLowerCase().includes(this.settings.search.trim().toLocaleLowerCase()) || this.settings.search == ``)
            ) {
                if (this.settings.isFavorite) {
                    return item.favorite ? true : false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
        this.sortData();
    }

    public static getInstance(): AppState {
        if (!AppState.instance) {
            AppState.instance = new AppState();
        }
        return AppState.instance;
    }

    public resetFilters() {
        this.settings.shape = [];
        this.settings.count = [1, 12];
        this.settings.year = [1940, 2021];
        this.settings.color = [];
        this.settings.size = [];
        this.settings.isFavorite = false;
        this.filterData();
    }

    public resetSettings() {
        this.settings = { ...defaultSettings };
        this.filterData();
    }
}
export default AppState;
