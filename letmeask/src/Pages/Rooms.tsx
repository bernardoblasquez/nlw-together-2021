import { useParams } from 'react-router'; 
import logoImg from '../assets/images/logo.svg'
import { Button } from '../Components/Button';
import { RoomCode } from '../Components/RoomCode';

import '../styles/room.scss';

type RoomParams = {
    id: string
}

export function Room(){

    const roomId = useParams<RoomParams>();

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId.id}/>
                </div>
            </header>

            <main className="content">
                
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 Perguntas</span>
                </div>

                <form action="">
                    <textarea placeholder="O que vc quer perguntar?" />
                    
                    <div className="form-footer">
                        <span>Para enviar uma pergunta <button>faça seu login</button>.</span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                    
                </form>
            </main>

        </div>

        
    );
}