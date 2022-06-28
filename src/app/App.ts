import Router from '../common/Router';
class App {
    public async start(): Promise<void> {
        const router = new Router();
        router.init();
    }
}

export default App;
