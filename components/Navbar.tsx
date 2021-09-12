import Container from "./container";
import styles from "./Alert.module.css";
import React from "react";
import Link from "next/link";
import { css } from "@emotion/core";

const Navbar = () => {
    return (
        <div className={styles.alert}>
            <Container>
                <div
                    css={css`
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    `}
                >
                    <div
                        css={css`
                            margin: 1rem;
                        `}
                    >
                        <Link as={`/`} href="/">
                            <h3
                                css={css`
                                    font-size: 2rem;
                                `}
                            >
                                W0lf blog
                            </h3>
                        </Link>
                    </div>
                    <ul
                        css={css`
                            display: flex;
                            align-items: center;
                            li {
                                margin: 1rem;
                            }
                        `}
                    >
                        <li>
                            <Link as={`/posts/`} href="/posts">
                                Posts
                            </Link>
                        </li>
                        <li>
                            <Link as={`/about-me/`} href="/aboutme">
                                About me
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;
