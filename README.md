# Games Collection (gamescollection_be)
This project is the back end of my games collection app. The app consists of a tool to have an on-hand inventory of my video games collection to avoid purchasing duplicates or for quick consulting.

The project idea is to be used by me only, however, it could escalate in future versions.

## Technologies
* NodeJS
* express
* MySQL
* JWT (JSON Web Token)

## Setup & usage
This project is meant to be used alongside [gamescollection_fe](https://github.com/keff6/gamescollection_fe), which provides the front-end for this project. However, if you want to run the app alone ant test it with tools like postman it will work just fine.


### repo code
+ Git clone the repo
+ npm install
+ runs with *npm run dev*
+ the app is served on [http://localhost:3030](http://localhost:3030)

### database
You can find the database creation script inside the code of this repository (db_queries folder). Run the scripts and don't forget to create and fill a .env file based on the .env.example with your own data.

### user
To create an user to login on the app, you could use the api endpoint [/users/add](http://localhost:3030/users/add). 
The body for the post request should look like:

```json
{
	"name": "",
	"userName": "",
	"password": "",
}
```

