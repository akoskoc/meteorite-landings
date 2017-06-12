import React from "react"
import { connect } from "react-redux"

import draw from "./lib/draw"

class Graph extends React.Component {
    componentDidMount(){
        draw(this.props.data, this.props.map)
    }
    render() {
        return(
            <div className="container">
                <svg id="svg"></svg>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Graph)
