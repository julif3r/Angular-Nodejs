# SHK PILOT


## FOR DEVELOPERS

[REST DOCUMENTATION](#endpoints)

[RUN PROJECT](#run-project)

### RUN PROJECT

#### Docker
* Install docker
* From the main directory run `docker-compose build`
* Run `docker-compose up -d`
* To run API 
    * Open new terminal (terminal tab) and run `dockcer exec -it shk-pilot-api bash`. Now you are inside the api container
    * Then run `npm install` and `npm start`. Do not close this tab
* To run WEB 
    * Open new terminal (terminal tab) and run `dockcer exec -it shk-pilot-web bash`. Now you are inside the api container
    * Then run `npm install` and `npm start`. Do not close this tab

#### Only database
* From main direcvory run `docker-compose up api_db`



### Endpoints
* [Authentication / Login](#authentication)
* [Users](#users)


#### Authentication

BASE URL: `/`

* Login user
    * URL: `/login`
    * METHOD: `POST`
    * CONSUMES:
    ```
    {
        email       string 
        password    string
    }
    ```
    * RESPONSE FORMAT:
    ```
     {data: {token: token}}
    ```

#### Roles

BASE URL: `/roles`

MODEL:
```
{
    alias   string
    name    string
}
```

* Create Role
    * URL: `/'
    * METHOD: `POST`
    * RESPONSE CODE: `200`
    * RESPONSE FORMAT:
    ```
    {data: {model}}
    ```
* Delete Role
    * URL: `/'
    * METHOD: `DELETE`
    * RESPONSE CODE: `204`
    * RESPONSE FORMAT:
    ```
    {data: {model}}
    ```

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
* Create User
    * URL: `/`
    * METHOD: `POST`
    * RESPONSE CODE: `201`
    * RESPONSE:
    ```
    {data: {model}}
    ```
* Delete User
    * URL: `/{userId}`
    * METHOD: `DELETE`
    * RESPONSE CODE: `204`
    * RESPONSE: `void`
* Fetch Users
    * URL: `/`
    * METHOD: `GET`
    * RESPONSE: 
    ```
    {
        data: [
            {model},
            {model},
            ...
        ]
    }
    ```
* Get User
    * URL: `/{userId}`
    * METHOD: `GET`
    * RESPONSE:
    ```
    {data: {model}}
    ```
* Update User
    * URL: `/{userId}`
    * METHOD: `PUT`
    * RESPONSE FORMAT:
    ```
    {data:{model}}
    ```
    

