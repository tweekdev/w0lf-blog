import React from "react";
import Container from "../components/container";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import { getAllChallenges, getAllPosts } from "../lib/api";
import Post from "../types/post";
import Challenge from "../types/challenge";
type Props = {
    allPosts: Post[];
    allChallenges: Challenge[];
};

const posts = ({ allPosts, allChallenges }: Props) => {
    const morePosts = allPosts.slice(1);
    return (
        <>
            <Layout>
                <Container>
                    {morePosts.length > 0 && (
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
export default posts;
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
