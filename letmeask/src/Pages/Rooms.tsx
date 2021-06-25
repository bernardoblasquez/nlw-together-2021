import { useState, useEffect } from 'react';
import { useParams } from 'react-router'; 
import { FormEvent } from 'react';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../Components/Button';
import { RoomCode } from '../Components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../Services/firebase';

import '../styles/room.scss';
import { Questions } from '../Components/Questions';

type FirebaseQuestions = Record<string, {
    content: string,
    author:{
        name: string,
        avatar: string,
    },
    isHighLighted: string,
    isAnswered: string
} >

type Question = {
    id: string;
    content: string,
    author:{
        name: string,
        avatar: string,
    },
    isHighLighted: string,
    isAnswered: string
}

type RoomParams = {
    id: string
}

export function Room(){

    const { user } = useAuth()
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('')
    const roomId = useParams<RoomParams>();

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId.id}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions = databaseRoom.questions as FirebaseQuestions ?? {}
            const parsedQuestions  = Object.entries(firebaseQuestions).map(([key, value]) => {
                return(
                    {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighLighted: value.isHighLighted,
                        isAnswered: value.isAnswered
                    }
                )
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)

        })

    },[])

    async function handleSendQuastion(event: FormEvent) {
        
        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }

        if (!user){
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId.id}/questions`).push(question);

        setNewQuestion('')
    }

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
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span> {questions.length} perguntas</span>}
                </div>

                <form action="" onSubmit={handleSendQuastion}>
                    <textarea 
                        placeholder="O que vc quer perguntar?" 
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ):(
                            <span>Para enviar uma pergunta <button>faça seu login</button></span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                    
                </form>
                
                <div className="question-list">
                    {questions.map((question, key) => {
                        
                        return(
                            <Questions 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })}
                </div>
                    
                
            </main>

        </div>

        
    );
}