# USER ADMINISTRATOR

# Run project
For local run, first build the project with `npm i && npm run build`, then run the project with `npm run start`.

## curl calls for api's
 - get all users `curl -X GET http://localhost:3001/api/v1/user`
 - delete user by id `curl -X DELETE http://localhost:3001/api/v1/user/:id`
 - create new user `curl -X POST -H "Content-Type: application/json" -d "{\"firstName\": \"John\", \"lastName\": \"Doe\", \"emailAddress\": \"john@example.com\", \"password\": \"password123\"}" http://localhost:3001/api/v1/user`
