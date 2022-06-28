interface Component {
    render(): Promise<string>;
    afterRender(): Promise<void>;
}

export default Component;
