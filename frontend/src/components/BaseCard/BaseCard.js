import React,{Component} from 'react';
import classes from './BaseCard.css';
import {Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/action';

class BaseCard extends Component  {
    state={
        selectTeamForPlayer : null,
        team_performance_name:"RCB",
        team_select:true,
        team_player:null,
        matchDate:"18-Apr-08/RCB",
        get_clicked:false,
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
        this.setState({get_clicked:true})
        this.props.getPlayerData(this.props.stateData.Season,this.state.team_player)
        
    }

    dateHandler = (event) => {
        this.setState({matchDate:event.target.value})
    }

    getMatchInfo = () => {
        const url = '/match/info/'+this.state.matchDate;
        console.log(url)
        this.props.history.push(url);
    }

    backButton = () => {
            this.setState({get_clicked:false})
    }
    render(){
        let card = null;
        if(this.props.card_type == 'top_card'){
        
            card = (
                <div>
                    <img src={this.props.url} />
                    <h4><b>{this.props.title}</b></h4>
                    <h4>{this.props.data}</h4>
                </div>)
        }
        else if(this.props.card_type == 'center_caps_card'){
    
            card = (
                <div>
                    <h4><b style={{"color":"orange"}}>Orange Cap: <span >{this.props.orange_cap}</span></b></h4>
                    <h4><b style={{"color":"purple"}}>Purple Cap: <span>{this.props.purple_cap}</span></b></h4>
                    <h4><b style={{"color":"black"}}>Man of The Series: <span>{this.props.man_of_the_series}</span></b></h4>
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
            {!this.state.get_clicked?
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
                                <select class="form-control" id="sel2" disabled={this.state.team_select} onChange={this.playerSelectHandler}>
                                    
                                    {this.props.data.map(player=>{
                                        if(player.Team_Name == this.state.selectTeamForPlayer){
                                            return <option>{player['Player_Name']}</option>
                                        }
                                    })}
                                </select>
                                <br />
                                <input type="submit" class="btn btn-warning" value="Get Result" onClick={this.playerInfoHandler}/>
                            </div> 
                    </div>
                ):
                card = (
                    <div>
                        {this.props.playerData?
                            <div>
                                <h3><b>Player Name : {this.state.team_player}</b></h3>
                                <h4><b>Batting Skill : {this.props.playerData[0].Batting_Hand}</b></h4>
                                <h4><b>Bowling Skill : {this.props.playerData[0].Bowling_Skill}</b></h4>
                                <h4><b>Total Runs Scored : {this.props.playerData[0].Total_Runs}</b></h4>
                                <h4><b>Total Wickets Taken : {this.props.playerData[0].Total_Wickets}</b></h4>
                                <button className="btn btn-success" onClick={this.backButton}><i class="fa fa-arrow-left"></i>Back</button>
                                
                            </div>
                            :null}
                    </div>
                )
            }
            
        }
        else if(this.props.card_type == "date_wise_performance"){
            
            card = (<div>
                     <h3 style={{"fontWeight":"bold","textAlign":"center"}}>DATE WISE MATCH PERFORMANCE</h3>
                        <div className="form-group">
                            <label for="sel1">Select Date:</label>
                            <select onChange = {this.dateHandler}
                                 class="form-control" id="sel1">
                            {this.props.data.map(match=>{
                                return <option key={match['Match_Date']} value={match['Match_Date']+'/'+match['TeamA']+'/'+match['TeamB']}>
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
                            <select class="form-control" id="sel1" onChange={this.selectTeamHandler}>
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

        else if (this.props.card_type == 'date_wise_detail'){
            card = (<div style={{"color":"white"}}>
                        <h3 style={{"textAlign":"center","color":"black"}}><b>Date: <br />{this.props.match_date}</b></h3>
                        <h4 style={{"textAlign":"center"}}><b>{this.props.teamA + ' vs ' + this.props.teamB}</b></h4>
                        <h4 style={{"textAlign":"center"}}><b><span style={{"color":"black"}}>Venue</span> <br />{this.props.venue}</b></h4>
                    </div>)
        }

        else if (this.props.card_type == 'more_info'){
            card = (<div style={{"color":"white"}}>
                        <h3 style={{"textAlign":"center","color":"black"}}><b>Man Of The Match</b></h3>
                        <h4 style={{"textAlign":"center"}}><b>{this.props.data.Man_of_the_Match}</b></h4>
                        <p><b>Winner Team: {this.props.data.Winner_Team} : Won {this.props.data.Win_Type + ' ' + this.props.data.Won_By}</b></p>
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
        stateData:state.data,
        playerData:state.player_data
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getPlayerData:(season,playerName)=>dispatch(actionCreator.playerDataExtract(season,playerName))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(BaseCard));