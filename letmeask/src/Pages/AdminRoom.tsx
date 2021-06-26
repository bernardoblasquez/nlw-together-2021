import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router'; 
import { FormEvent } from 'react';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../Components/Button';
import { RoomCode } from '../Components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../Services/firebase';
import { Questions } from '../Components/Questions';
import { useRoom } from '../hooks/useRoom';

import deleteImg from '../assets/images/delete.svg'
import '../styles/room.scss'; 

type RoomParams = {
    id: string
}

export function AdminRoom(){

   // const { user } = useAuth()    
    const history = useHistory()
    const roomId = useParams<RoomParams>();

    const {questions, title} = useRoom(roomId.id)
   
    async function handleEndRoom() {
        
        await database.ref(`rooms/${roomId.id}`).update({
            endedAt: new Date()
        })

        history.push('/')
        
    }

    async function handleDeleteQuestion( questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId.id}/questions/${questionId}`).remove()
        }

        
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId.id}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar a Sala </Button>
                    </div>
                    
                </div>
            </header>

            <main className="content">
                
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span> {questions.length} perguntas</span>}
                </div>
                
                <div className="question-list">
                    {questions.map((question, key) => {
                        
                        return(
                            <Questions 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="" />
                                </button>
                            </Questions>
                        )
                    })}
                </div>
                    
                
            </main>

        </div>

        
    );
}