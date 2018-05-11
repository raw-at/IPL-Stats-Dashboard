import React,{Component} from 'react';
import classes from './DateStats.css';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/action';
class DateStats extends Component {
    componentDidMount(){
        this.props.dateDataExtract('19-Apr-08')
        if(this.props.dateData){
            console.log(this.props.dateData)
        }
    }
    render(){
        return <h1>hi</h1>
    }
}



const mapStateToProps = state => {
    
    return {
        dateData:state.dateData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        dateDataExtract : (date) => dispatch(actionCreator.dateDataExtract(date))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DateStats);