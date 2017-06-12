import React from "react"
import ReactDOM from "react-dom"
import "./styles/main.css"
import { Provider } from "react-redux"
import { createStore } from "redux"

/* Components */
import Graph from "./components/graph"
import Footer from "./components/footer"

/* Reducer */
import reducer from "./reducer/reducer"

/* Store */
const store = createStore(reducer)






class App extends React.Component {
    render() {
        return(
            <div>
                <Graph />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
