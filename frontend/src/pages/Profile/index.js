import React, { useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as HttpStatus from 'http-status-codes';

import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';
import { useState } from 'react';

export default function Profile() {

  const history = useHistory();

  const ongName = localStorage.getItem('ongName');
  const accessToken = localStorage.getItem('accessToken');

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      setIncidents(response.data);
    }).catch(err => {
      if (err.response.status === HttpStatus.UNAUTHORIZED) {
        toast.info('Sua sessão expirou. Faça login novamente');
        history.push('/');
      } else {
        toast.error('Falha ao tentar encontrar os casos. Tente fazer login novamente');
      }
    })
  }, [accessToken, history]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      toast.error('Erro ao deletar caso. Tente novamente');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  const ProfileHeader = () => (
    <header>
      <img src={logoImg} alt="Be The Hero" />
      <span>Bem vinda, <strong style={{color: "#e02041"}}>{ongName}</strong></span>

      <Link className="button" to="incidents/new" >Cadastrar novo caso</Link>

      <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#e02041" />
      </button>
    </header>
  );

  if (incidents.length > 0) {
    return (
      <div className="profile-container">
        <ProfileHeader />

        <h1>Casos cadastrados</h1>

        <ul>
          {incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="profile-container">
        <ProfileHeader />

        <h1>Você ainda não possui casos cadastrados</h1>
      </div>
    );
  }
}
