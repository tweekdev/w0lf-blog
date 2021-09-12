import { css } from "@emotion/core";
import React from "react";

import { Actions } from "./Actions";
import { Banner } from "./Banner";
import { Details } from "./Details";

export const Card: React.FC<{
    blog: {
        title: string;
        excerpt: string;
        author: { name: string; picture: string };
        coverImage: string;
        active: boolean;
        slug: string;
        date: string;
        difficulty: string;
    };
    isPost: boolean;
}> = ({ blog, isPost }) => {
    return (
        <div
            css={css`
                background-color: #151d2b;
                border-radius: 16px;
                width: 18rem;
                height: calc(16.5rem + 88px);
                position: relative;
                transition: 0.2s all;
                margin: 1rem;
                :after {
                    border-radius: 16px;
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: 0.2s all;
                }
                :hover {
                    transform: scale(1.01);
                    :after {
                        opacity: 1;
                    }
                    .banner {
                        opacity: 0;
                        transform: scale(0);
                    }
                    .delimiter {
                        opacity: 0;
                        transform: scale(0);
                    }
                    .header-details {
                        transform: translateY(-90px);
                    }
                    .details {
                        opacity: 0;
                        transform: scale(0);
                    }
                    .actions {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .banner {
                    opacity: 1;
                    transform: scale(1);
                    transition: 0.2s all;
                }
                .delimiter {
                    opacity: 1;
                    transform: scale(1);
                    transition: 0.2s all;
                }
                .header-details {
                    transform: translateY(0);
                    transition: 0.2s all;
                }
                .details {
                    opacity: 1;
                    transform: scale(1);
                    transition: 0.2s all;
                }
                .actions {
                    opacity: 0;
                    transform: scale(0);
                    transition: 0.2s all;
                }
                :focus-within {
                    transform: scale(1.01);
                    :after {
                        opacity: 1;
                    }
                    .banner {
                        opacity: 0;
                        transform: scale(0);
                    }
                    .header-details {
                        transform: translateY(-90px);
                    }
                    .delimiter {
                        opacity: 0;
                        transform: scale(0);
                    }
                    .details {
                        opacity: 0;
                        transform: scale(0);
                    }
                    .actions {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}
        >
            <Banner
                active={blog.active}
                difficulty={blog.difficulty}
                date={blog.date}
            />
            <div
                className="delimiter"
                style={{
                    height: "16px",
                    background:
                        "linear-gradient(0deg, rgb(22 29 43) 0.17%, rgb(22 29 43) 57.34%, #1a2332 99.98%)",
                    backgroundBlendMode: "multiply",
                }}
            ></div>
            <Details
                title={blog.title}
                coverImage={blog.coverImage}
                excerpt={blog.excerpt}
                author={blog.author}
            />

            <Actions
                isPost={isPost}
                slug={blog.slug}
                picture={blog.coverImage}
            />
        </div>
    );
};
