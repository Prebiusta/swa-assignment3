import './App.css';
import {Layout} from "./hoc/Layout";
import {Redirect, Route, Switch} from "react-router";
import Forecast from "./containers/Forecast";
import WeatherData from "./containers/WeatherData";

const App = () => (
    <Layout>
        <Switch>
            <Route path="/data" component={WeatherData}/>
            <Route path="/forecast" exact component={Forecast}/>
            <Redirect to="/data"/>
        </Switch>
    </Layout>
)
export default App;
