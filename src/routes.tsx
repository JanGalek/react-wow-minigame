import Homepage from "./Pages/Homepage";
import GamePage from "./Pages/GamePage";
import TimerPage from "./Pages/TimerPage";

interface Route {
    path: string
    title: string
    component: any
    exact?: boolean
}

const routes: Route[] = [
    {
        path: "/",
        title: 'Homepage',
        component: Homepage,
        exact: true
    },
    {
        path: "/game",
        title: 'Game',
        component: GamePage
    },
    {
        path: "/timer",
        title: 'Timer',
        component: TimerPage
    }
]

export default routes
