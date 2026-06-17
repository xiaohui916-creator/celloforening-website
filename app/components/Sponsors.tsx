interface Sponsor {
  name: string;
  logo?: string;
  url?: string;
}

const SPONSORS: Sponsor[] = [
  { name: 'Sponsor 1' },
  { name: 'Sponsor 2' },
  { name: 'Sponsor 3' },
];

export default function Sponsors() {
  return (
    <section id="sponsorer" style={{ padding: '4rem 2rem', background: 'rgba(42, 122, 111, 0.05)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Sponsorer</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
          Takk til våre støttespillere
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {SPONSORS.map(sponsor => {
            const card = (
              <div
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100px',
                  fontWeight: 600,
                  color: '#2a7a6f',
                  textAlign: 'center',
                }}
              >
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    style={{ maxWidth: '100%', maxHeight: '70px', objectFit: 'contain' }}
                  />
                ) : (
                  sponsor.name
                )}
              </div>
            );

            return sponsor.url ? (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {card}
              </a>
            ) : (
              <div key={sponsor.name}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}