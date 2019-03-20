# SHK PILOT


## FOR DEVELOPERS

[REST DOCUMENTATION](#endpoints)

[RUN PROJECT](#run-project)

### RUN PROJECT
* Install docker
* From the main directory run `docker-compose build`
* Run `docker-compose up -d`
* To run API 
    * Open new terminal (terminal tab) and run `dockcer exec -it shk-pilot-api bash`. Now you are inside the api container
    * Then run `npm install` and `npm start`. Do not close this tab
* To run WEB 
    * Open new terminal (terminal tab) and run `dockcer exec -it shk-pilot-web bash`. Now you are inside the api container
    * Then run `npm install` and `npm start`. Do not close this tab


### Endpoints
* [Users](#users)

#### Users

BASE URL: `/users`

MODEL: 
```
{
    firstName    string
    lastName     string
    email        string
}
```
* Delete User
    * URL: `/{userId}`
    * METHOD: `DELETE`
    * RESPONSE FORMAT:
    ```
    {}
    ```
* Create User
    * URL: `/`
    * METHOD: `POST`
    * RESPONSE FORMAT:
    ```
    {model}
    ```
* Get User
    * URL: `/{userId}`
    * METHOD: `GET`
    * RESPONSE FORMAT:
    ```
    {model}
    ```
* Fetch Users
    * URL: `/`
    * METHOD: `GET`
    * RESPONSE FORMAT: 
    ```
    [
        {model},
        {model},
        ...
    ]
    ```
* Update User
    * URL: `/{userId}`
    * METHOD: `PUT`
    * RESPONSE FORMAT:
    ```
    {model}
    ```
    

