 import copyImg from '../assets/images/copy.svg'
 import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {

    function copyCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code">
            <div>
                <img src={copyImg} alt="" />
            </div>
            <span onClick={copyCodeToClipboard}>
                Sala #{props.code}
            </span>
        </button>
    ) 
}