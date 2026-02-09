import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) {
    throw new Error('NEXT_PUBLIC_SERVER_URL environment variable is required')
  }
  return process.env.NEXT_PUBLIC_SERVER_URL
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (!process.env.NEXT_PUBLIC_SERVER_URL) {
    throw new Error('NEXT_PUBLIC_SERVER_URL environment variable is required')
  }

  return process.env.NEXT_PUBLIC_SERVER_URL
}
