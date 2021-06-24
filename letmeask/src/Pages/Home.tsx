import { useHistory } from 'react-router';
import { FormEvent, useState } from 'react';
import { Button } from '../Components/Button'
import { useAuth } from '../hooks/useAuth';
import { database } from '../Services/firebase';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'


export  function Home(){

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState(''); 

    async function handleCreateRoom(event: FormEvent){
        
        event.preventDefault();

        if (!user){
            await signInWithGoogle()
        }

        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if (roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        console.log(roomRef)

        if (!roomRef.exists()){
            alert("Room does not exists");
            return;
        }

        history.push(`rooms/${roomCode}`)

    }

    
    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência dem tempo-real</p>
            </aside>
            

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmask" />
                    
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o google
                    </button>

                    <div className="separator">
                        ou entre em uma sala
                    </div>

                    <form action="" onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala" 
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}/>

                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>

        </div>
        
    )
} 