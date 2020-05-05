import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    //setRepositories([...repositories, `Novo Projeto ${Date.now()}`]);

    const response = await api.post("/repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Novo Repositório ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"],
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((response) => {
      setRepositories(
        repositories.filter((repositorie) => repositorie.id !== id)
      );
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
