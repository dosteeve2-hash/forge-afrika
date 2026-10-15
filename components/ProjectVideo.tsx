export type ProjectSlug = 'forge' | 'livestock' | 'agrotrack' | 'valuechain'
export type VideoLang = 'fr' | 'en' | 'tr'

type ProjectVideoProps = {
  slug: ProjectSlug
  lang?: VideoLang
  title: string
  className?: string
}

const VIDEO_HOST = 'https://forge-marketing-video.vercel.app'

export function ProjectVideo({ slug, lang = 'fr', title, className }: ProjectVideoProps) {
  const params = new URLSearchParams({ p: slug, lang, format: '169' })
  return (
    <iframe
      src={`${VIDEO_HOST}/embed.html?${params.toString()}`}
      title={title}
      className={className}
      loading="lazy"
      allow="fullscreen"
      allowFullScreen
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        border: 0,
        borderRadius: 14,
        display: 'block',
        background: '#070e1f',
      }}
    />
  )
}

export default ProjectVideo
