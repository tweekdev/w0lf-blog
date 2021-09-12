import { css } from "@emotion/core";
import Particles from "react-tsparticles";

const Intro = () => {
    return (
        <section
            css={css`
                height: 95vh;
                margin: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
            `}
        >
            <Particles
                css={css`
                    position: absolute;
                    height: 100vh;
                `}
                id="tsparticles"
                options={{
                    particles: {
                        number: {
                            value: 400,
                            density: {
                                enable: true,
                                value_area: 3000,
                            },
                        },
                        color: {
                            value: "#9fef00",
                        },
                        shape: {
                            type: "circle",
                            stroke: {
                                width: 0,
                                color: "#000000",
                            },
                            polygon: {
                                nb_sides: 3,
                            },
                            image: {
                                src: "img/github.svg",
                                width: 100,
                                height: 100,
                            },
                        },
                        opacity: {
                            value: 0.5,
                            random: false,
                            anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false,
                            },
                        },
                        size: {
                            value: 2,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 5,
                                size_min: 0,
                                sync: false,
                            },
                        },
                        line_linked: {
                            enable: false,
                            distance: 176.3753266952075,
                            color: "#ffffff",
                            opacity: 0.4,
                            width: 2,
                        },
                        move: {
                            enable: true,
                            speed: 7.9,
                            direction: "top",
                            random: true,
                            straight: false,
                            out_mode: "out",
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200,
                            },
                        },
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: false,
                                mode: "bubble",
                            },
                            onclick: {
                                enable: false,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            grab: {
                                distance: 400,
                                line_linked: {
                                    opacity: 0.4771227850808645,
                                },
                            },
                            bubble: {
                                distance: 400,
                                size: 4,
                                duration: 0.3248308849205381,
                                opacity: 8,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                            push: {
                                particles_nb: 4,
                            },
                            remove: {
                                particles_nb: 2,
                            },
                        },
                    },
                    retina_detect: true,
                }}
            ></Particles>
            <h1
                className={"text-3xl  lg:text-5xl xl:text-8xl	"}
                css={css`
                    font-weight: 900;
                `}
            >
                W0lf Blog.
            </h1>
            <div
                css={css`
                    margin-top: 5rem;
                    text-align: center;
                `}
            >
                <h2
                    className={"text-2xl lg:text-4xl xl:text-7xl"}
                    css={css`
                        font-weight: 800;
                    `}
                >
                    A Massive blog Hacking CTF
                </h2>
            </div>
        </section>
    );
};

export default Intro;
