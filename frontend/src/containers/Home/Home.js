import React,{Component} from 'react';
import classes from './Home.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import BaseCard from '../../components/BaseCard/BaseCard';
import DTabs from '../../components/DTabs/DTabs';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/action';
import Spinner from '../../components/Spinner/Spinner';
class Home extends Component {
    
    componentWillMount(){

        this.props.getData('1')
    }
    render(){    
        console.log('props',this.props)
        return (this.props.data?<div className={classes.Home}>
        <div className="container-fluid">
                <div className="row">
                    {/*<div className="col-sm-2 col-xs-12">
                        <Sidebar />
                    </div>*/
                    }
                        <div className="col-sm-12 col-xs-12">
                    <Topbar />
                        <div className="row">
                        <div className={classes.Grid}>

                            <BaseCard color="linear-gradient(to bottom, #66ff99 0%, #00ff99 100%)" card_type="top_card" title="Current Season" data={this.props.data.Season} url="https://fantasy.iplt20.com/assets/images/logo.png"/>
                            <BaseCard color="linear-gradient(to bottom, #66ffff 0%, #00ff99 100%)"  card_type="top_card" title="Total Matches" data={this.props.data.total_matches[0]["Total_Matches"]} url="https://upload.wikimedia.org/wikipedia/commons/a/a4/BAT_-_Election_Symbol.png"/>
                            <BaseCard color="linear-gradient(to bottom, #66ffff 0%, #00ccff 100%)"  card_type="top_card" title="Total Sixes" data={this.props.data.total_sixes[0]["Total_Sixes"]} url="http://webiconspng.com/wp-content/uploads/2017/09/6-PNG-Image-50813.png"/>
                            <BaseCard color="linear-gradient(to bottom, #ffff99 0%, #ff9966 100%)"  card_type="top_card" title="Total Fours" data={this.props.data.total_fours[0]["Total_Fours"]} url="http://pngimg.com/uploads/number4/number4_PNG15040.png"/>
                            <BaseCard color="linear-gradient(to bottom, #ffcc66 0%, #ff0066 100%)"  card_type="top_card" title="Total Wickets" data={this.props.data.total_wickets[0]["total_wickets"]} url="https://cdn2.iconfinder.com/data/icons/sports-fitness-line-vol-2/52/game__sports__Balls__sportsballs__cricket__ball__stumps-512.png"/>
                            
                
                        </div>
                        </div>
                        <div className="row">
                       
                        <div className={classes.Center_Grid}>
                            
                            <BaseCard   color="linear-gradient(to bottom left, #e0e0e0 0%, #ffcc99 100%)"
                                        card_type="team_performance"
                                        data={this.props.data.team_season_wise}/>
                            <BaseCard   color="linear-gradient(to top right, #e0e0e0 0%, #ffcc99 100%)"
                                        card_type="date_wise_performance"
                                        data ={this.props.data.date_wise_match_with_team_name}/>
                            <BaseCard   color="linear-gradient(to bottom right, #e0e0e0 0%, #ffcc99 100%)"
                                        card_type="player_info"
                                        data ={this.props.data.team_wise_player_name}
                                        team={this.props.data.team_season_wise}/>
                        </div>         
                        </div>
                       
                        <div className="row">
                      
                            <div className={classes.Center_Grid}>
                            
                                <BaseCard   url="http://www.clker.com/cliparts/K/v/R/c/k/c/baseball-cap-red-md.png"
                                            color="linear-gradient(to top left, #99ff99 0%, #ffffcc 100%)"
                                            card_type="center_caps_card" orange_cap={this.props.data.caps_and_man_of_series[0]["Orange_Cap"]} 
                                            purple_cap={this.props.data.caps_and_man_of_series[0]["Purple_Cap"]}
                                            man_of_the_series={this.props.data.caps_and_man_of_series[0]["Man_of_the_Series"]}/>

                                <BaseCard   color="linear-gradient(to top right, #99ff99 0%, #99ccff 100%)"
                                            url="https://vignette.wikia.nocookie.net/clubpenguin/images/d/de/Pizza_Eating_Contest_trophy.png/revision/latest?cb=20120924162215" card_type="overall_card" title="Winner/Final Match Info." 
                                            TeamA={this.props.data.finale_details[0]["Team_A"]}
                                            TeamB={this.props.data.finale_details[0]["Team_B"]} 
                                            Winner_team={this.props.data.finale_details[0]["Winner"]}
                                            Won_by={this.props.data.finale_details[0]["Won_by"]} 
                                            Win_type={this.props.data.finale_details[0]["Win_Type"]}/>
                                <BaseCard   color="linear-gradient(to top right, #99ffcc 0%, #99ff66 100%)"
                                            card_type="top_card" url="http://www.freelogovectors.net/wp-content/uploads/2018/04/chennai_super_kings_logo_freelogovectors.net_.png"/>
                            
                            
                        </div>
                        </div>
                    
                    </div>
                    </div>
                </div>                
            </div>:<Spinner />)
            
           
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