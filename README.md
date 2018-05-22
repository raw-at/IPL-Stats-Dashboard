### IPL Dashboard 
IPL Dasboard depecits all the data from IPL Season 1 (2008) - IPL Season 8(2016) in graphical format using cards and graphs.

### Approach For The Task
1. No Back-End : 

In This Approach I can easily modify the table as per my own need and can show it to the front-end.I didn't follow this approach as this is not the right approach for scalable applications.

![img_7289](https://user-images.githubusercontent.com/20211990/40013296-cae6a5ec-57ca-11e8-8ee8-a89ce1b6c1f4.jpg)


2. Back-End with Restful API'S :

This is the right approch to tackle these kinds of tasks in production also i created the backend Api's using node.js and express.js
and make them available to front-end.Front-end can now easily access the database's data using these Api's.This approach is highly
scalable and robust.

![img_7290](https://user-images.githubusercontent.com/20211990/40013337-dff512b6-57ca-11e8-891e-f797158687da.jpg)


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


### Screenshots 
#### Home Page
![ipl1](https://user-images.githubusercontent.com/20211990/40380847-cd058930-5e17-11e8-9a03-637f48102236.png)

#### Team-Wise Stats
![ipl2](https://user-images.githubusercontent.com/20211990/40380855-cf0973b8-5e17-11e8-9153-f3e4de7da7ac.png)

#### Date-Wise Stats
![ipl3](https://user-images.githubusercontent.com/20211990/40380858-d07c928e-5e17-11e8-9ea6-acb13675febe.png)


![ipl4](https://user-images.githubusercontent.com/20211990/40380860-d1c1fa4e-5e17-11e8-8e6d-f2aa3efbeaea.png)

 
 
 




