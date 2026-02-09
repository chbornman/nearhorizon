import React from 'react'
import {
  Lightning,
  Plant,
  Globe,
  Tree,
  HandHeart,
  HandCoins,
  LockKeyOpen,
  ArrowsOut,
  Graph,
  Sun,
  FlowerLotus,
} from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'About',
  description:
    'About Near Horizon -- a physical design and prototyping facility in Lancaster, PA.',
}

const pillarStyles: Record<string, { bg: string; text: string }> = {
  energy: { bg: 'bg-pillar-energy-bg', text: 'text-pillar-energy-text' },
  food: { bg: 'bg-pillar-food-bg', text: 'text-pillar-food-text' },
  carbon: { bg: 'bg-pillar-carbon-bg', text: 'text-pillar-carbon-text' },
  ecology: { bg: 'bg-pillar-ecology-bg', text: 'text-pillar-ecology-text' },
  community: { bg: 'bg-pillar-community-bg', text: 'text-pillar-community-text' },
}

const pillars = [
  {
    name: 'Energy Independence',
    description: 'Energy needs are met with locally produced, renewable energy',
    icon: Lightning,
    pillar: 'energy',
  },
  {
    name: 'Food Security',
    description: 'Everyone has access to healthy, local, regeneratively grown food',
    icon: Plant,
    pillar: 'food',
  },
  {
    name: 'Carbon Neutrality',
    description: 'Achieve net-zero emissions by cutting pollution and restoring natural systems',
    icon: Globe,
    pillar: 'carbon',
  },
  {
    name: 'Ecological Regeneration',
    description: "Ecosystems are prepared for tomorrow's climate",
    icon: Tree,
    pillar: 'ecology',
  },
  {
    name: 'Thriving Communities',
    description: 'All communities are empowered and included in shaping a just future',
    icon: HandHeart,
    pillar: 'community',
  },
]

const values = [
  {
    name: 'Affordability',
    description: 'Solutions must be within reach of the people that need them most',
    icon: HandCoins,
  },
  {
    name: 'Openness / DIY',
    description: 'Create replicable solutions and the services to help people implement',
    icon: LockKeyOpen,
  },
  {
    name: 'Scalability',
    description: 'Ideal problems are faced by many communities, not a single entity',
    icon: ArrowsOut,
  },
  {
    name: 'Decentralization',
    description: 'Solutions oppose further concentration of power and wealth',
    icon: Graph,
  },
  {
    name: 'Abundance over scarcity',
    description: 'Design to create a world where there is enough for all',
    icon: Sun,
  },
  {
    name: 'Solarpunk over degrowth',
    description: 'Imagine a future where high tech and high ecological awareness coexist',
    icon: FlowerLotus,
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding page-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            About Near Horizon
          </h1>
          <p className="text-lg text-foreground-secondary mb-4">
            Near Horizon is a physical design and prototyping facility in Lancaster, PA filled with
            the people, tools, and resources to build a resilient future -- focused on
            community-scale challenges.
          </p>
          <p className="text-foreground-secondary">
            People design and prototype solutions, fabricate projects, and test business models in
            the physical space and in the real world. It attracts curious innovators and
            organizational collaborators who question existing paradigms and develop novel solutions.
          </p>
        </div>
      </section>

      {/* Origins */}
      <section className="section-padding page-padding bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl text-foreground mb-6">Why We Started</h2>
          <p className="text-foreground-secondary mb-4">
            In the 1960s, Buckminster Fuller described humanity&apos;s task of piloting
            &ldquo;Spaceship Earth&rdquo; -- making the world work for everyone without ecological
            offense or disadvantage to anyone. We have never been better equipped with the knowledge,
            technologies, and resources to achieve that goal. Yet technology often isn&apos;t serving
            communities. Instead, innovation accelerates inequality and tears at the community fabric.
          </p>
          <p className="text-foreground-secondary mb-4">
            In December 2025, Eric Sauder and Caleb Bornman founded what was originally called the
            Local Resilience Lab -- a direct response to that gap between what&apos;s possible and
            what&apos;s actually reaching the people who need it.
          </p>
          <p className="text-foreground-secondary">
            The name Near Horizon is a call for optimism when the view ahead is haze. A focus on the
            local, practical, achievable -- solutions communities can take up now. And yet, horizons
            reach far into the distance.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-padding page-padding">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl text-foreground mb-8">Resilience Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              const styles = pillarStyles[pillar.pillar]
              return (
                <div
                  key={pillar.name}
                  className="p-5 bg-background rounded-lg border border-border flex gap-4"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${styles?.bg ?? 'bg-elevated'}`}
                  >
                    <Icon
                      size={22}
                      weight="duotone"
                      className={styles?.text ?? 'text-muted'}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{pillar.name}</h3>
                    <p className="text-sm text-foreground-secondary">{pillar.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding page-padding bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl text-foreground mb-8">Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.name}
                  className="p-5 bg-surface rounded-lg border border-border flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                    <Icon size={22} weight="duotone" className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{value.name}</h3>
                    <p className="text-sm text-foreground-secondary">{value.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>


    </div>
  )
}
