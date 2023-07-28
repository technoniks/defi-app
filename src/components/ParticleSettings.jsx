import { Component, useCallback } from "react";
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
                    particles: {
                        number: {
                            value: 200,
                        },
                        size: {
                            value: 2
                        },
                        color: {
                          value: "#ffffff"
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 3,
                            straight: false,
                        },
                    }
                }} 
                />

        </div>
        )
    }

export default ParticleSettings