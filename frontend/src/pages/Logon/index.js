import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import * as HttpStatus from 'http-status-codes';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Logon() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useState(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      history.push('/profile');
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    api.post('authenticate', { email, password })
      .then(response => {

        if (response.status === HttpStatus.UNAUTHORIZED) {
          sessionStorage.clear();
          toast.error('Parece que sua sessão expirou. Faça o login novamente');
          history.push('/');
        }

        const { ong, token } = response.data;

        localStorage.setItem('ongId', ong.id);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('ongName', ong.name);

        history.push('/profile');
      }).catch(error => {
        const { NOT_FOUND, BAD_REQUEST } = HttpStatus;
        if (~[NOT_FOUND, BAD_REQUEST].indexOf(error.response.status)) {
          toast.error('Login inválido');
        } else {
          toast.error('Falha no login. Tente novamente');
        }
      })
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
