#IMDB Simple
This project creates a simple title search using the freely available [imdb-api](https://imdb-api.com/). It currently retrieves the most recent title matching the search and 5 alternate options. It then displays them using their IMDB poster image, title, and year of release. 

##API

The free version is limited to 100 calls, and when developing for yourself you will need your own API key.
This is placed in config.js as an object and should be added to .gitIgnore if it isn't already. The object is formatted like so:

```
const config = {
    APIKey : [your API as string]
};

```

##The JSON results from this call outputs roughly like this:

```
 "searchType": "Title",
        "expression": "Return to the House",
            "results": [
                { "id": "tt0464587", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BZDY1YTFlMTgtNGI2NC00MGI0LWI2MDktZmMwMTkyNjAwZDAwXkEyXkFqcGdeQXVyMjEzNTcyNzk@._V1_Ratio1.5000_AL_.jpg", "title": "Return to the House of Pain", "description": "(1988) (Video)" },
                { "id": "tt16517690", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BNjhmNzZmMDUtNzIyYi00MTdjLWIwZjAtMDk4NjhmNDY2ODI2XkEyXkFqcGdeQXVyMTM1MjI2OTYx._V1_Ratio1.0000_AL_.jpg", "title": "Return to the House of Secrets", "description": "(2019) (Podcast Episode) - Dateline NBC Podcast (2019) (Podcast Series)" },
                { "id": "tt3910456", "resultType": "Title", "image": "https://imdb-api.com/images/original/nopicture.jpg", "title": "Return to the Doghouse", "description": "(2009) (Short)" },
                { "id": "tt0827782", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BMjg2NDYxNTg1MV5BMl5BanBnXkFtZTgwMzE5NjAwNzE@._V1_Ratio0.7273_AL_.jpg", "title": "Return to House on Haunted Hill", "description": "(2007) (Video)" },
                { "id": "tt12769994", "resultType": "Title", "image": "https://imdb-api.com/images/original/nopicture.jpg", "title": "Return to the Haunted House", "description": "(2020) (Short)" },
                { "id": "tt11466194", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BMjkyNTA2ZmEtOWM4Zi00MDc4LTlmOWUtNjg2MTMwZDEwODgyXkEyXkFqcGdeQXVyMTA1MjE5NTUz._V1_Ratio0.7273_AL_.jpg", "title": "Return to the Holy Land", "description": "(2018) (TV Movie)" },
                { "id": "tt1691153", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BMTQwMDgyNTYxNl5BMl5BanBnXkFtZTcwNjcwMzY2Ng@@._V1_Ratio0.7727_AL_.jpg", "title": "Return to the Hiding Place", "description": "(2013)" }
            ],
                "errorMessage": ""
```
To-Do:
- Generate basic alt-text for posters to improve accessibility. 
- Improve styling. Currently incredibly basic and could use some care.
- Possibly add a movie/tv show toggle. Currently gets both, may make the search more accurate.
