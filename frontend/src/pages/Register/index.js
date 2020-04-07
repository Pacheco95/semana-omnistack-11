import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  function handleRegister(e) {
    e.preventDefault();

    const ongData = { name, password, email, whatsapp, city, uf };

    api.post('/ongs', ongData)
      .then(() => api.post('authenticate', { email, password }))
      .then(authResponse => {
        const { ong, token } = authResponse.data;

        localStorage.setItem('ongId', ong.id);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('ongName', ong.name);

        history.push('/profile');
      })
      .catch(error => {
        if (error.response?.data?.validation) {
          toast.error(error.response.data.message);
        } else if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error('Erro ao fazer cadastro. Tente novamente.');
        }
      });
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>

        </section>

        <form onSubmit={handleRegister}>
          <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} />
          {/* TODO limit password to 30 chars */}
          <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          <div className="input-group">
            <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
            <input placeholder="UF" style={{ width: 80 }} value={uf} onChange={e => setUf(e.target.value)} />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
