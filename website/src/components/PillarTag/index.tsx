import React from 'react'

const pillarConfig: Record<string, { label: string; bgClass: string; textClass: string }> = {
  energy: {
    label: 'Energy Independence',
    bgClass: 'bg-pillar-energy-bg',
    textClass: 'text-pillar-energy-text',
  },
  food: {
    label: 'Food Security',
    bgClass: 'bg-pillar-food-bg',
    textClass: 'text-pillar-food-text',
  },
  carbon: {
    label: 'Carbon Neutrality',
    bgClass: 'bg-pillar-carbon-bg',
    textClass: 'text-pillar-carbon-text',
  },
  ecology: {
    label: 'Ecological Regeneration',
    bgClass: 'bg-pillar-ecology-bg',
    textClass: 'text-pillar-ecology-text',
  },
  community: {
    label: 'Thriving Communities',
    bgClass: 'bg-pillar-community-bg',
    textClass: 'text-pillar-community-text',
  },
}

type Props = {
  pillar: string
  className?: string
}

export const PillarTag: React.FC<Props> = ({ pillar, className = '' }) => {
  const config = pillarConfig[pillar]
  if (!config) return <span className="pillar-tag bg-elevated text-muted">{pillar}</span>

  return (
    <span className={`pillar-tag ${config.bgClass} ${config.textClass} ${className}`}>
      {config.label}
    </span>
  )
}
