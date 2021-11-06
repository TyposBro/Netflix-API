# Netflix API

This is a simple CRUD REST API for Netflix Clone project.

## Installation

To use clone from [Github](https://Github.com/khasanjonovich/netflix_api_clone), add your [MongoDB](https://www.mongodb.com) private key on [.env file](https://www.npmjs.com/package/dotenv)

```bash
yarn start
```
## or

```bash
npm start
```

## JWT Auth

```bash
#POST
http://localhost:3001/api/auth/login
{
    "username": "admin",
    "password": "<YOUR_PRIVATE_KEY>"
}


#POST - Password is stored in AES encryption format
http://localhost:3001/api/auth/register
{
    "username": "admin",
    "password": "ju5tACoder",
    "email": "ju5tACoder@gmail.com",
    "isAdmin": true
}


```

## User Routes

```bash
#GET - find User by email or username
http://localhost:3001/api/users/find
{
    "username": "ju5tacoder"
}
// or
{
    "email": "ju5tacoder@gmail.com"
}

#PUT - Update User info by ID*
# *request header should containt - token:<jwt_token>
http://localhost:3001/api/users/:id


#DELETE - DELETE User info by ID*
# *request header should containt - token:<jwt_token>
http://localhost:3001/api/users/:id

```

## User Routes (Admin)

```bash
#GET - User List
http://localhost:3001/api/users
{
    "username": "admin",
    "password": "<proccess.env.PRIVATE_KEY>"
}

#GET - User List
http://localhost:3001/api/users/stats
{
    "username": "admin",
    "password": "<proccess.env.PRIVATE_KEY>"
}

```

## Movie/Series Routes

```bash
#GET - Get Movies/Series List
http://localhost:3001/api/movies

# returns Movie/Series Object
{
    title: "String",
    desc: "String",
    img: "URL",
    imgTitle: "URL",
    imgSmall: "URL",
    trailer:  "URL",
    video:  "URL",
    year: "Number",
    limit: "Number",
    genre: "String",
    isSeries: true/false,
}

#GET - Find Movie/Series by genre/year/limit/... etc.
# returns Movie/Series Object
http://localhost:3001/api/movies/find


#GET - Find Movie/Series by ID
# returns Movie/Series Object
http://localhost:3001/api/movies/:id

#GET - Get Random Movie/Series
# returns Movie/Series Object
http://localhost:3001/api/movies/random

```


## Movie/Series Routes (Admin)

```bash
#POST - Add Movie/Series
http://localhost:3001/api/movies
{
    "username": "admin",
    "password": "<proccess.env.PRIVATE_KEY>"
}

#PUT - Update Movie/Series by ID
http://localhost:3001/api/movies/:id
{
    "username": "admin",
    "password": "<proccess.env.PRIVATE_KEY>"
}

#DELETE - DELETE Movie/Series by ID
http://localhost:3001/api/movies/:id
{
    "username": "admin",
    "password": "<proccess.env.PRIVATE_KEY>"
}

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to add/update tests if applicable.

## License
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
