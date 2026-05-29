class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const path = hash;
        
        if (this.routes[path]) {
            this.routes[path]();
            this.currentRoute = path;
            this.updateNav();
        } else {
            if (this.routes['/']) {
                this.routes['/']();
                this.currentRoute = '/';
                this.updateNav();
            }
        }
    }

    updateNav() {
        document.querySelectorAll('.nav-link').forEach(link => {
            const route = link.getAttribute('data-route');
            if (route === this.currentRoute) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    navigate(path) {
        window.location.hash = path;
    }
}

const router = new Router();
