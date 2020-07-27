import React, { useState, useEffect }  from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setrepositories] = useState([]);
  useEffect(()=>{
    api.get('repositories').then(response =>{
      setrepositories(response.data);
    })
  }, []);
  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title:`Novo repository ${Date.now()}`,
      url: "http://github.com/...", 
      techs: "['Node.js, ...']", 
      likes: 0
    });
    const repository = response.data;
  
    setrepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const repository = response.data;
    setrepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
