const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repo = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoriesIndex = repositories.findIndex(repo => repo.id === id);

  if(repositoriesIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const likes = repositories[repositoriesIndex].likes;

  const repo = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositoriesIndex] = repo;

  return response.json(repo);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repo => repo.id === id);

  if(repositoriesIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repo => repo.id === id);

  if(repositoriesIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const { title, url, techs }  = repositories[repositoriesIndex];
  const likes = repositories[repositoriesIndex].likes + 1;

  const repo = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositoriesIndex] = repo;

  return response.json(repo);

});

module.exports = app;
