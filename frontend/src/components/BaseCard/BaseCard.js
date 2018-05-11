import React,{Component} from 'react';
import classes from './BaseCard.css';
import {Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class BaseCard extends Component  {
    state={
        selectTeamForPlayer : null,
        team_performance_name:null,
        team_select:true,
        team_player:null,
        matchDate:null
    } 
    selectHandler =(event)=> {
        this.setState({selectTeamForPlayer:event.target.value,team_select:false});
    }
    playerSelectHandler = (event) => {
        this.setState({team_player:event.target.value})
    }
    selectTeamHandler = (event) => {
        this.setState({team_performance_name:event.target.value});
    }
    teamHandler = () => {
        const season_id = this.props.stateData.Season;
        const team_name =this.state.team_performance_name;

        const url = "/"+season_id+'/'+team_name;
        this.props.history.push(url)
    }
    playerInfoHandler = () => {
        console.log(this.state.team_player,this.state.selectTeamForPlayer)
    }

    dateHandler = (event) => {
        this.setState({matchDate:event.target.value})
    }

    getMatchInfo = () => {
        console.log(this.state.matchDate)
    }
    render(){
        let card = null;
        if(this.props.card_type == 'top_card'){
        
            card = (
                <div>
                    <img src={this.props.url} />
                    <h4><b>{this.props.title}</b></h4>
                    <p>{this.props.data}</p>
                </div>)
        }
        else if(this.props.card_type == 'center_caps_card'){
    
            card = (
                <div>
                    <h4><b>Orange Cap: <span style={{"color":"orange"}}>{this.props.orange_cap}</span></b></h4>
                    <h4><b>Purple Cap: <span style={{"color":"purple"}}>{this.props.purple_cap}</span></b></h4>
                    <h4><b>Man of The Series: <span style={{"color":"red"}}>{this.props.man_of_the_series}</span></b></h4>
                </div>
            )
        }
        else if(this.props.card_type == 'overall_card'){
    
            card = (
                <div>
                    <img src={this.props.url} />
                    <h4 style={{"textAlign":"center"}}><b>{this.props.title}</b></h4>
                    <h4 style={{"textAlign":"center"}}><b>{this.props.TeamA} VS {this.props.TeamB}</b></h4>
                    <h4 style={{"textAlign":"center"}}><b>{this.props.Winner_team} Won by  {this.props.Won_by} {this.props.Win_type}</b></h4>
                    
                </div>
            )
        }
        else if(this.props.card_type == "player_info"){
    
            card = (
                <div>
                    <h3 style={{"fontWeight":"bold","textAlign":"center"}}>PLAYER PERFORMANCE</h3>
                        <div className="form-group">
                            <label for="sel1">Select Team:</label>
                            <select class="form-control" id="sel1" onChange={this.selectHandler}>
                               if(this.state.team_select){
                                   <option><hr /></option>
                               }
                               else{this.props.team.map((player,index)=>{
                                    return <option key={index} 
                                            value={player['Team_Name']}>
                                        {player['Team_Name']}
                                    </option>
                                })
                                   
                               }
                            
                            </select>
                        
                            <label for="sel2">Select Player:</label>
                            <select 
                             class="form-control" id="sel2" disabled={this.state.team_select} onChange={this.playerSelectHandler}>
                                {this.props.data.map(player=>{
                                    if(player.Team_Name == this.state.selectTeamForPlayer){
                                        return <option >{player['Player_Name']}</option>
                                    }
                                })}
                            </select>
                            <br />
                            <input type="submit" class="btn btn-warning" value="Get Result" onClick={this.playerInfoHandler}/>
                        </div> 
                </div>
            )
        }
        else if(this.props.card_type == "date_wise_performance"){
            
            card = (<div>
                     <h3 style={{"fontWeight":"bold","textAlign":"center"}}>DATE WISE MATCH PERFORMANCE</h3>
                        <div className="form-group">
                            <label for="sel1">Select Date:</label>
                            <select onChange = {this.dateHandler}
                                 class="form-control" id="sel1">
                            {this.props.data.map(match=>{
                                return <option key={match['Match_Date']} value={match['Match_Date']}>
                                    {match['Match_Date']+' '+match['TeamA']+' VS '+match['TeamB']}
                                </option>
                            })}
                            
                            </select>
                            <br />
                            <input type="submit" class="btn btn-primary" value="Get Result"  onClick={this.getMatchInfo}/>
                        </div> 
                
            </div>)
        }
        else if(this.props.card_type == 'team_performance'){
            card = (<div>
    
                <h3 style={{"fontWeight":"bold","textAlign":"center"}}>TEAM PERFORMANCE</h3>
                        <div className="form-group">
                            <label for="sel1">Select Team:</label>
                            <select
                                    class="form-control" id="sel1" onChange={this.selectTeamHandler}>
                                {this.props.data.map(team=>{
                                    return <option key={team['Team_Name_Id']} value={team['Team_Short_Code']}>
                                        {team['Team_Name']}
                                        </option>
                                })}
                                
                            </select><br />
                            <input type="submit" class="btn btn-success" value="Get Result" onClick={this.teamHandler}/>
                        </div> 
            </div>)
        }
        else if (this.props.card_type == 'team_season_card'){
            card = (<div style={{"color":"white"}}>
                    <img src={this.props.logo} />
                    <h4><b>Total Match Played: {this.props.Total_Matches_Played}</b></h4>
                    <h4><b>Total Match Won: {this.props.Win_Matches}</b></h4>
                    <h4><b>Total Match Lost: {this.props.Lost_Matches}</b></h4>
   

            </div>)
        }

        return (

            <div style={{"background": this.props.color}}className={classes.BaseCard}>
            
                    
                    {card}
                    
                       
            </div>
            )
    }
   
}

const mapStateToProps = state => {
    
    return {
        stateData:state.data
    }
}



export default connect(mapStateToProps)(withRouter(BaseCard));