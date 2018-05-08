var ObjectId = require('mongodb').ObjectID;
module.exports = function(app,connection){
    app.get('/:id',(req,res)=>{
        const id = parseInt(req.params.id);
        var response = {};
        
        query = "select distinct Matches.Team_Name_Id,Team.Team_Short_Code ,\
                Team.Team_Name FROM Matches INNER JOIN Team on Matches.Team_Name_Id \
                = Team.Team_Id where Matches.Season_Id = "+id;
        
        connection.query(query,function(err,result){
            if(err) throw err;
            //console.log('Result: '+JSON.stringify(result)) 
            response['team_season_wise'] = result;
            //res.send(result);
            //console.log(team_season_wise)

        });
        query = "select * from Season where Season.Season_Id = "+id;

        connection.query(query,function(err,result){
            if(err) throw err;
            response['caps_and_man_of_series'] = result;
            //console.log(caps_and_man_of_series);
        });

        query = "select NewTable.Match_Date,NewTable.TeamA,Team.Team_Short_Code as 'TeamB' FROM ((select Matches.Match_Date,Matches.Opponent_Team_Id,Team.Team_Short_Code as'TeamA' \
                 from Matches Inner Join Team on Matches.Team_Name_Id = Team.Team_Id where Matches.Season_Id = "+id+")as NewTable) \
                 Inner Join Team on NewTable.Opponent_Team_Id = Team.Team_Id;";
        connection.query(query,function(err,result){
            if(err) throw err;
            response['date_wise_match_with_team_name' ]= result;
            //res.send(result);
            //console.log(caps_and_man_of_series);
        });

        query = "select distinct FinalTable.Player_Name,Team.Team_Name from ((select Player.Player_Name,TableA.Team_id from \
                ((select Player_Match.Player_Id,Player_Match.Team_Id from Player_Match inner join \
                Matches on Player_Match.Match_Id = Matches.Match_Id where Matches.Season_Id = "+id+") as TableA) \
                inner join Player on Player.Player_Id = TableA.Player_Id)as FinalTable) inner join Team on Team.Team_Id = FinalTable.Team_Id;"


        connection.query(query,function(err,result){
            if(err) throw err;
            response['team_wise_player_name'] = result;
            //res.send(result);
            //console.log(caps_and_man_of_series);
        });
           
        query = "select count(Match_Id) as Total_Matches from Matches where Matches.Season_Id = "+id+";        "
        

        connection.query(query,function(err,result){
            if(err) throw err;
            response['total_matches'] = result;
            //res.send(result);
            //console.log(caps_and_man_of_series);
        });


        query = "select count(Ball_Id) as Total_Fours from (select Ball_by_Ball.Ball_Id,Ball_by_Ball.Batsman_Scored from (\
            select Matches.Match_Id from Matches where Matches.Season_Id = "+id+") as resultTable inner join Ball_by_Ball on Ball_by_Ball.Match_Id = resultTable.Match_Id) as finalTable where finalTable.Batsman_Scored = 4;\
            "
        connection.query(query,function(err,result){
            if(err) throw err;
            response['total_fours'] = result;
            //res.send(result);
            //console.log(caps_and_man_of_series);
        });
            
        query = "select count(Ball_Id) as Total_Sixes from (select Ball_by_Ball.Ball_Id,Ball_by_Ball.Batsman_Scored from (\
            select Matches.Match_Id from Matches where Matches.Season_Id = "+id+") as resultTable inner join Ball_by_Ball on Ball_by_Ball.Match_Id = resultTable.Match_Id) as finalTable where finalTable.Batsman_Scored = 6;\
            "
        connection.query(query,function(err,result){
            if(err) throw err;
            response['total_sixes'] = result;
            
        });

        query = "Select theTable.Team_A,theTable.Team_B,Team.Team_Short_Code as Winner, \
                theTable.Win_Type,theTable.Won_by from Team inner join ( \
                (Select finalTable.Team_Short_Code as 'Team_A',Team.Team_Short_Code as 'Team_B' ,\
                finalTable.Match_Winner_Id,finalTable.Win_Type,finalTable.Won_By \
                from Team inner join(Select Team.Team_Short_Code,tableA.Opponent_Team_Id,tableA.Match_Winner_Id,\
                tableA.Win_Type,tableA.Won_By from Team inner join \
                (select Matches.Team_Name_Id,Matches.Opponent_Team_Id, Matches.Match_Winner_Id,Matches.Won_By ,Matches.Win_Type from Matches where Matches.Match_Id =  (select Max(Matches.Match_Id) from \
                Matches where Matches.Season_Id = "+id+" ))as tableA on tableA.Team_Name_Id = Team.Team_Id) \
                as finalTable on Team.Team_Id = finalTable.Opponent_Team_Id) \
                as theTable) on Team.Team_Id = theTable.Match_Winner_Id;"


        connection.query(query,function(err,result){
            if(err) throw err;
            response['finale_details'] = result;
            res.send(response);
        });

    });

    app.get('/:season_id/:team/:player_name',(req,res)=>{
        var season_id = parseInt(req.params.season_id);
        var team = req.params.team;
        var player_name = req.params.player_name;
        var player_id = null;
        query = "select Player.Player_Id,Batting_Hand,Bowling_Skill from Player \
                where Player.Player_Name = '"+player_name+"'";
        connection.query(query,(err,player_info)=>{
            if(err) throw err;
            player_id = player_info[0]['Player_Id'];
            
            batting_query = "select sum(Ball_by_Ball.Batsman_Scored) as Season_Score from Ball_by_Ball \
                    inner join Matches on Matches.Match_Id = Ball_by_Ball.Match_Id \
                    where Matches.Season_Id = "+season_id+" and Ball_by_Ball.Striker_Id = "+player_id;
            connection.query(batting_query,(err,result)=>{
                if(err) throw err;
                
                player_info["0"]['Total_Runs'] = result[0]['Season_Score']; 
                console.log(player_info)
                //res.send(player_info);
            });
            
            bowling_query = "select count(Ball_by_Ball.Player_dissimal_Id) as Total_Wickets from Ball_by_Ball \
                            inner join Matches on Matches.Match_Id = Ball_by_Ball.Match_Id \
                            where Matches.Season_Id = "+season_id+" and Ball_by_Ball.Bowler_Id = "+player_id+" and Ball_by_Ball.Player_dissimal_Id != 0 \
                            and Ball_by_Ball.Dissimal_Type != 'run out';"
            
            connection.query(bowling_query,(err,result)=>{
                if(err) throw err;
                player_info["0"]["Total_Wickets"] = result[0]['Total_Wickets'];    
                res.send(player_info);
            })
                    
        })
 
    });

    app.get('/:season_id/:team_name',(req,res)=>{
        var team_name = req.params.team_name;
        var season_id = parseInt(req.params.season_id);
        var team_Id = null;
        var final_result = {};
        query = "select distinct Team.Team_Id,Team.Team_Name from Team inner join \
                Matches on (Team.Team_Id = Matches.Team_Name_Id or Team.Team_Id = Matches.Opponent_Team_Id) \
                and Matches.Season_Id = "+season_id+" and Team.Team_Name = '"+team_name+"';"
        
        connection.query(query,(err,result)=>{
            if(err) throw err;
            team_Id = result["0"]["Team_Id"]

        query = "select count(Matches.Match_Id) as Total_Matches from Matches \
                    where (Matches.Team_Name_Id = "+team_Id+" or Matches.Opponent_Team_Id = "+team_Id+") \
                    and Matches.Season_Id = "+season_id+";"
        
        connection.query(query,(err,result)=>{
            if(err) throw err;
            //    res.send(result)
            final_result['Total_Matches_Played'] = result["0"]["Total_Matches"] 
                //res.send(final_result);
            
        });

        query = "select count(Matches.Match_Winner_Id) as Win_Matches from Matches where \
                    (Matches.Team_Name_Id = "+team_Id+" or Matches.Opponent_Team_Id = "+team_Id+") \
                     and Matches.Season_Id = "+season_id+" and Matches.Match_Winner_Id = "+team_Id+";"
            
        connection.query(query,(err,result)=>{
            if(err) throw err;
            final_result['Win_Matches'] = result["0"]["Win_Matches"]; 
            final_result['Lost_Matches'] = final_result["Total_Matches_Played"] - final_result["Win_Matches"];
            //res.send(final_result);
            
        });
        
        query = "select the_Table.Score,the_Table.Extra,Team.Team_Short_Code from Team inner join \
            (select Sum(Ball_by_Ball.Batsman_Scored)as Score,Sum(Ball_by_Ball.Extra_Runs) as Extra,Table_2.Match_Id \
            ,Ball_by_Ball.Team_Batting_Id \
            from Ball_by_Ball  right join ( \
            select Ball_by_Ball.Match_Id,Match_Id_Table.Team_Id \
            from Ball_by_Ball inner join \
            (select distinct Matches.Match_Id ,Team_Id_Table.Team_Id from Matches inner join \
            (select distinct Team.Team_Id from Team inner join \
            Matches on (Team.Team_Id = Matches.Team_Name_Id or Team.Team_Id = Matches.Opponent_Team_Id) \
            and Matches.Season_Id = "+season_id+"  and Team.Team_Name = '"+team_name+"') as Team_Id_Table \
            on (Matches.Team_Name_Id = Team_Id_Table.Team_Id or Matches.Opponent_Team_Id = Team_Id_Table.Team_Id) \
            and Matches.Season_Id = "+season_id+") as Match_Id_Table on Ball_by_Ball.Match_Id = Match_Id_Table.Match_Id \
            group by Ball_by_Ball.Match_Id \
            ) as Table_2 on Ball_by_Ball.Match_Id = Table_2.Match_Id group by Ball_by_Ball.Match_Id,Ball_by_Ball.Innings_Id) as the_Table on Team.Team_Id = the_Table.Team_Batting_Id;\;"
        
        
        connection.query(query,(err,result)=>{
            if(err) throw err;
            final_result['Performance'] = result;
            res.send(final_result);
            
        });
        

    });
        
    
    });

    app.get('/:date',(req,res)=>{
        var date = req.params.date;
    })

}
