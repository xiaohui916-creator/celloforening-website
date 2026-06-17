export default function OmOss() {
  return (
    <section id="om-oss" style={{ padding: '4rem 2rem', background: 'rgba(42, 122, 111, 0.03)' }}>
  <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Om oss</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
          En forening for cellister i Bergen og omegn
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>

          <div style={{ background: 'white', borderRadius: '1rem', padding: '1.8rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '3px solid #2a7a6f' }}>
            <h3 style={{ fontSize: '1rem', color: '#2a7a6f', marginBottom: '0.75rem' }}>Hvem er vi</h3>
            <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.7 }}>Bergen Celloforeningen er en forening for cellister i Bergen og omegn. Vi arrangerer konserter, kurs og sosiale sammenkomster for alle som er glad i cello.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '1rem', padding: '1.8rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '3px solid #2a7a6f' }}>
            <h3 style={{ fontSize: '1rem', color: '#2a7a6f', marginBottom: '0.75rem' }}>Hva vi gjør</h3>
            <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.7 }}>Hver måned holder vi workshops hvor medlemmer kan lære, øve og utvikle seg sammen. Vi har jevnlige konserter med soloframføringer, samt kammermusikkensembler i ulike besetninger – duoer, trioder, kvartetter og kvintetter.</p>
          </div>

          <div style={{ background: 'white', borderRadius: '1rem', padding: '1.8rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '3px solid #2a7a6f' }}>
            <h3 style={{ fontSize: '1rem', color: '#2a7a6f', marginBottom: '0.75rem' }}>Din plass</h3>
            <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.7 }}>Enten du ønsker å spille alene eller sammen med andre, er det en plass for deg i Bergen Celloforeningen. Vi ønsker alle velkomne – uansett nivå.</p>
          </div>

        </div>
      </div>
    </section>
  );
}