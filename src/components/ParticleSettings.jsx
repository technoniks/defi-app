import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

function ParticleSettings() {
    const init =  async (engine) => {
        await loadFull(engine)
    }
    const loaded = async (container) => {
        //console.log(container);
    }
    return (
        <div>
            <Particles 
                id="tsparticles"
                height="1000px"
                width="100vw"
                init={init}
                loaded={loaded}
                options={{
                    background: {
                        color: {
                            value: "#0d47a1"
                        }
                    },
                    interactivity:{
                        detect_on: 'canvas',
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push'
                            }
                        }
                    },
                    particles: {
                        number: {
                            density: {
                                enable: true,
                                value_area: 800
                            },
                            value: 100,
                        },
                        size: {
                            random: true,
                            value: 2
                        },
                        color: {
                          value: "#ffffff"
                        },
                        shape: {
                          type: 'circle'  
                        },
                        links: {
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: .5,
                            width: 1
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed:3,
                            straight: false,
                        },
                        opacity: 0.5,
                        collisions: {
                            enable: true
                        }
                    }
                }} 
                />

        </div>
        )
    }

export default ParticleSettings