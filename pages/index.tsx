import React from 'react'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { gql } from '@apollo/client'

import prisma from '../lib/prisma'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import Person from '../components/Person'
import client from '../apollo-client'

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })

  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  })

  return { props: { feed, countries: data.countries.slice(0, 4) } }
}

const fetcher = (url) => fetch(url).then((res) => res.json())

type Props = {
  feed: PostProps[]
  countries: any
}

const Blog: React.FC<Props> = (props) => {
  const { data, error } = useSWR('/api/people', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <div className="page bg-red-500">
        <h1>Public Feed</h1>
        <main>
          <h1>Next JS</h1>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}

          <ul>
            {props.countries.map((country) => (
              <div key={country.code}>
                <h3>
                  <a
                    href="#country-name"
                    aria-hidden="true"
                    className="aal_anchor"
                    id="country-name"
                  >
                    <svg
                      aria-hidden="true"
                      className="aal_svg"
                      height="16"
                      version="1.1"
                      viewBox="0 0 16 16"
                      width="16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                      ></path>
                    </svg>
                  </a>
                  {country.name}
                </h3>
                <p>
                  {country.code} - {country.emoji}
                </p>
              </div>
            ))}
          </ul>

          <ul className="bg-blue-300">
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
  )
}

export default Blog
