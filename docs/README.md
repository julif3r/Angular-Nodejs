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
* [Roles](#roles)
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
* Role
```
{
    alias   string
    name    string
}
```
* Claim
```
{
    name    string
}
```

* Create Role
    * URL: `/'
    * METHOD: `POST`
    * RESPONSE CODE: `200`
    * RESPONSE FORMAT:
    ```
    {data: {Role}}
    ```
* Create Role claim
    * URL: `/{roleId}/claims'
    * METHOD: `POST`
    * RESPONSE CODE: `200`
    * RESPONSE FORMAT:
    ```
    {data: {Claim}}
    ```
* Delete Role
    * URL: `/'
    * METHOD: `DELETE`
    * RESPONSE CODE: `204`
    * RESPONSE FORMAT:
    ```
    ```
* Fetch Role
    * URL: `/`
    * METHOD: `GET`
    * RESPONSE CODE: `200`
    * RESPONSE FORMAT:
    ```
    {
        data: [
            {Role},
            {Role},
            ...
        ]
    }
    ```
* Fetch Role claims
    * URL: `/{roleId}/claims`
    * METHOD: `GET`
    * RESPONSE CODE: `200`
    * RESPONSE FORMAT:
    ```
    {
        data: [
            {Claim},
            {Claim},
            ...
        ]
    }
    ```
* Get Role
    * URL: `/{roleId}`
    * METHOD: `GET`
    * QUERY PARAMETERS:
    `withClaims{Boolean}`
    * RESPONSE CODE: `200`
    * RESPONSE FORMAT:
    ```
    {data: {model}}
    OR
    {
        data: {
           {Role},
           claims: [
             {Claim},
             ...
           ]
        }
    }
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
    

