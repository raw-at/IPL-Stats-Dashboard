### IPL Dashboard 
IPL Dasboard depecits all the data from IPL Season 1 (2008) - IPL Season 8(2016) in graphical format using cards and graphs.

### Approach For The Task
1. No Back-End : 

In This Approach I can easily modify the table as per my own need and can show it to the front-end.I didn't follow this approach as 
this is not the right approch as this approch is not scable and highly static in nature.

2. Back-End with Restful API'S :

This is the right approch to tackle these kinds of tasks in production also i created the backend Api's using node.js and express.js
and make them available to front-end.Front-end can now easily access the database's data using these Api's.This approach is highly
scalable and robust.

Only Problem occur here is that data which is required is highly relational and kaggle csv files provided are not is right format which is need to show the exact information, that's why data extraction is little difficult with
api's as query for data exctration are highly depend upon "DATABASE JOINS" that's why apps responses a little slow due to database query setbacks.
This can be improved by filling the database with the exact related files and by exploring the data files before saving to the database.



### Front-End Specifications :
Framework : React.js 

State Management : Redux

Package Bundler : Webpack 4

ECMA Comipler : Babel.js 

#### Breif Explanation Regarding Front-End Specs:
React.js is used for building for stateless and stateful components for the web-app ,the main benefit of using react.js is that 
it's good for handling and creation of components .

Redux is used for state management of the react app so that state data can be managed and accessed from different components without
any problem or overhead work.

Webpack and Babel.js is used for making build files for production setup .Babel converts ECMA6 syntax to vanilla js and webpack helps to
bundle all the js,html,css files into a single bundle file so that production code is easy to deploy .

### Back-End Specification 
Framework : Node.js ,Express.js 

Database : Mysql (As Kaggle data was highly relational)

#### Breif Explanation Regarding Back-End Specs:

Node.js is used for writing backend API's and helps the front-end react app to communicate with database(Mysql) 



### Bonus Point
* Vue.js : Not Used 

* Mobile Responsive : Yes 


App is mobile responsive so that mobile user can easily access it . To make it mobile responsive i used bootstrap library for 
most of the front-end part .


    
* Optimize Loading Time : Yes 


During Webpack bundling I used Lazy Loading Tecnique so that initial bundle which is required to run the app is of minimum
size and app can easily start up and when the user load other pages ,he/she will get the other small bundles of js accordingly
This saves a lot of time during app starting process


* Progressive Web-App : Not Completely
 
* Offline Usable : No as service workers are not written up 
 
 
 




