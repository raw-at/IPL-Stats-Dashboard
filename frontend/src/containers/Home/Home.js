import React,{Component} from 'react';
import classes from './Home.css';
import Topbar from '../../components/Topbar/Topbar';
import BaseCard from '../../components/BaseCard/BaseCard';
import DTabs from '../../components/DTabs/DTabs';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/action';
import Spinner from '../../components/Spinner/Spinner';
import Bat from '../../assets/img/bat.png';
import Ball from '../../assets/img/ball.png';
import Six from '../../assets/img/siz.png';
import Four from '../../assets/img/four.png';
import Logo from '../../assets/img/logo.png';
import Cap from '../../assets/img/cap.png';
import Win from '../../assets/img/win.png';
import CSK from '../../assets/img/csk.png';
import RR from '../../assets/img/rr.png';
class Home extends Component {
    
    
    componentWillMount(){

        this.props.getData('1')
    }
    render(){
        let winner_team,winner_image = null;
        let logo_data = {};
        return (<div className={classes.Home}>
        <div className="container-fluid">
                <div className="row">
                     <Topbar />
                </div>
                    
                <div className="row">
                    {this.props.data?
                    <div className="col-sm-12 col-xs-12">
                        <div className="row">

                            <div className="col-sm-2 col-xs-12 col-sm-push-1" style={{"marginTop":"1%"}}>
                                <BaseCard color="linear-gradient(to bottom, #66ff99 0%, #00ff99 100%)" card_type="top_card" title="Current Season" data={this.props.data.Season} url={Logo}/>
                            </div>
                            <div className="col-sm-2 col-xs-12 col-sm-push-1" style={{"marginTop":"1%"}}>
                                <BaseCard color="linear-gradient(to bottom, #66ffff 0%, #00ff99 100%)"  card_type="top_card" title="Total Matches" data={this.props.data.total_matches[0]["Total_Matches"]} url={Bat}/>
                            </div>
                            <div className="col-sm-2 col-xs-12 col-sm-push-1" style={{"marginTop":"1%"}}>
                                <BaseCard color="linear-gradient(to bottom, #66ffff 0%, #00ccff 100%)"  card_type="top_card" title="Total Sixes" data={this.props.data.total_sixes[0]["Total_Sixes"]} url={Six}/>
                            </div>
                            <div className="col-sm-2 col-xs-12 col-sm-push-1" style={{"marginTop":"1%"}}>
                                <BaseCard color="linear-gradient(to bottom, #ffff99 0%, #ff9966 100%)"  card_type="top_card" title="Total Fours" data={this.props.data.total_fours[0]["Total_Fours"]} url={Four}/>
                            </div>
                            <div className="col-sm-2 col-xs-12 col-sm-push-1" style={{"marginTop":"1%"}}>
                                <BaseCard color="linear-gradient(to bottom, #ffcc66 0%, #ff0066 100%)"  card_type="top_card" title="Total Wickets" data={this.props.data.total_wickets[0]["total_wickets"]} url={Ball}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className='col-xs-12 col-sm-4' style={{"marginTop":"1%"}}>
                                <BaseCard   color="linear-gradient(to bottom left, #e0e0e0 0%, #ffcc99 100%)"
                                            card_type="team_performance"
                                            data={this.props.data.team_season_wise}/>
                                
                            </div>
                            <div className='col-xs-12 col-sm-4' style={{"marginTop":"1%"}}>
                                <BaseCard   color="linear-gradient(to bottom right, #e0e0e0 0%, #ffcc99 100%)"
                                            card_type="player_info"
                                            data ={this.props.data.team_wise_player_name}
                                            team={this.props.data.team_season_wise}/>
                            </div>
                            <div className='col-xs-12 col-sm-4' style={{"marginTop":"1%"}}>
                                <BaseCard   color="linear-gradient(to top right, #e0e0e0 0%, #ffcc99 100%)"
                                        card_type="date_wise_performance"
                                        data ={this.props.data.date_wise_match_with_team_name}/>
                            
                            </div>
                                     
                        </div>
                       
                        <div className="row">
                            <div className="col-xs-12 col-sm-5 col-sm-push-1"  style={{"marginTop":"0.5%",}}>
                                <BaseCard   url={Win}
                                                color="linear-gradient(to top left, #99ff99 0%, #ffffcc 100%)"
                                                card_type="center_caps_card" orange_cap={this.props.data.caps_and_man_of_series[0]["Orange_Cap"]} 
                                                purple_cap={this.props.data.caps_and_man_of_series[0]["Purple_Cap"]}
                                                man_of_the_series={this.props.data.caps_and_man_of_series[0]["Man_of_the_Series"]}/>

                            </div>
                            <div className="col-xs-12 col-sm-5 col-sm-push-1" style={{"marginTop":"0.5%"}}>
                                <BaseCard   color="linear-gradient(to top right, #99ff99 0%, #99ccff 100%)" card_type="overall_card"
                                                url={Win} card_type="overall_card" title="Winner/Final Match Info." 
                                                TeamA={this.props.data.finale_details[0]["Team_A"]}
                                                TeamB={this.props.data.finale_details[0]["Team_B"]} 
                                                Winner_team={this.props.data.finale_details[0]["Winner"]}
                                                Won_by={this.props.data.finale_details[0]["Won_by"]} 
                                                Win_type={this.props.data.finale_details[0]["Win_Type"]}/>
                                

                            </div>
                            
                                
                                
                            
                        </div>
                    
                    </div>:null}
                    </div>
                </div>                
            </div>)
            
           
    }
}

const mapStateToProps = state => {
    
    return {
        data:state.data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getData : (id) => dispatch(actionCreator.dataExtract(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);