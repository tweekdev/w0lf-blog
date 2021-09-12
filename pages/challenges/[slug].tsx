import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getAllChallenges, getChallengesBySlugs } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import PostType from "../../types/post";
import ChallengeType from "../../types/challenge";
import React from "react";
type Props = {
    challenge: ChallengeType;
    morePosts: PostType[];
    preview?: boolean;
};

const Challenge = ({ challenge, morePosts, preview }: Props) => {
    const router = useRouter();
    if (!router.isFallback && !challenge?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <Layout preview={preview}>
            <Container>
                <Header />
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article className="mb-32">
                            <Head>
                                <title>
                                    {challenge.title} | Next.js Blog Example
                                    with {CMS_NAME}
                                </title>
                                <meta
                                    property="og:image"
                                    content={challenge.ogImage.url}
                                />
                            </Head>
                            <PostHeader
                                title={challenge.title}
                                coverImage={challenge.coverImage}
                                date={challenge.date}
                                author={challenge.author}
                            />
                            <PostBody content={challenge.content} />
                        </article>
                    </>
                )}
            </Container>
        </Layout>
    );
};

export default Challenge;

type Params = {
    params: {
        slug: string;
    };
};

export async function getStaticProps({ params }: Params) {
    const challenge = getChallengesBySlugs(params.slug, [
        "title",
        "date",
        "slug",
        "author",
        "content",
        "ogImage",
        "coverImage",
        "active",
        "difficulty",
    ]);
    const content = await markdownToHtml(challenge.content || "");

    return {
        props: {
            challenge: {
                ...challenge,
                content,
            },
        },
    };
}

export async function getStaticPaths() {
    const challenges = getAllChallenges(["slug"]);

    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        paths: challenges.map((challenge) => {
            return {
                params: {
                    slug: challenge.slug,
                },
            };
        }),
        fallback: false,
    };
}
