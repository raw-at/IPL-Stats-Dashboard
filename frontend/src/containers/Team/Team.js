import React,{Component} from 'react';
import classes from './Team.css';
import {connect} from 'react-redux';
import Chart from '../../components/Chart/Chart';
import * as actionCreator from '../../store/actions/action';
import Card from '../../components/BaseCard/BaseCard';
class Team extends Component {
    componentDidMount(){
        this.props.chartDataExtract(this.props.match.params['season_id'],this.props.match.params['team_name'])
    }
    render(){
        
        let team_data = [];
        let opponent_team_data = [];
        let team_runs = [];
        let opponent_runs = [];
        let matchBetween = [];
        let chart = null;
        if(this.props.chartData){
            console.log(this.props.chartData)
            this.props.chartData.Performance.map(data=>{
                if(data.Team_Short_Code == this.props.match.params['team_name'] ||data.Team_Short_Code == this.props.match.params['team_name']+'\r' ){
                    console.log('yo')
                    team_data.push(data);
                }else{

                    matchBetween.push(this.props.match.params['team_name'] +' vs '+data.Team_Short_Code )
                    opponent_team_data.push(data);
                }
            })
         team_data.map(data=>{
            team_runs.push(data.Score + data.Extra)
         })
         
         opponent_team_data.map(data=>{
             opponent_runs.push(data.Score + data.Extra)
         })
         console.log(team_runs);
         console.log(opponent_runs);
         console.log(matchBetween)
            this.chart= (
            <Chart data_A={team_runs} data_B={opponent_runs} labels={matchBetween} team_Name={this.props.match.params['team_name']}/>
                      
         )
        }
        else{
            this.chart = (<div className={classes.loader}>Loading...</div>)
        }
        return (
            <div className={classes.ChartArea}>
                <div className="container-fluid">
                    <div className="row">
                        <h1 style={{"textAlign":"center"}}>Season Performance Graph </h1>
                        <p style={{"textAlign":"center","font-size":"2em"}}>Team:{this.props.match.params['team_name']}</p>

                    </div>
                    <div className="row" style={{"marginTop":"2%"}}>
                        <div className="col-xs-12 col-sm-3">
                        {this.props.chartData?<Card card_type="team_season_card"
                             logo="https://seeklogo.com/images/I/ipl-kings-xi-punjab-logo-6747D5C02B-seeklogo.com.png"
                             Total_Matches_Played={this.props.chartData.Total_Matches_Played}
                             Win_Matches={this.props.chartData.Win_Matches}
                             Lost_Matches={this.props.chartData.Lost_Matches}
                        
                        />:null}
                        </div>
                        <div className="col-xs-12 col-sm-8">
                            {this.chart}    

                        </div>
                    </div>
                    <br />
                    <div className="row">
                      
                    </div>
                </div>
            </div>
        )
    }
}    

const mapStateToProps = state => {
    
    return {
        chartData:state.chartData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        chartDataExtract : (seasonId,teamShortCode) => dispatch(actionCreator.chartDataExtract(seasonId,teamShortCode))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Team);