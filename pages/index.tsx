import React from "react";
import { GetServerSideProps } from "next";
import useSWR from "swr";

import prisma from "../lib/prisma"
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import Person from "../components/Person";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  })
  return { props: { feed } };
};

const fetcher = (url) => fetch(url).then((res) => res.json());

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { data, error } = useSWR("/api/people", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          <h1>Next JS</h1>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}

          <ul>
            {data.map((p, i) => (
              <Person key={i} person={p} />
            ))}
          </ul>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
