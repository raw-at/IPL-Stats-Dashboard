import React,{Component} from 'react';
import classes from './BaseCard.css';
import {Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/action';
import Spinner from '../Spinner/Spinner';

class BaseCard extends Component  {
    state={
        selectTeamForPlayer : null,
        team_performance_name:"RCB",
        team_select:true,
        team_player:null,
        matchDate:"18-Apr-08/RCB",
        get_clicked:false,
        disabled:true,
        test:true
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
        this.props.history.push(url);
    }

    backButton = () => {
            this.setState({get_clicked:false,selectTeamForPlayer:null})
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
                    <img src={this.props.url} />
                    <h4 style={{"color":"orange","textAlign":"center"}}><b>Orange Cap : {this.props.orange_cap}</b></h4>
                    <h4 style={{"color":"purple","textAlign":"center"}}><b>Purple Cap : {this.props.purple_cap}</b></h4>
                    <h4  style={{"color":"black","textAlign":"center"}}><b>Man of The Series : {this.props.man_of_the_series}</b></h4>
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
                        <h3 style={{"fontWeight":"bold","textAlign":"center","paddingTop":"4px","paddingLeft":"30px"}}>PLAYER PERFORMANCE</h3>
                            <div className="form-group">
                                <label htmlFor="sel1">Select Team:</label>
                                <select className="form-control" id="sel1" onChange={this.selectHandler}>
                                   if(this.state.team_select){
                                       <option></option>
                                   }
                                   else{this.props.team.map((player,index)=>{
                                        return <option key={index} 
                                                value={player['Team_Name']}>
                                            {player['Team_Name']}
                                        </option>
                                    })
                                       
                                   }
                                
                                </select>
                            
                                <label htmlFor="sel2">Select Player:</label>
                                <select className="form-control" id="sel2" disabled={this.state.team_select} onChange={this.playerSelectHandler}>
                                    
                                    {this.props.data.map(player=>{
                                        if(player.Team_Name == this.state.selectTeamForPlayer){
                                            return <option>{player['Player_Name']}</option>
                                        }
                                    })}
                                </select>
                                <br />
                                    <input type="submit" disabled={!(this.state.selectTeamForPlayer && this.state.team_player)}className="btn btn-warning" value="Get Result" onClick={this.playerInfoHandler}/>
                            </div> 
                    </div>
                ):
                card = (
                    <div>
                        {this.props.playerData?
                            <div>
                                <h2><b>Player Name : {this.state.team_player}</b></h2>
                                <h5><b>Batting Skill : {this.props.playerData[0].Batting_Hand}</b></h5>
                                <h5><b>Bowling Skill : {this.props.playerData[0].Bowling_Skill}</b></h5>
                                <h5><b>Total Runs Scored : {this.props.playerData[0].Total_Runs}</b></h5>
                                <h5><b>Total Wickets Taken : {this.props.playerData[0].Total_Wickets}</b></h5>
                                <br />
                                <button className="btn btn-success" onClick={this.backButton}><i class="fa fa-arrow-left"></i>Back</button>
                                
                            </div>
                            :<div>
                                    <h1>Fetching Player Info...</h1>
                                    <div className="loader">Loading...</div>

                            </div>}
                    </div>
                )
            }
            
        }
        else if(this.props.card_type == "date_wise_performance"){
            
            card = (<div>
                     <h3 style={{"fontWeight":"bold","textAlign":"center"}}>DATE WISE PERFORMANCE</h3>
                        <br />
                        <div className="form-group">
                            <label htmlFor="sel1">Select Date:</label>
                            <select onChange = {this.dateHandler}
                                 className="form-control" id="sel1">
                            {this.props.data.map(match=>{
                                return <option key={match['Match_Date']+match['TeamA']} value={match['Match_Date']+'/'+match['TeamA']+'/'+match['TeamB']}>
                                    {match['Match_Date']+' '+match['TeamA']+' VS '+match['TeamB']}
                                </option>
                            })}
                            
                            </select>
                            <br /> <br />
                            <input type="submit" className="btn btn-primary" value="Get Result"  onClick={this.getMatchInfo}/>
                        </div> 
                
            </div>)
        }
        else if(this.props.card_type == 'team_performance'){
            card = (<div>
                    <h3 style={{"fontWeight":"bold","textAlign":"center"}}>TEAM WISE PERFORMANCE</h3>
                <br />
                        <div className="form-group">
                            <label htmlFor="sel1">Select Team:</label>
                            <select className="form-control" id="sel1" onChange={this.selectTeamHandler}>
                                {this.props.data.map(team=>{
                                    return <option key={team['Team_Name_Id']} value={team['Team_Short_Code']}>
                                        {team['Team_Name']}
                                        </option>
                                })}
                                
                            </select><br /><br />
                            <input type="submit" className="btn btn-success" value="Get Result" onClick={this.teamHandler}/>
                            <br />
                
                        </div> 
            </div>)
        }
        else if (this.props.card_type == 'team_season_card'){
            card = (<div style={{"color":"white","padding":"5%"}}>
                    <img src={this.props.logo} />
                    <h3><b>Total Match Played: {this.props.Total_Matches_Played}</b></h3>
                    <h3><b>Total Match Won: {this.props.Win_Matches}</b></h3>
                    <h3><b>Total Match Lost: {this.props.Lost_Matches}</b></h3>
   

            </div>)
        }

        else if (this.props.card_type == 'date_wise_detail'){
            card = (<div style={{"color":"white","padding":"4%"}} >
                        <h3 style={{"color":"black"}}><b>Date: {this.props.match_date}</b></h3>
                        <h4 style={{"textAlign":"center"}}><b>{this.props.teamA + ' vs ' + this.props.teamB}</b></h4>
                        <p><b><span style={{"color":"black"}}>Venue: </span>{this.props.venue}</b></p>
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