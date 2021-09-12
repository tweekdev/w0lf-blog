import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");
const challengesDirectory = join(process.cwd(), "_challenges");

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}
export function getChallengesSlugs() {
    return fs.readdirSync(challengesDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    type Items = {
        [key: string]: string;
    };

    const items: Items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }

        if (data[field]) {
            items[field] = data[field];
        }
    });

    return items;
}

export function getChallengesBySlugs(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(challengesDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    type Items = {
        [key: string]: string;
    };

    const items: Items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }

        if (data[field]) {
            items[field] = data[field];
        }
    });

    return items;
}
export function getAllPosts(fields: string[] = []) {
    const slugs = getPostSlugs();
    const posts = slugs.map((slug) => getPostBySlug(slug, fields));
    // sort posts by date in descending order
    //.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

export function getAllChallenges(fields: string[] = []) {
    const slugs = getChallengesSlugs();
    const challenges = slugs
        .map((slug: string) => getChallengesBySlugs(slug, fields))
        // sort challenges by date in descending order
        .sort((challenge1, challenge2) =>
            challenge1.date > challenge2.date ? -1 : 1,
        );
    return challenges;
}
