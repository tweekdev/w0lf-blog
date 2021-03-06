import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllChallenges, getAllPosts } from "../lib/api";
import Post from "../types/post";
import Challenge from "../types/challenge";
import React from "react";
type Props = {
    allPosts: Post[];
    allChallenges: Challenge[];
};

const Index = ({ allPosts, allChallenges }: Props) => {
    return (
        <>
            <Layout>
                <Container>
                    <Intro />
                    <div></div>
                    {allPosts.length > 0 && (
                        <MoreStories
                            posts={allPosts}
                            challenges={allChallenges}
                        />
                    )}
                </Container>
            </Layout>
        </>
    );
};

export default Index;

export const getStaticProps = async () => {
    const allPosts = getAllPosts([
        "title",
        "date",
        "slug",
        "author",
        "coverImage",
        "excerpt",
        "difficulty",
        "active",
    ]);
    const allChallenges = getAllChallenges([
        "title",
        "date",
        "slug",
        "author",
        "coverImage",
        "excerpt",
        "difficulty",
        "active",
    ]);

    return {
        props: { allPosts, allChallenges },
    };
};
