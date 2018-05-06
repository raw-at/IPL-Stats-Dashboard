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
}