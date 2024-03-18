import express from 'express';

import { getUsers, createUser, deleteUser } from './user-logic';

const app = express();
const port = 3001;

app.use(express.json());

const USER_API = "/api/v1/user";

app.get(USER_API, async (req, res) => {
    console.log("get all users list");
    //todo: support pages
    const usersResponse = await getUsers();
    res.status(usersResponse.status);
    res.json(usersResponse.data);
});

app.post(USER_API, async (req, res) => {
    console.log("create new user");
    const response = await createUser(req.body);
    res.status(response.status);
    res.json(response.data);
});

app.delete(`${USER_API}/:id`, async (req, res) => {
    console.log("delete existsing user");
    const userId = req.params.id;
    const response = await deleteUser(userId);
    res.status(response.status);
    res.json(response.data);
});

// Start the server
app.listen(port, () => {
    console.log('Server is running on port 3001');
});

