import React, { useState } from "react";
import Link from "next/link";
import { css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav
            css={css`
                background: #121927;
            `}
            className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3"
        >
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link as={`/`} href="/">
                        <h3 className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                            W0lf Blog
                        </h3>
                    </Link>

                    <button
                        className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            css={css`
                                height: 1rem;
                                color: #9fef00;
                            `}
                        />
                    </button>
                </div>
                <div
                    className={
                        "lg:flex flex-grow items-center" +
                        (navbarOpen ? " flex" : " hidden")
                    }
                    id="example-navbar-danger"
                >
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        <li>
                            <Link as={`/posts/`} href="/posts">
                                <span className="ml-2 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                    Posts
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link as={`/about-me/`} href="/aboutme">
                                <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ml-2">
                                    About me
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
