import React,{Component} from 'react';
import classes from './Team.css';
import {connect} from 'react-redux';
import Chart from '../../components/Chart/Chart';
import * as actionCreator from '../../store/actions/action';
import Card from '../../components/BaseCard/BaseCard';
import {Doughnut} from 'react-chartjs-2';
import Spinner from '../../components/Spinner/Spinner';

class Team extends Component {
    state = {
        team_color:{
            'csk':'yellow',
            'rcb':'red'
        }
    }
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
        let winning_percentage = null;
        let win_count = null;
        let lose_count = null;
        if(this.props.chartData){
            this.props.chartData.Performance.map(data=>{
                if(data.Team_Short_Code == this.props.match.params['team_name'] ||data.Team_Short_Code == this.props.match.params['team_name']+'\r' ){
                    team_data.push(data);
                }else{

                    matchBetween.push(this.props.match.params['team_name'] +' vs '+data.Team_Short_Code )
                    opponent_team_data.push(data);
                }
            })
            console.log(opponent_team_data);
            console.log(team_data)
            for(let i=0;i<team_data.length;i++){
                if(team_data[i].Score>opponent_team_data[i].Score){
                    win_count+=1;
                }
                else{
                    lose_count+=1;
                }
            }
         team_data.map(data=>{
            team_runs.push(data.Score + data.Extra)
         })
         
         opponent_team_data.map(data=>{
             opponent_runs.push(data.Score + data.Extra)
         })
            this.chart= (
            <Chart  y_label='Score' x_label={this.props.match.params['team_name']+' vs Others'} 
                    type="bar" data_A={team_runs} data_B={opponent_runs} labels={matchBetween} team_Name={this.props.match.params['team_name']}/>
                      
         )
         winning_percentage = Math.floor((this.props.chartData.Total_Matches_Played-lose_count)/(this.props.chartData.Total_Matches_Played)*100);
        }
        else{
            this.chart = (<Spinner/>)
        }
        return (
            <div className={classes.ChartArea}>
                <div className="container-fluid">
                    <div className="row">
                        <div className={classes.Team}>
                            <div className="col-sm-1" style={{"margin-top":"2%"}}>
                            <i className="fa fa-4x fa-chevron-circle-left" onClick={()=>this.props.history.goBack()}></i>
                            </div>
                        </div>
                        <div class="col-sm-11">
                            <h1 style={{"textAlign":"center"}}>Season {this.props.match.params['season_id']}</h1>
                            <p style={{"textAlign":"center","font-size":"2em"}}> Performance Graph of : {this.props.match.params['team_name']}</p>
                            
                        </div>
                        
                        
                    </div>
                    <div className="row" style={{"marginTop":"2%"}}>
                        {this.props.chartData?
                            <div className="col-xs-12 col-sm-4">
                                
                              
                                <div className={classes.leftChart}>
                                <h1 style={{"textAlign":"center"}}>Win {winning_percentage} %</h1>
                                <Doughnut 
                                            data={{
                                                labels: ['Match Won','Match Lost'],
                                                datasets:[
                                                {
                                                    label:'Match Statistics',
                                                    data:[
                                                    win_count,
                                                    lose_count,
                                                    ],
                                                    backgroundColor:[
                                                    'rgba(255, 80, 80,0.8)',
                                                    'rgba(0, 204, 255,0.8)'
                                                    ]
                                                }
                                                ]
                                        }}
                                        
                                            options={{
                                                legend:{
                                                display:true,
                                                position:'bottom'
                                                }
                                    }}
                                    />
                                    </div><br />
                                <Card card_type="team_season_card"
                                    Total_Matches_Played={this.props.chartData.Total_Matches_Played}
                                    Win_Matches={win_count}
                                    Lost_Matches={lose_count}/>
                                                
                            
            </div>:null}
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