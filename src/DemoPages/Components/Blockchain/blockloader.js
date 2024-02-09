import React, { Fragment, Component } from "react";
import './loader.scss';

export default class BlockChainLoader extends Component {
    constructor(props) {
        super(props);

    }
    render(){


        return (
<div className="boxcontainer">

<div className="display-loader">
<div className="loader" style={{ marginTop: "20%" }}>
<div className="box"></div>
<div className="box"></div>
</div>
</div>
</div >

        );
    }
}