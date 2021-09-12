import Post from "../types/post";
import React from "react";
import { Card } from "./Card/Card";
import { css } from "@emotion/core";
import Challenge from "../types/challenge";

type Props = {
    posts: Post[];
    challenges: Challenge[];
};

const MoreStories = ({ posts, challenges }: Props) => {
    return (
        <section>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                More Stories
            </h2>
            <div
                css={css`
                    margin: 1rem;
                `}
                style={{
                    margin: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    `}
                >
                    <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                        Machines
                    </h2>
                    <div
                        css={css`
                            margin: 1rem;
                        `}
                        style={{
                            margin: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                        }}
                    >
                        {posts.map((post) => (
                            <Card
                                key={post.slug}
                                blog={{
                                    title: post.title,
                                    difficulty: post.difficulty,
                                    excerpt: post.excerpt,
                                    slug: post.slug,
                                    author: post.author,
                                    coverImage: post.coverImage,
                                    date: JSON.stringify(post.date),
                                    active: post.active,
                                }}
                                isPost={true}
                            />
                        ))}
                    </div>
                </div>
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    `}
                >
                    <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                        Challenges
                    </h2>
                    <div
                        css={css`
                            margin: 1rem;
                        `}
                        style={{
                            margin: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                        }}
                    >
                        {challenges.map((challenge) => (
                            <Card
                                key={challenge.slug}
                                blog={{
                                    title: challenge.title,
                                    difficulty: challenge.difficulty,
                                    excerpt: challenge.excerpt,
                                    slug: challenge.slug,
                                    author: challenge.author,
                                    coverImage: challenge.coverImage,
                                    date: JSON.stringify(challenge.date),
                                    active: challenge.active,
                                }}
                                isPost={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoreStories;
