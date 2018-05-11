import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './Topbar.css';
import * as actionCreator from '../../store/actions/action';
class Topbar extends Component  {

    render(){
        return (
            <div className={classes.Topbar}>
     
                 <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <button   type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span style={{"color":"red"}} className="icon-bar"></span>
                            <span style={{"color":"grey"}} className="icon-bar"></span>
                            <span style={{"color":"grey"}} className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">IPL Dashboard</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Seasons&nbsp;
                            <span className="caret"></span></a>
                            <ul className="dropdown-menu"  style={{"background":"linear-gradient(to bottom right, #ffffff 0%, #ccffff 74%)","cursor":"pointer"}}>
                            <li><a onClick={this.props.getSeasonData.bind(this,'1')}>Season 1</a></li>
                            <li><a onClick={this.props.getSeasonData.bind(this,'2')}>Season 2</a></li>
                            <li><a onClick={this.props.getSeasonData.bind(this,'3')}>Season 3</a></li>
                            <li><a onClick={this.props.getSeasonData.bind(this,'4')}>Season 4</a></li>
                            <li><a onClick={this.props.getSeasonData.bind(this,'5')}>Season 5</a></li>
                            <li><a onClick={this.props.getSeasonData.bind(this,'6')}>Season 6</a></li>
                            <li><a onClick={this.props.getSeasonData.bind(this,'7')}>Season 7</a></li>
                            <li><a onClick={this.props.getSeasonData.bind(this,'8')}>Season 8</a></li>
                            
                            
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>                
            </div>
        )
            
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getSeasonData : (id) => dispatch(actionCreator.dataExtract(id))
    }
}

export default connect(null,mapDispatchToProps)(Topbar);