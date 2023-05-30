import routes from "./routes.js";

const initializeRouter = () => {
    // create document click that watches the nav links only
    document.addEventListener("click", (e: Event) => {
        e.preventDefault();
        console.log("prevent default called");
        const target = e.target as Element;
        if (!target?.matches("a")) {
            return;
        }
        urlRoute(e);
    });

    // create a function that watches the url and calls the urlLocationHandler
    const urlRoute = (event: Event) => {
        event = event || window.event; // get window.event if event argument not provided
        event.preventDefault();
        window.history.pushState({}, "", (event?.target as HTMLLinkElement)?.href ?? '');
        urlLocationHandler();
    };

    // create a function that handles the url location
    const urlLocationHandler = async () => {
        let location = window.location.pathname; // get the url path
        // if the path length is 0, set it to primary page route
        if (location.length == 0) {
            location = "/";
        }
        // get the route object from the routes object
        type RouteKeys = keyof typeof routes;

        // @ts-ignore
        const route = routes[location] || routes["404"];
        // get the html from the template
        const html = await fetch(route.template).then((response) => response.text());
        // set the content of the content div to the html
        // @ts-ignore
        document.getElementById("root").innerHTML = html;
        // set the title of the r to the title of the route
        document.title = route.title;

        route['callback']();
        // set the description of the document to the description of the route
        // @ts-ignore
        // document
        //     .querySelector('meta[name="description"]')
        //     .setAttribute("content", route.description);
    };

    // add an event listener to the window that watches for url changes
    window.onpopstate = urlLocationHandler;
    urlLocationHandler();
}

export default initializeRouter;