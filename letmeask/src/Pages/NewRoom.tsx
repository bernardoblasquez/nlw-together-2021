import { Link } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../Components/Button'
import '../styles/auth.scss'

export  function NewRoom(){
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
                   
                    <h2>Criar uma nova sala</h2>

                    <form action="">
                        <input 
                            type="text" 
                            placeholder="Nome da sala" />
                        <Button>
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