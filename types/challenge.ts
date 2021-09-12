import Author from "./author";

type ChallengeType = {
    slug: string;
    title: string;
    date: string;
    coverImage: string;
    author: Author;
    excerpt: string;
    ogImage: {
        url: string;
    };
    content: string;
    active: boolean;
    difficulty: string;
};

export default ChallengeType;
