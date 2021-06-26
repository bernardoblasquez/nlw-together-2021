import { useState, useEffect } from "react";
import { database } from "../Services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    content: string,
    author:{
        name: string,
        avatar: string,
    },
    isHighLighted: string,
    isAnswered: string,
    likes: Record<string,{
        authorId: string;
    }>
} >

type Question = {
    id: string;
    content: string,
    author:{
        name: string,
        avatar: string,
    },
    isHighLighted: string,
    isAnswered: string,
    likeCount: number,
    likeId: string | undefined
}

export function useRoom(roomId: string){
   
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`)

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
                        isAnswered: value.isAnswered,
                        likeCount: Object.values(value.likes ?? {}).length,
                        likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                    }
                )
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)

        })

        return () => {
            roomRef.off('value')
        }

    },[roomId, user?.id])

    

    return {questions, title}
} 

