import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { useState } from 'react';
import api from '../../services/api';
import { isAuthenticated } from '../../Validators/AuthValidator';


export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/');
      toast.info('Parece que sua sessão expirou! Faça login novamente.');
    }
  }, [history]);

  async function handleNewIncident(e) {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    const data = { title, description, value };

    api.post('/incidents', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(() => history.push('/profile'))
      .catch(error => {
        if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error('Erro ao fazer cadastro. Tente novamente.');
        }
      });
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para perfil
          </Link>

        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
