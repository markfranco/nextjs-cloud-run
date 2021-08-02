import Link from 'next/link'

export default function Person({ person }): JSX.Element {
  return (
    <li>
      <Link href="/person/[id]" as={`/person/${person.id}`}>
        <a>{person.name}</a>
      </Link>
    </li>
  )
}
