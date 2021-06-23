import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../Components/Button'
import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth'
import { database } from '../Services/firebase'

export  function NewRoom(){
    
    const { user } = useAuth()
    const history= useHistory()
    const [newRoom, setNewRoom] = useState('')
    
    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if (newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms')

        console.log(newRoom)

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/rooms/${firebaseRoom.key}`)
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

                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>

                    <form action="" onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala" 
                            onChange={event => setNewRoom(event.target.value)}/>
                        <Button >
                            Criar na sala
                        </Button>
                    </form>

                    <p>
                        Quer entrar em uma nova sala <Link to="/"> clique aqui</Link>
                    </p>
                </div>
            </main>

        </div>
        
    )
} 