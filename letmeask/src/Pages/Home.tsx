import { useHistory } from 'react-router'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../Components/Button'
import '../styles/auth.scss'

export  function Home(){

    const history = useHistory();

    function navigateTonewRomm(){
        history.push('/rooms/new')
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
                    
                    <button className="create-room" onClick={navigateTonewRomm}>
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o google
                    </button>

                    <div className="separator">
                        ou entre em uma sala
                    </div>

                    <form action="">
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala" />
                        <Button>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>

        </div>
        
    )
} 