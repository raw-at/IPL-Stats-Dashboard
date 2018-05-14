import React,{Component} from 'react';
import classes from './DateStats.css';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/action';
import Card from '../../components/BaseCard/BaseCard';
import Chart from '../../components/Chart/Chart';
import Spinner from '../../components/Spinner/Spinner';
class DateStats extends Component {


   

    componentDidMount(){
        const data_url = this.props.match.params.date+'/'+
                    this.props.match.params.team_name_a+'/'+this.props.match.params.team_name_b
        this.props.dateDataExtract(data_url)
             
    }
    render(){
        let card = null;
        let more_info_card = null;
        let batting_table_A = null;
        let batting_table_B = null;
        let bowling_table = null;
        let TeamA = null;
        let TeamB = null;
        let performance = null;
        let url_team_name = null;
        let team_A_array = [];
        let team_B_array = [];
        let over_wise_run_team_a = [];
        let over_wise_run_team_b = [];
        let over_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
        if(this.props.dateData){
            url_team_name  = this.props.match.params.team_name_a;

            card = (<div><Card card_type="date_wise_detail" color="linear-gradient(to bottom, #3366ff 0%, #ccff66 100%)" 
                            match_date={this.props.dateData[0]['Match_Date']} teamA={this.props.dateData[0].TeamA}
                            teamB={this.props.dateData[0].TeamB} venue = {this.props.dateData[0].Venue_Name} /></div>)

            more_info_card = (<div><Card color="linear-gradient(to top, #3366ff 0%, #ccff66 100%)" card_type="more_info" data={this.props.dateData[0].More_details}/></div>)
            
            this.props.dateData.Batting_details.map(data=>{
                
                if(this.props.match.params.team_name_a == (data.Team) ||
                this.props.match.params.team_name_a == (data.Team).slice(0,(data.Team).length -1)
            ){    
                    team_A_array.push(data)
                }
                else{
                    team_B_array.push(data)
                }
            })
            batting_table_B=(
                team_B_array.map(data=>{
                            return (<tr>
                                <td>{data.Player_Name}</td>
                                <td>{data.Score}</td>
                                <td>{data.Team}</td>
                            </tr>)
                        
                })
            )
            
            batting_table_A=(
                team_A_array.map(data=>{
                        return (<tr>
                            <td>{data.Player_Name}</td>
                            <td>{data.Score}</td>
                            <td>{data.Team}</td>
                        </tr>)
                                   })
            )
            
            bowling_table = (
                this.props.dateData.Bowling_details.map(data=>{
                    
                    return (<tr>
                        <td>{data.Player_Name}</td>
                        <td>{data.Wickets}</td>
                        <td>{data.Team}</td>
                    </tr>)
                })
            )
            TeamA =this.props.dateData[0].TeamA;
            TeamB =this.props.dateData[0].TeamB;

            performance = (<div>
                <div   style={{"background":"linear-gradient(to bottom left, #ffffcc 0%, #33ccff 100%)"}} className="well well-sm">
                <h3><b>Best Bowling Performance Today</b></h3>
                <h4><b>Player Name</b>: {this.props.dateData.Best_Bowling_Performace[0].Player_Name}</h4>
                <h4><b>Wickets</b>: {this.props.dateData.Best_Bowling_Performace[0].Max_Wicket}</h4>
                <h4><b>Team</b> : {this.props.dateData.Best_Bowling_Performace[0].Team}
                </h4>
            </div>
            <div style={{"background":"linear-gradient(to bottom left, #ffffcc 0%, #99ff99 100%)"}} className="well well-sm">
                
                <h3><b>Best Batting Performance Today</b></h3>
                <h4><b>Player Name</b>: {this.props.dateData.Best_Batting_Performace[0].Player_Name}</h4>
                <h4><b>Score</b>: {this.props.dateData.Best_Batting_Performace[0].Max_Score} </h4>
                <h4><b>Team</b> : {this.props.dateData.Best_Batting_Performace[0].Team}</h4>
            
            </div> </div>   
            )
            
             over_wise_run_team_a = this.props.dateData.first_innings_over_wise.map(data=>{
                return data['Batsman_Score'] + data['Extra'] 
            })


            over_wise_run_team_b = this.props.dateData.second_innings_over_wise.map(data=>{
                return data['Batsman_Score'] + data['Extra'] 
            })

        }
        return (this.props.dateData?<div className={classes.DateStats}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className={classes.Back}>
                                <div className="col-sm-1" style={{"margin-top":"1%"}}>
                                <i className="fa fa-4x fa-chevron-circle-left" onClick={()=>this.props.history.goBack()}></i>
                                </div>
                            </div>
                            
                            <div className="col-sm-11">
                                <h1 style={{"color":"coral","textAlign":"center"}}>Date Wise Team Performance</h1>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-2" >
                                        <div className="row" style={{"margin-top":"1%"}}>
                                            <div className="col-xs-12">
                                                {card}
                                            </div>
                                        </div>
                                        
                                        <div className="row" style={{"margin-top":"1%"}}>
                                            <div className="col-xs-12">
                                                {more_info_card}
                                            </div>
                                        </div>
                                        
                                     
                               
                            </div>
                            <div className="col-xs-12 col-sm-10">

{/*---------------------*/}
 <ul className="nav nav-tabs" style={{"margin-left":"15%","margin-top":"5%"}}>
                <li className="active"><a data-toggle="tab" href="#home">Batting Statistics of {TeamA}</a></li>
                <li><a data-toggle="tab" href="#menu1">Batting Statistics of {TeamB}</a></li>
                <li><a data-toggle="tab" href="#menu2">Bowling Statistics</a></li>
                <li><a data-toggle="tab" href="#menu3">Player Information</a></li>
                <li><a data-toggle="tab" href="#menu4">Performance Graph</a></li>
            </ul>

            <div className="tab-content">
                <div id="home" className="tab-pane fade in active">
                <table style={{"color":"black"}} className="table table-bordered table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Player Name</th>
                                                <th>Runs Scored</th>
                                                <th>Team</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {batting_table_A}
                                        </tbody>
                                    </table>
                                    
                </div>
                <div id="menu1" className="tab-pane fade">
                    <table style={{"color":"black"}}className="table table-bordered table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Player Name</th>
                                                <th>Runs Scored</th>
                                                <th>Team</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {batting_table_B}
                                        </tbody>
                                    </table>
                
               
                </div>

                <div id="menu2" className="tab-pane fade">
                <table style={{"color":"black"}}className="table table-bordered table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Player Name</th>
                                                <th>Wickets Taken</th>
                                                <th>Team</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bowling_table}
                                        </tbody>
                                    </table>
               
                </div>
                <div id="menu3" className="tab-pane fade">
                    {performance}                  
                </div>

                <div id="menu4" className="tab-pane fade">
                    <div>
                    <Chart type="line" x_label="OVER" y_label="Runs" data_A={over_wise_run_team_a} data_B={over_wise_run_team_b} labels={over_array} team_Name={this.props.match.params['team_name_a']}/>
                    </div>
                                
                </div>
                
            </div>
{/*----------------------*/}

                            
                                  
                            </div>
                        </div>
                    </div>
                
            </div>:<Spinner />
        )
    }
}



const mapStateToProps = state => {
    
    return {
        dateData:state.date_wise_data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        dateDataExtract : (date) => dispatch(actionCreator.dateDataExtract(date))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DateStats);