import { css } from "@emotion/core";
import Link from "next/link";

import React from "react";

export const Actions: React.FC<{
    slug: string;
    picture: string;
    isPost: boolean;
}> = ({ slug, picture, isPost }) => {
    return (
        <div
            className="actions"
            css={css`
                width: 100%;
                height: 75%;
                position: absolute;
                bottom: 0rem;
                z-index: 2;
                padding: 1rem 0;
                button,
                a {
                    margin: 16px;
                }
            `}
        >
            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                `}
            >
                {picture ? (
                    <div
                        css={css`
                            width: 100%;
                            height: 10rem;
                            padding: 1rem;
                        `}
                    >
                        <img src={picture} alt="" />
                    </div>
                ) : null}

                <div>
                    <Link
                        as={`/${isPost ? "posts" : "challenges"}/${slug}`}
                        href={`/${isPost ? "posts" : "challenges"}/[slug]`}
                    >
                        <button
                            css={css`
                                padding: 0.25rem 0.5rem;
                                font-size: 0.765625rem;
                                line-height: 1.5;
                                border-radius: 0.2rem;
                                color: #9fef00;
                                background-color: transparent;
                                border: 1px solid transparent;
                                border-color: #9fef00;
                            `}
                        >
                            Open acticle
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
