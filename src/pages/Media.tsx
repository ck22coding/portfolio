import { FaLinkedinIn } from 'react-icons/fa6'
import { Tweet } from 'react-tweet'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import { media, type MediaPost } from '../content'

const tweetId = (url: string) => url.match(/status\/(\d+)/)?.[1]

function Post({ post }: { post: MediaPost }) {
  if (post.kind === 'x') {
    const id = tweetId(post.url)
    return id ? (
      <div className="dark [&_.react-tweet-theme]:!my-0">
        <Tweet id={id} />
      </div>
    ) : null
  }
  return (
    <SpotlightCard spotlightColor="rgba(200, 255, 92, 0.18)">
      <article className="relative">
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-muted">{post.date}</p>
          </div>
          <FaLinkedinIn aria-hidden="true" className="h-5 w-5 text-muted" />
        </header>
        <p className="mt-4 whitespace-pre-line">{post.text}</p>
        <a
          className="mt-4 inline-block text-sm underline decoration-white/25 underline-offset-4 hover:decoration-accent"
          href={post.url}
        >
          View on LinkedIn
        </a>
      </article>
    </SpotlightCard>
  )
}

export default function Media() {
  return (
    <div className="pt-10 md:pt-16">
      <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">Media</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">Posts I have written and posts I keep coming back to.</p>
      {media.length === 0 ? (
        <p className="mt-12 text-muted">No posts here yet.</p>
      ) : (
        <div className="mt-12 gap-6 md:columns-2">
          {media.map(post => (
            <div key={post.url} className="mb-6 break-inside-avoid">
              <Post post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
