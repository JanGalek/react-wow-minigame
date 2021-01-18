import React from "react";
import { Provider } from "react-redux"
import store from "../redux/store";
import routes from "../routes";
import {Link, Route, Switch } from "react-router-dom"
import {Container} from "react-bootstrap";

const Layout = () => {

    return (
        <Provider store={store}>
            <Container fluid>
                <nav>
                    <ul>
                        {routes.map((route, i) => (
                            <li><Link to={route.path}>{route.title}</Link></li>
                        ))}
                    </ul>
                </nav>
                <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Switch>
            </Container>
        </Provider>
    );
}

export default Layout
