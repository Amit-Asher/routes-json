# routes-json
Generate routing constants in Typescript from a given Json file.

The library allows you to manage and maintain your routes in one place,
with easy json format outside your source files.

______________________________________________________________________

### GETTING STARTED
1. clone the project
2. cd to project folder
3. run "yarn" (install dependencies)
4. ts-node src/generate.ts ./example/input.json (dist folder will created)
5. ts-node getting-started/test.ts

### HOW TO USE
1. create Json input file with the following properties:
- domain
- routes
- outfile (optional. default is ./dist/routes.ns.ts)

2. generate typescript routes: "ts-node src/generate.ts <json path>".
3. in tyepscript, import Routes from routes.ns.ts and navigate to the target routes.
  
### REFERENCES

consider the following json:
```javascript
{
    "domain": "sports.yahoo.com",
    "routes": {
        "nba": {
            "news": null,
            "scoreboard": null,
            "teams": {
                "cle": {
                    "stats": null
                },
                "gsw": null
            },
            "players": null,
            "injuries": null
        }
    }
}
```

then, in typescript:
```typescript
Routes.Nba.News.path; // "sports.yahoo.com/nba/news"
Routes.Nba.Scoreboard.path; // "sports.yahoo.com/nba/scoreboard"
Routes.Nba.Teams.Cle.Stats.path; // "sports.yahoo.com/nba/teams/cle/stats"
Routes.Nba.Teams.Gsw.path; // "sports.yahoo.com/nba/teams/gsw"
Routes.Nba.Players.path; // "sports.yahoo.com/nba/players"
Routes.Nba.Injuries.path; // "sports.yahoo.com/nba/injuries"
```

