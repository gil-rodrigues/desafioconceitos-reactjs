import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    var newRep = {
      url: "https://github.com/josepholiveira",
      title: `${Date.now()}`,
      techs: ["React", "Node.js"]
    };

    api.post('/repositories', newRep).then(res => {
      const newRep = res.data;

      setRepositories([...repositories, newRep]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const repos = repositories.filter(rep => rep.id != id);

      setRepositories(repos);

    }).catch((error) => console.log(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(rep => 
            <li key={rep.id}>
              {rep.title}
              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
              </button>
            </li>
          )}
      </ul>


      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
