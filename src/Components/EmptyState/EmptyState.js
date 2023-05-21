import EmptyStateLottie from "./empty-state.json"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import "./emptystate.css"

function EmptyState() {

    return (
        <div className="empystate_container">
            <div>There currently is no registered employee</div>
            <Player
                autoplay
                loop
                src={EmptyStateLottie}
                style={{ height: '300px', width: '300px' }}
            >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
        </div>
    )
}

export default EmptyState;