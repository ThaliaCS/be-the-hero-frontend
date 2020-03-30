import React, {useState} from 'react';
import './styles.css';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function NewIncident(){

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

   async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }

            })

            history.push('/profile');


        } catch (error){
            alert('Erro ao cadastrar caso, tente novamente.')
        }

    }
    return(

        <div className="new-incident">
            <div className="content">
                <section>
                    <img src = {logoImg} alt="Be the Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                    Voltar para home
                </Link>

                </section>

                <form onSubmit={handleNewIncident}>

                    <input 
                    value={title}
                    placeholder="Nome da Título do caso"
                    onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                    value={description}
                    placeholder="Descrição"
                    onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                    value={value}
                    placeholder="Valor em reais" 
                    onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit"> Cadastrar</button>

                </form>
            </div>

        </div>
    )
}
