import google from '../assets/sponsors/googlecloud-color.svg';
import aws from '../assets/sponsors/amazonaws.svg';
import mercado from '../assets/sponsors/mercadopago.svg';
import microsoft from '../assets/sponsors/azure.svg';
import github from '../assets/sponsors/github.svg';
import globant from '../assets/sponsors/globant.png';
import auth0 from '../assets/sponsors/auth0.svg';
import vercel from '../assets/sponsors/vercel.svg';
import supabase from '../assets/sponsors/supabase.svg';
import digitalocean from '../assets/sponsors/digitalocean.svg';
import cloudflare from '../assets/sponsors/cloudflare.svg';
import mongodb from '../assets/sponsors/mongodb.svg';
import docker from '../assets/sponsors/docker.svg';
import stripe from '../assets/sponsors/stripe.svg';
import postman from '../assets/sponsors/postman.svg';

const tiers = [
  {
    id: 'diamond',
    title: 'Main partners',
    level: 'Tier diamante',
    subtitle:
      'Presencia estelar en conferencias, stands experienciales y becas formativas.',
    sponsors: [
      {
        name: 'Google Cloud',
        logo: google,
        raster: true,
        color: '#e34456',
        category: 'Lead cloud partner',
        description:
          'Infraestructura global ultra-escalable, Gemini AI APIs y programas de formación profesional para devs.',
        specialty: 'Cloud & AI',
        tag: 'Cloud Partner',
        url: 'https://cloud.google.com/',
      },
      {
        name: 'Amazon Web Services',
        logo: aws,
        color: '#ff9900',
        category: 'Infrastructure partner',
        description:
          'Servicios de nube, arquitecturas serverless y vouchers para certificaciones oficiales para la comunidad.',
        specialty: 'Cloud Hosting',
        tag: 'Global Leader',
        url: 'https://aws.amazon.com/',
      },
      {
        name: 'Mercado Libre',
        logo: mercado,
        color: '#f5d93d',
        category: 'Fintech & e-commerce',
        description:
          'El mayor ecosistema tech de Latinoamérica impulsando becas, hackathons y pasantías directas de empleo.',
        specialty: 'Fintech Scale',
        tag: 'Unicorn LATAM',
        url: 'https://www.mercadolibre.com/',
      },
    ],
  },
  {
    id: 'gold',
    title: 'Gold tier',
    level: 'Nivel oro',
    subtitle:
      'Líderes de producto, frameworks y transformación digital global.',
    sponsors: [
      {
        name: 'Microsoft',
        logo: microsoft,
        raster: true,
        color: '#54a8ef',
        description: 'Azure & Dev Tools',
        tag: 'Enterprise',
      },
      {
        name: 'GitHub',
        logo: github,
        color: '#f0f0f0',
        description: 'Open Source & Copilot',
        tag: 'Community',
      },
      {
        name: 'Globant',
        logo: globant,
        raster: true,
        color: '#c7dc38',
        description: 'Tech Reinvention',
        tag: 'Global Talent',
      },
      {
        name: 'Auth0',
        logo: auth0,
        color: '#ec754e',
        description: 'Identity & Security',
        tag: 'Security',
      },
      {
        name: 'Vercel',
        logo: vercel,
        color: '#ffffff',
        description: 'Frontend Cloud & Next',
        tag: 'Deployment',
      },
    ],
  },
  {
    id: 'bronze',
    title: 'Bronze tier',
    level: 'Nivel bronce',
    subtitle:
      'Herramientas y plataformas predilectas de la comunidad de desarrolladores.',
    sponsors: [
      {
        name: 'Supabase',
        logo: supabase,
        color: '#57ce96',
        description: 'Open-source DB',
      },
      {
        name: 'DigitalOcean',
        logo: digitalocean,
        color: '#3a81f5',
        description: 'Cloud VPS',
      },
      {
        name: 'Cloudflare',
        logo: cloudflare,
        color: '#ed9b42',
        description: 'Edge & DNS',
      },
      {
        name: 'MongoDB',
        logo: mongodb,
        color: '#65a053',
        description: 'Document DB',
      },
      {
        name: 'Docker',
        logo: docker,
        color: '#5b9ec2',
        description: 'Containers',
      },
      {
        name: 'Stripe',
        logo: stripe,
        color: '#8771f9',
        description: 'Payments API',
      },
      {
        name: 'Postman',
        logo: postman,
        color: '#f68a66',
        description: 'API Platform',
      },
    ],
  },
];

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="landing-container landing-section sponsors-section"
      aria-label="Sponsors del evento"
    >
      {tiers.map((tier) => (
        <div key={tier.id} className={`sponsor-tier sponsor-tier--${tier.id}`}>
          <header className="sponsor-tier__header">
            <div className="sponsor-tier__symbol" aria-hidden="true" />
            <div>
              <h2>
                {tier.title}
                <span>{tier.level}</span>
              </h2>
              <p>{tier.subtitle}</p>
            </div>
          </header>
          <div className="sponsor-grid">
            {tier.sponsors.map((sponsor) => (
              <article
                className="sponsor-card"
                key={sponsor.name}
                style={{ '--brand': sponsor.color }}
              >
                {sponsor.category && (
                  <div className="sponsor-card__top">
                    <span>{sponsor.category}</span>
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar ${sponsor.name}`}
                    >
                      ↗
                    </a>
                  </div>
                )}
                <div className="sponsor-logo" aria-hidden="true">
                  {sponsor.raster ? (
                    <img
                      src={sponsor.logo}
                      alt=""
                      loading="lazy"
                      width="72"
                      height="72"
                    />
                  ) : (
                    <span style={{ maskImage: `url("${sponsor.logo}")` }} />
                  )}
                </div>
                <h3>{sponsor.name}</h3>
                <p className="sponsor-card__description">
                  {sponsor.description}
                </p>
                {sponsor.specialty ? (
                  <div className="sponsor-card__footer">
                    <span>{sponsor.specialty}</span>
                    <strong>{sponsor.tag}</strong>
                  </div>
                ) : (
                  sponsor.tag && (
                    <span className="sponsor-card__tag">{sponsor.tag}</span>
                  )
                )}
              </article>
            ))}
          </div>
        </div>
      ))}
      <a href="#sumate-sponsor" className="sponsor-invite">
        ¿Querés ser parte?{' '}
        <strong>
          Sumate como Sponsor <span aria-hidden="true">↗</span>
        </strong>
      </a>
    </section>
  );
}
