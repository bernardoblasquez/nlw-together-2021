import '../styles/questions.scss'

type QuestionsProps = {
    content: string
    author:{
        name: string,
        avatar: string;
    }
}


export function Questions({ content, author }:QuestionsProps) {
  
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
  );
}
