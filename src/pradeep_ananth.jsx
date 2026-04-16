import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react"

// ============================================================
// DATA
// ============================================================
const MARQUEE = [
  'Abbott','Illumina','Genentech','AbbVie','Regeneron','Microsoft','Intel','HP','Adobe',
  'Salesforce','Cisco','Sony','Unilever','P&G','Adidas','Visa','Cigna','Ally Bank','Experian',
  'Singapore Airlines','NFL','CBS','Mattel','Taco Bell','Yahoo','Sun Microsystems'
];

// 5x6 mosaic for the hero. Each tile tries `customLogo` first
// (high-quality 1000logos.net source), then falls back to Simple
// Icons CDN via `slug`, and finally to a styled text wordmark if
// neither image loads.
const CLIENT_LOGOS = [
  { name: 'Microsoft',          slug: 'microsoft',         customLogo: 'https://1000logos.net/wp-content/uploads/2017/04/Microsoft-Logo.png' },
  { name: 'Abbott',             slug: 'abbott' },
  { name: 'Visa',               slug: 'visa' },
  { name: 'Adidas',             slug: 'adidas' },
  { name: 'Wells Fargo', slug: 'wellsfargo' },

  { name: 'Adobe',              slug: 'adobe',             customLogo: 'https://1000logos.net/wp-content/uploads/2021/04/Adobe-logo.png' },
  { name: 'AbbVie',             slug: 'abbvie' },
  { name: 'NFL',                slug: 'nfl' },
  { name: 'Procter & Gamble',   slug: 'procterandgamble',  customLogo: 'https://1000logos.net/wp-content/uploads/2021/03/PG-logo.png' },
  { name: 'JPMorgan Chase', slug: null, customLogo: 'https://1000logos.net/wp-content/uploads/2020/04/J.P.-Morgan-Chase-Logo.png' },

  { name: 'Salesforce',         slug: 'salesforce',        customLogo: 'https://1000logos.net/wp-content/uploads/2017/08/Salesforce-Logo.png' },
  { name: 'Illumina',           slug: 'illumina' },
  { name: 'Sony',               slug: 'sony' },
  { name: 'Unilever',           slug: 'unilever' },
  { name: 'Fidelity', slug: null, customLogo: 'https://1000logos.net/wp-content/uploads/2017/11/Fidelity-Logo-1536x864.png' },

  { name: 'Intel',              slug: 'intel' },
  { name: 'Regeneron',          slug: null },
  { name: 'Singapore Airlines', slug: 'singaporeairlines' },
  { name: 'Mattel',             slug: 'mattel',            customLogo: 'https://1000logos.net/wp-content/uploads/2020/09/Mattel-Logo.png' },
  { name: 'Edward Jones', slug: null, customLogo: 'https://1000logos.net/wp-content/uploads/2021/05/Edward-Jones-logo-1536x864.png' },

  { name: 'Cisco',              slug: 'cisco' },
  { name: 'Genentech',          slug: null },
  { name: 'Ally',               slug: 'ally',              customLogo: 'https://1000logos.net/wp-content/uploads/2021/05/Ally-Financial-logo.png' },
  { name: 'Taco Bell',          slug: 'tacobell' },
  { name: 'Farmers', slug: null, customLogo: 'https://1000logos.net/wp-content/uploads/2022/06/Farmers-Insurance-Group-logo-1536x864.png' },

  { name: 'HP',                 slug: 'hp' },
  { name: 'Cigna',              slug: 'cigna',             customLogo: 'https://1000logos.net/wp-content/uploads/2020/07/Cigna-Logo.png' },
  { name: 'Experian',           slug: 'experian' },
  { name: 'CBS',                slug: 'cbs' },
  { name: 'Aviva', slug: null, customLogo: 'https://1000logos.net/wp-content/uploads/2021/04/Aviva-logo-1536x864.png' }
];

// ============================================================
// COMPONENT
// ============================================================
export default function PradeepResume() {
  // Manual smooth-scroll for nav links (anchor links can be flaky in iframes / artifact sandboxes)
  const navTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style>{CSS}</style>

      {/* TOP BAR */}
      <header className="top">
        <div className="wrap top-inner">
          <div className="lock">PRADEEP ANANTH<span className="dot"> ◆ </span>SAN FRANCISCO</div>
          <nav className="top-nav">
            <a href="#now"      onClick={navTo('now')}>Now</a>
            <a href="#career"   onClick={navTo('career')}>Career</a>
            <a href="#for-frog" onClick={navTo('for-frog')}>For frog</a>
            <a href="#pov"      onClick={navTo('pov')}>POV</a>
          </nav>
          <a className="top-cta" href="mailto:pradeepananth@gmail.com">Get in touch</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="eyebrow">Customer Experience &mdash; Reimagined for the AI Era</div>
              <h1 className="display">
                Pradeep<br/>
                <span className="it">Ananth.</span>
              </h1>
          <p className="lede">
                Two decades across three worlds rarely combined &mdash; Big 4 consulting at Deloitte and IBM, agency leadership at Razorfish and Publicis, SaaS go-to-market at Celtra and Hearsay. The result is a <em>singular kind of executive</em> &mdash; one the C-suite (across every industry) has turned to when the stakes are highest.
              </p>
              <div className="hero-meta">
                <span>Partner, IBM Consulting</span>
                <span>Customer Transformation, Life Sciences</span>
                <span>20+ Years</span>
                <span>San Francisco</span>
              </div>
            </div>

            {/* Logo mosaic */}
            <div className="logo-side">
              <div className="logo-side-label">
                <span>◆</span> Selected clients across two decades
              </div>
              <div className="logo-mosaic">
                {CLIENT_LOGOS.map(c => (
                  <LogoTile key={c.name} name={c.name} slug={c.slug} customLogo={c.customLogo}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="wrap">
          <div className="stats-grid">
            <Stat num="20" suffix="+" label="Years — Services Leadership"/>
            <Stat num="$200M" suffix="+" label="P&L Owned & Run"/>
            <Stat num="2,000" suffix="+" label="Practitioners Led"/>
            <Stat num="50" suffix="+" label="Fortune 500 Clients"/>
          </div>
        </div>
      </div>

      {/* NOW */}
      <section className="now" id="now">
        <div className="wrap">
          <div className="section-head">
            <div><div className="section-num">01 / Now</div></div>
            <h2 className="section-title">Where I&rsquo;m spending<br/><span className="it">today&rsquo;s energy.</span></h2>
          </div>

          <div className="now-card">
            <div className="now-meta">
              <div>
                <div className="now-role">Partner, <span className="it">Customer&nbsp;Transformation, Life&nbsp;Sciences</span></div>
                <div className="now-co" style={{marginTop: 10}}>IBM Consulting &mdash; July 2023 to Present</div>
              </div>
              <div className="now-co" style={{textAlign: 'right'}}>San Francisco, CA</div>
            </div>

            <p className="now-body">
              Leading <strong>Customer Experience Transformation</strong> for some of the most consequential names in life sciences &mdash; <strong>Abbott, Illumina, Genentech, AbbVie, Regeneron</strong>. Helping C-suite leaders reimagine how scientific brands engage every audience &mdash; HCPs, patients, research customers, and channel partners &mdash; in a moment when <strong>Generative AI</strong> is rewriting the rules of relevance.
            </p>

            <div className="kpi-card">
              <div className="kpi-num">$0 &rarr; $20M</div>
              <div className="kpi-label">Adobe practice grown at Abbott over the last 5 years</div>
            </div>

            <div className="now-points">
              <Point n="01" lead="Abbott — GenAI for the commercial line."
                body="Partnered with Writer AI to deploy Generative AI across multiple commercial use cases, including auto-generated FAQs that scale support teams without scaling headcount."/>
              <Point n="02" lead="Abbott — the GEO play."
                body="Extending Abbott's Adobe platform for Generative Engine Optimization — standing up llms.txt and JSON-LD structured data so Abbott's web properties are findable and citable by ChatGPT, Perplexity, Gemini, and the answer engines that are quietly displacing search."/>
              <Point n="03" lead="Regeneron — turning research into emotive territory."
                body="Building a GenAI solution that ingests vast volumes of qualitative user research and surfaces the emotive territories marketing can credibly own. A year of ethnography becomes a real-time positioning instrument."/>
              <Point n="04" lead="The orchestration layer."
                body="Across all of it, bridging the four kingdoms that have to align before any meaningful CX outcome ships in pharma — marketing, medical, commercial, and IT."/>
            </div>

            <div className="now-clients">
              <div className="now-clients-label">Life Sciences clients I&rsquo;m partnering with</div>
              <div className="client-row">
                <ClientTile name="Abbott"    tag="Diagnostics & Devices"/>
                <ClientTile name="Illumina"  tag="Genomics"/>
                <ClientTile name="Genentech" tag="Biotech"/>
                <ClientTile name="AbbVie"    tag="Pharma"/>
                <ClientTile name="Regeneron" tag="Biotech"/>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* TIMELINE */}
      <section id="career">
        <div className="wrap">
          <div className="section-head">
            <div><div className="section-num">03 / Career Arc</div></div>
            <h2 className="section-title">Twenty years building<br/>services organizations<br/><span className="it">that mattered.</span></h2>
          </div>

          <CareerArc />
        </div>
      </section>
      {/* FOR FROG */}
      <section className="for-frog" id="for-frog">
        <div className="wrap">
          <div className="frog-mark">
            <svg viewBox="0 0 100 100" width="36" height="36" aria-hidden="true">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1"/>
              <text x="50" y="62" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="38" fontWeight="300" fill="currentColor">f</text>
            </svg>
            <span>A note for the frog hiring committee</span>
          </div>

          <h2 className="frog-title">
            Twenty years ago, I worked alongside <span className="it">frog</span> &mdash; on Sun Microsystems, at Razorfish.<br/>
            I remember the way you brought design to the table.<br/>
            <span className="dim">Not as decoration. As strategy.</span>
          </h2>

          <p className="frog-body">
            That memory has stayed with me through every stop since &mdash; through Vivaki, Deloitte, Celtra, Hearsay, and now IBM. What you&rsquo;re building today &mdash; selling design-led transformation to the C-suite of CPG, financial services, and healthcare &mdash; happens to be the work I&rsquo;ve been preparing to do for the better part of two decades.
          </p>

          <div className="frog-grid">
            <FrogCard n="01" h="CX before it had a name."
              body={<>Razorfish was the original digital experience agency. I helped run its West Region. I&rsquo;ve been building customer-centric services organizations for two decades &mdash; long before everyone called the work &ldquo;CX.&rdquo;</>}/>
            <FrogCard n="02" h="Design literacy from the inside."
              body={<>I came up on the agency side at Razorfish and Vivaki. I know how to talk to creatives in their language &mdash; and translate that into something enterprise IT will buy. That bridge is rare, and it&rsquo;s the whole job.</>}/>
            <FrogCard n="03" h="The three industries you asked me to cover."
              body={<>I&rsquo;ve sold and delivered in all of them. <em>CPG</em> &mdash; Unilever, P&amp;G, Adidas, Taco Bell. <em>Financial Services</em> &mdash; Visa, Ally Bank, Experian, Hearsay&rsquo;s entire fintech book. <em>Healthcare &amp; Life Sciences</em> &mdash; Genentech then, Abbott / Illumina / AbbVie / Regeneron now.</>}/>
            <FrogCard n="04" h="I sell the work creatives want to do."
              body={<>Most consultancies sell what&rsquo;s easy to scope. I&rsquo;ve spent twenty years selling what&rsquo;s right. C-suite buyers can tell the difference, and so can the makers who actually do the work.</>}/>
          </div>

          <p className="frog-close">
            The full-circle on Sun Microsystems isn&rsquo;t lost on me. <span className="it">I&rsquo;d be honored to come back &mdash; this time on your side of the table.</span>
          </p>
        </div>
      </section>

      {/* POV */}
      <section className="pov" id="pov">
        <div className="wrap">
          <div className="section-head">
            <div><div className="section-num" style={{color: 'rgba(241,234,217,0.7)'}}>04 / Point of View</div></div>
            <div/>
          </div>

          <p className="pov-quote">
            The most liberating thing about LLMs isn&rsquo;t productivity &mdash; it&rsquo;s that you can finally vibe-anything.
          </p>
          <br/><br/>
          <p className="pov-feature-sub">Excerpts from High-engagement Posts on LinkedIN</p>

          <div className="pov-grid">
            <PovCard h="Vibe-anything."
              body={<>For decades, creating any artifact meant doing two heavy things at once: holding the intent in your head while translating it into precise language. That translation tax crushed the original vibe. LLMs flip the equation &mdash; allocate 100% of your energy to the intent, let the model handle the words. Vibe-coding was just the start. The same shift applies to decks, strategy docs, podcasts, brand frameworks. To anything we make.</>}/>
            <PovCard h="The vibe has to survive the journey."
              body={<>A recent client tech primer started as a 5-minute voice note in a parking lot &mdash; captured raw, waiting for my son after basketball. NotebookLM turned it into a deck outline. An image model turned it into an infographic. A podcast version let me hear my own ideas as an outsider would. The final artifact was a synthesis of all those expressions. The raw material was five minutes of pure thought.</>}/>
            <PovCard h="Wisdom over articulation."
              body={<><em>Cogito, ergo sum</em> defined human worth by the ability to think &mdash; to form complex sequences of words and logic. As Harari put it recently at Davos, that definition is now a trap. AI has mastered thoughts-as-words; we can&rsquo;t out-articulate the machine. The work now is to stop performing intelligence and start practicing wisdom &mdash; the kind algorithms can&rsquo;t parse.</>}/>
          </div>

          {/* FEATURED WORKING PAPER */}
          <div className="pov-feature">
            <div className="pov-feature-label"><span>◆</span> Working paper &middot; August 2025</div>
            <h3 className="pov-feature-title">The Age of the Agent.</h3>
            <p className="pov-feature-sub">A bold vision for an AI-first marketing organization.</p>
            <p className="pov-feature-thesis">
              Always-on, fully personalized marketing has been the promised land for a decade &mdash; every CMS, CDP, CRM, marketing-automation, and data-lake investment was supposed to take us there. None did. Agentic AI is the missing layer, and the economics are finally working.
            </p>
            <div className="pov-feature-grid">
              <FeatureCard n="01" h="What changes."
                body="Static, pre-programmed responses give way to four agentic traits: continuous perception, autonomous decision-making, proactive behavior, and dynamic adaptability. The unit of work becomes outcomes orchestrated, not tasks completed."/>
              <FeatureCard n="02" h="The architecture."
                body={<>Humans orchestrate a network. <em>Autonomous Super Agents</em> &mdash; built on enterprise platforms like AWS Bedrock &mdash; direct <em>Specialized Task Agents</em> built on Martech (Writer, Adobe, Salesforce). Pods own objectives and KPIs.</>}/>
              <FeatureCard n="03" h="The new org chart."
                body={<>The pyramid flattens into a Symphony of Human and Machine. Humans become <em>Experience Orchestrators</em> &mdash; Growth Strategists, AI Agent Architects, Empathy Weavers, Ethical Governors. The AI workforce stands up Sentient Market Analysts, Hyper-Personalization Engines, Autonomous Creative Studios.</>}/>
              <FeatureCard n="04" h="The path."
                body={<>Three phases. <em>Launch &amp; Empower</em> (automate, train, build trust). <em>Align &amp; Accelerate</em> (custom co-pilots, integrated workflows). <em>Anticipate &amp; Elevate</em> (autonomous networks with human oversight).</>}/>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div><div className="section-num">05 / Education</div></div>
            <h2 className="section-title">Foundations<br/><span className="it">that still hold up.</span></h2>
          </div>

          <div className="edu-grid">
            <div className="edu">
              <div className="edu-degree">Master of Information Systems Management<br/><em>Specialization: Software Engineering</em></div>
              <div className="edu-school">Carnegie Mellon University &mdash; Pittsburgh, PA</div>
              <div className="edu-honor">Barker-Musser Fellow &mdash; one of five chosen worldwide.</div>
            </div>
            <div className="edu">
              <div className="edu-degree">Bachelor of Engineering<br/><em>Electronics &amp; Communications</em></div>
              <div className="edu-school">PSG College of Technology &mdash; India</div>
              <div className="edu-honor">Valedictorian, Class of 1998.</div>
            </div>
          </div>

          <div className="recognition">
            <div className="rec-label">Recognition &amp; Advisory</div>
            <div className="rec-grid">
              <RecItem name="IBM Industry Silver Badge" detail="Recognition for industry impact in Life Sciences customer transformation."/>
              <RecItem name="Advisor — Squarediff"     detail="Silicon Valley agentic-AI startup."/>
              <RecItem name="Advisor — Bodhium Labs"   detail="Silicon Valley agentic-AI startup."/>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <div className="cta-grid">
            <h2 className="cta-title">Let&rsquo;s build what<br/><span className="it">comes next.</span></h2>
            <div className="cta-meta">
              <div>Email &mdash; <a href="mailto:pradeepananth@gmail.com">pradeepananth@gmail.com</a></div>
              <div>Phone &mdash; <a href="tel:+14154123219">+1&nbsp;&middot;&nbsp;415&nbsp;&middot;&nbsp;412&nbsp;&middot;&nbsp;3219</a></div>
              <div>LinkedIn &mdash; <a href="https://linkedin.com/in/pradeepananth/" target="_blank" rel="noopener noreferrer">/in/pradeepananth</a></div>
              <div>Based &mdash; San Francisco, California</div>
            </div>
          </div>

          <div className="footer-strip">
            <div>&copy; 2026 Pradeep Ananth</div>
            <div className="made">Designed in&nbsp;<span>San Francisco</span></div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// SUBCOMPONENTS
// ============================================================
function Stat({ num, suffix, label }) {
  return (
    <div className="stat">
      <div className="stat-num">{num}<span className="small">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function Point({ n, lead, body }) {
  return (
    <div className="point">
      <div className="point-num">{n}</div>
      <div className="point-text"><strong>{lead}</strong> {body}</div>
    </div>
  );
}

function ClientTile({ name, tag }) {
  return (
    <div className="client-tile">
      <div className="name">{name}</div>
      <div className="tag">{tag}</div>
    </div>
  );
}

function Industry({ name, items }) {
  return (
    <div className="industry">
      <div className="industry-name">{name}</div>
      <ul className="industry-list">
        {items.map((it, i) => (
          <li key={it} className={i % 2 === 1 ? 'it' : ''}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// CAREER ARC DATA (chronological)
// ============================================================
const ROLES = [
  {
    id: 'razorfish',
    startYear: 2005,
    period: 'Jun 2005 — Sep 2010',
    company: 'Razorfish',
    location: 'San Francisco, CA',
    title: <>Group Vice President, <span className="it">Technology — West</span></>,
    tags: ['Agency Exec', '$50M+ P&L', 'frog x Sun Microsystems', 'Multi-industry'],
    desc: <>Part of the 8-person executive management team running a <strong>$50M+ West Region business</strong> within a $300M+ global agency (acquired by Microsoft for $6B). Clients: <strong>Visa, Genentech, Microsoft, Sony, Intel, NFL, Mattel, CBS, PG&amp;E, Yahoo</strong>. Led $40M+ in business development wins. Grew the technology organization from 30 to 50 people. Held some of the highest delivery margins (20-25%) in the company. <em>Notably &mdash; partnered directly with frog Design on the Sun Microsystems engagement during this period.</em></>
  },
  {
    id: 'vivaki',
    startYear: 2010,
    period: 'Oct 2010 — Jan 2014',
    company: 'Vivaki',
    location: 'Publicis Groupe, San Francisco, CA',
    title: 'Chief Technology Officer',
    tags: ['CTO', 'AWS / Big Data', 'AdTech', 'Product Engineering'],
    desc: <>Technology leader for Publicis&rsquo; bet on the digital advertising future. Vivaki grew to <strong>200 people and $100M+ in revenue</strong>. Built the data platform that ingested signals from Google, Yahoo, DoubleClick, Bing &mdash; the early-cloud foundation for the agency network&rsquo;s digital practice. Shipped strategic products: <strong>Insights on Demand, Campaigns on Demand, Benchtools, Data Hub.</strong></>
  },
  {
    id: 'deloitte',
    startYear: 2014,
    period: 'Jan 2014 — Mar 2019',
    company: 'Deloitte Digital',
    location: 'San Francisco, CA',
    title: <>Digital Experience &amp; <span className="it">SaaS Practice Lead</span></>,
    tags: ['Big-5 Consulting', 'Adobe / Salesforce', 'SaaS Transformation', 'C-Suite Advisory'],
    desc: <>Built and grew the West Region digital experience and SaaS Transformation practice. Strategic advisor to C-suite executives across <strong>HP, Intel, Salesforce, Cisco, Ally Bank, Cigna, Experian</strong>. Delivered end-to-end CX solutions on Adobe Experience Cloud, Salesforce Marketing Cloud, and Google Ad Cloud. Led delivery teams of up to 50 onshore + offshore. Operations Lead for the entire community of practice.</>
  },
  {
    id: 'celtra',
    startYear: 2019,
    period: 'Apr 2019 — Apr 2020',
    company: 'Celtra',
    location: 'San Francisco, CA',
    title: <>EVP &amp; <span className="it">Chief Customer Officer</span></>,
    tags: ['Customer Success', 'SaaS', 'AdTech'],
    desc: <>Owned retention and growth of a <strong>~$45M ARR</strong> SaaS platform for building and managing dynamic digital advertising at scale. Re-set customer success motion across enterprise accounts.</>
  },
  {
    id: 'hearsay',
    startYear: 2020,
    period: 'May 2020 — Jun 2023',
    company: 'Hearsay',
    location: 'Fintech SaaS, San Francisco, CA',
    title: 'Chief Services Officer',
    tags: ['SaaS Turnaround', 'Financial Services', 'P&L Ownership', 'Org Building'],
    desc: <>One of seven executives hand-picked by the board to turn around a <strong>$55M ARR</strong> last-mile digital CX business in fintech. GM of the entire client services unit &mdash; Professional Services, Strategic Consulting, Customer Support, Education. Launched value-added services across <strong>Data &amp; Analytics, Content Strategy, and Interactive Design</strong>, building a profitable services org that touched the full customer lifecycle.</>
  },
  {
    id: 'ibm',
    startYear: 2023,
    period: 'Jul 2023 — Present',
    company: 'IBM Consulting',
    location: 'San Francisco, CA',
    title: <>Partner, <span className="it">Customer Transformation, Life Sciences</span></>,
    tags: ['Life Sciences', 'GenAI / watsonx', 'Adobe Practice', 'CX Transformation', 'C-Suite Advisory'],
    desc: <>Owning <strong>Customer Experience Transformation</strong> mandates for marquee Life Sciences clients including <strong>Abbott, Illumina, Genentech, AbbVie, and Regeneron</strong>. Grew the Adobe practice at Abbott from <strong>$0 to $20M</strong> over five years. Active GenAI initiatives include the Writer-AI partnership for Abbott&rsquo;s commercial use cases (auto-generated FAQs at scale), Generative Engine Optimization on Abbott&rsquo;s Adobe platform (llms.txt, JSON-LD), and a research-to-territory GenAI engine for Regeneron. Recipient of the <strong>IBM Industry Silver Badge</strong> for industry impact.</>
  }
];

function CareerArc() {
  const [selectedId, setSelectedId] = useState('ibm');
  const [hoveredId, setHoveredId] = useState(null);
  const selected = ROLES.find(r => r.id === selectedId);

  const START = 2005, END = 2026;
  const P0 = { x: 60, y: 160 };
  const P1 = { x: 500, y: 20 };
  const P2 = { x: 940, y: 60 };
  const arcPath = `M ${P0.x},${P0.y} Q ${P1.x},${P1.y} ${P2.x},${P2.y}`;

  const pointAt = (year) => {
    const t = (year - START) / (END - START);
    const u = 1 - t;
    return {
      x: u*u*P0.x + 2*u*t*P1.x + t*t*P2.x,
      y: u*u*P0.y + 2*u*t*P1.y + t*t*P2.y
    };
  };

  const tickX = (year) => P0.x + ((year - START) / (END - START)) * (P2.x - P0.x);
  const ticks = [2005, 2010, 2015, 2020, 2026];

  return (
    <div className="arc-wrap">
      <div className="arc-caption">
        <span className="arc-caption-note">Click a dot to explore each chapter</span>
      </div>

      <svg viewBox="0 0 1000 240" className="arc-svg" role="img" aria-label="Career arc from 2005 to present">
        <line x1={P0.x} x2={P2.x} y1="195" y2="195" className="arc-baseline"/>
        {ticks.map(y => (
          <g key={y}>
            <line x1={tickX(y)} x2={tickX(y)} y1="192" y2="198" className="arc-tick"/>
            <text x={tickX(y)} y="218" textAnchor="middle" className="arc-tick-label">
              {y === 2026 ? 'TODAY' : y}
            </text>
          </g>
        ))}

        <path d={arcPath} className="arc-line" />

        {ROLES.map(role => {
          const p = pointAt(role.startYear);
          const isSelected = role.id === selectedId;
          const isHovered = role.id === hoveredId;
          const showLabel = isSelected || isHovered;
          const cls = `arc-dot-group${isSelected ? ' is-selected' : ''}${isHovered ? ' is-hovered' : ''}`;
          return (
            <g
              key={role.id}
              className={cls}
              onClick={() => setSelectedId(role.id)}
              onMouseEnter={() => setHoveredId(role.id)}
              onMouseLeave={() => setHoveredId(null)}
              role="button"
              tabIndex={0}
              aria-label={`${role.company}, ${role.period}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(role.id); } }}
            >
              <circle cx={p.x} cy={p.y} r="22" className="arc-dot-hit" />
              <circle cx={p.x} cy={p.y} r="14" className="arc-dot-halo" />
              <line x1={p.x} x2={p.x} y1={p.y + 6} y2="193" className="arc-dot-tether" />
              <circle cx={p.x} cy={p.y} r="5" className="arc-dot" />
              {showLabel && (
                <text x={p.x} y={p.y - 16} textAnchor="middle" className="arc-dot-label">
                  {role.company}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="arc-detail" key={selectedId}>
        <div className="arc-detail-meta">
          <div className="arc-detail-year">{selected.startYear}</div>
          <div className="arc-detail-period">{selected.period}</div>
        </div>
        <div className="arc-detail-body">
          <h3 className="arc-detail-title">{selected.title}</h3>
          <div className="arc-detail-co">{selected.company} &mdash; {selected.location}</div>
          <p className="arc-detail-desc">{selected.desc}</p>
          <div className="arc-detail-tags">
            {selected.tags.map(t => <span key={t} className="arc-tag">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function FrogCard({ n, h, body }) {
  return (
    <div className="frog-card">
      <div className="frog-num">{n}</div>
      <h4>{h}</h4>
      <p>{body}</p>
    </div>
  );
}

function PovCard({ h, body }) {
  return (
    <div className="pov-card">
      <h4>{h}</h4>
      <p>{body}</p>
    </div>
  );
}

function FeatureCard({ n, h, body }) {
  return (
    <div className="pov-feature-card">
      <div className="pov-feature-num">{n}</div>
      <h5>{h}</h5>
      <p>{body}</p>
    </div>
  );
}

function RecItem({ name, detail }) {
  return (
    <div className="rec-item">
      <div className="rec-num">◆</div>
      <div>
        <div className="rec-name">{name}</div>
        <div className="rec-detail">{detail}</div>
      </div>
    </div>
  );
}

function LogoTile({ name, slug, customLogo }) {
  // Source priority: customLogo (1000logos.net) → Simple Icons CDN → text wordmark.
  // Each onError advances to the next source; when all are exhausted, render the wordmark.
  const sources = [customLogo, slug && `https://cdn.simpleicons.org/${slug}`].filter(Boolean);
  const [sourceIdx, setSourceIdx] = useState(0);
  const failed = sourceIdx >= sources.length;
  return (
    <div className="logo-tile" title={name}>
      {failed ? (
        <span className="logo-text">{name}</span>
      ) : (
        <img
          src={sources[sourceIdx]}
          alt={name}
          onError={() => setSourceIdx(i => i + 1)}
          loading="lazy"
        />
      )}
    </div>
  );
}

// ============================================================
// CSS — kept as a single template literal for portability
// ============================================================
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --paper:    #F1EAD9;
    --paper-2:  #E8DFC8;
    --paper-3:  #DDD2B5;
    --ink:      #16110D;
    --ink-soft: #3D362C;
    --accent:   #C8412A;
    --accent-2: #2D4A3E;
    --muted:    #8B7E6B;
    --rule:     #C9BFA8;
    --serif: "Fraunces", "Times New Roman", serif;
    --sans:  "IBM Plex Sans", system-ui, sans-serif;
    --mono:  "IBM Plex Mono", ui-monospace, monospace;
    --max: 1320px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--sans);
    background: var(--paper);
    color: var(--ink);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection { background: var(--accent); color: var(--paper); }

  body::before {
    content: ""; position: fixed; inset: 0;
    pointer-events: none; opacity: 0.4; mix-blend-mode: multiply; z-index: 1;
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0 0.04 0 0 0 0.10 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  }

  .wrap { max-width: var(--max); margin: 0 auto; padding: 0 32px; position: relative; z-index: 2; }

  /* TOP BAR */
  header.top { position: sticky; top: 0; z-index: 50; background: rgba(241, 234, 217, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--rule); }
  .top-inner { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; }
  .lock { font-family: var(--mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink); }
  .lock .dot { color: var(--accent); }
  .top-nav { display: flex; gap: 28px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
  .top-nav a { color: var(--ink-soft); text-decoration: none; transition: color .2s ease; }
  .top-nav a:hover { color: var(--accent); }
  .top-cta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; background: var(--ink); color: var(--paper); padding: 10px 18px; border-radius: 999px; text-decoration: none; transition: background .2s ease; }
  .top-cta:hover { background: var(--accent); }
  @media (max-width: 760px) { .top-nav { display: none; } }

  /* HERO */
  .hero { padding: 80px 0 70px; position: relative; }
  .hero-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; align-items: end; }
  @media (max-width: 980px) { .hero-grid { grid-template-columns: 1fr; gap: 56px; } }
  .hero-content { position: relative; z-index: 2; }
  .eyebrow { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); display: inline-flex; align-items: center; gap: 10px; margin-bottom: 28px; }
  .eyebrow::before { content: ""; width: 24px; height: 1px; background: var(--accent); }
  .display { font-family: var(--serif); font-weight: 400; font-size: clamp(56px, 9vw, 132px); line-height: 0.86; letter-spacing: -0.04em; color: var(--ink); font-variation-settings: "opsz" 144, "SOFT" 50; }
  .display .it { font-style: italic; font-weight: 300; color: var(--ink-soft); }
  .lede { font-family: var(--serif); font-size: clamp(20px, 1.7vw, 26px); line-height: 1.35; color: var(--ink-soft); font-weight: 300; max-width: 36ch; margin-top: 32px; }
  .lede em { color: var(--accent); font-style: italic; }
  .hero-meta { display: flex; flex-wrap: wrap; gap: 16px 28px; margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--rule); font-family: var(--mono); font-size: 12px; letter-spacing: 0.08em; color: var(--ink-soft); }
  .hero-meta span { display: inline-flex; align-items: center; gap: 8px; }
  .hero-meta span::before { content: "◆"; color: var(--accent); font-size: 9px; }

  /* LOGO MOSAIC (right side of hero) */
  .logo-side { position: relative; z-index: 2; }
  .logo-side-label {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--ink-soft);
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
  }
  .logo-side-label span { color: var(--accent); font-size: 8px; }
  .logo-mosaic {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
  }
  @media (max-width: 760px) { .logo-mosaic { grid-template-columns: repeat(4, 1fr); } } 
  @media (max-width: 520px) { .logo-mosaic { grid-template-columns: repeat(3, 1fr); } }
  .logo-tile {
    background: var(--paper-2);
    border-radius: 10px;
    aspect-ratio: 4 / 3;
    display: flex; align-items: center; justify-content: center;
    padding: 10px;
    transition: all .25s ease;
    border: 1px solid transparent;
    overflow: hidden;
  }
  .logo-tile:hover {
    background: var(--paper);
    border-color: var(--rule);
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -16px rgba(22,17,13,0.25);
  }
  .logo-tile img {
    max-width: 100%;
    max-height: 100%;
    width: auto; height: auto;
    object-fit: contain;
    filter: grayscale(1) brightness(0.18) opacity(0.78);
    transition: filter .3s ease, opacity .3s ease;
  }
  .logo-tile:hover img {
    filter: none;
    opacity: 1;
  }
  .logo-tile .logo-text {
    font-family: var(--serif);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(11px, 0.9vw, 15px);
    color: var(--ink);
    text-align: center;
    line-height: 1.05;
    letter-spacing: -0.01em;
    transition: color .25s ease;
  }
  .logo-tile:hover .logo-text { color: var(--accent); }

  /* STATS */
  .stats { border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin-top: 80px; }
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
  @media (max-width: 760px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
  .stat { padding: 36px 24px; border-right: 1px solid var(--rule); }
  .stat:last-child { border-right: none; }
  @media (max-width: 760px) {
    .stat:nth-child(2) { border-right: none; }
    .stat:nth-child(1), .stat:nth-child(2) { border-bottom: 1px solid var(--rule); }
  }
  .stat-num { font-family: var(--serif); font-weight: 400; font-size: clamp(40px, 4vw, 64px); line-height: 1; color: var(--ink); letter-spacing: -0.03em; }
  .stat-num .small { font-size: 0.5em; vertical-align: super; color: var(--accent); }
  .stat-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-soft); margin-top: 12px; }

  /* SECTIONS */
  section { padding: 96px 0; position: relative; scroll-margin-top: 80px; }
  .section-head { display: grid; grid-template-columns: 1fr 2fr; gap: 48px; margin-bottom: 56px; align-items: end; }
  @media (max-width: 760px) { .section-head { grid-template-columns: 1fr; gap: 24px; } }
  .section-num { font-family: var(--mono); font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); }
  .section-title { font-family: var(--serif); font-weight: 400; font-size: clamp(36px, 4.5vw, 64px); line-height: 1.0; letter-spacing: -0.025em; color: var(--ink); }
  .section-title .it { font-style: italic; font-weight: 300; color: var(--ink-soft); }

  /* NOW */
  .now { background: linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%); border-top: 1px solid var(--rule); }
  .now-card { background: var(--paper); border: 1px solid var(--rule); border-radius: 24px; padding: 48px; box-shadow: 0 24px 60px -32px rgba(22,17,13,0.18); position: relative; overflow: hidden; }
  @media (max-width: 760px) { .now-card { padding: 32px 24px; } }
  .now-card::after { content: ""; position: absolute; right: -120px; top: -120px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(200,65,42,0.08) 0%, transparent 70%); pointer-events: none; }
  .now-meta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--rule); }
  .now-role { font-family: var(--serif); font-weight: 400; font-size: clamp(28px, 3vw, 44px); line-height: 1.05; letter-spacing: -0.02em; }
  .now-role .it { font-style: italic; color: var(--accent); }
  .now-co { font-family: var(--mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-soft); }
  .now-body { font-family: var(--serif); font-size: 19px; line-height: 1.55; color: var(--ink-soft); font-weight: 300; max-width: 64ch; }
  .now-body strong { font-weight: 500; color: var(--ink); }
  .now-points { margin-top: 32px; display: grid; gap: 18px; }
  .point { display: grid; grid-template-columns: 24px 1fr; gap: 18px; align-items: start; padding: 14px 0; border-top: 1px solid var(--rule); }
  .point-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--accent); padding-top: 4px; }
  .point-text { font-family: var(--sans); font-size: 16px; line-height: 1.55; color: var(--ink); }
  .point-text strong { color: var(--accent); font-weight: 600; }
  .now-clients { margin-top: 36px; padding-top: 32px; border-top: 1px solid var(--rule); }
  .now-clients-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 18px; }
  .client-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
  @media (max-width: 980px) { .client-row { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 560px) { .client-row { grid-template-columns: repeat(2, 1fr); } }
  .client-tile { background: var(--paper-2); border-radius: 12px; padding: 22px 14px; text-align: center; transition: all .25s ease; border: 1px solid transparent; }
  .client-tile:hover { background: var(--ink); border-color: var(--ink); transform: translateY(-2px); }
  .client-tile .name { font-family: var(--serif); font-weight: 500; font-size: 22px; color: var(--ink); transition: color .25s ease; letter-spacing: -0.01em; }
  .client-tile:hover .name { color: var(--paper); }
  .client-tile .tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-top: 6px; transition: color .25s ease; }
  .client-tile:hover .tag { color: var(--accent); }

  .kpi-card { margin-top: 32px; padding: 28px 32px; background: var(--ink); color: var(--paper); border-radius: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; position: relative; overflow: hidden; }
  .kpi-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(60% 100% at 100% 50%, rgba(200,65,42,0.25), transparent 70%); pointer-events: none; }
  .kpi-num { font-family: var(--serif); font-weight: 400; font-size: clamp(36px, 4vw, 56px); line-height: 1; letter-spacing: -0.025em; color: var(--paper); position: relative; }
  .kpi-num::first-letter { color: var(--accent); }
  .kpi-label { font-family: var(--mono); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--paper-2); max-width: 32ch; text-align: right; position: relative; }
  @media (max-width: 560px) { .kpi-card { flex-direction: column; align-items: flex-start; } .kpi-label { text-align: left; } }

  /* WALL */
  .wall { background: var(--ink); color: var(--paper); }
  .wall .section-num { color: #E89A4A; }
  .wall .section-title { color: var(--paper); }
  .wall-marquee { overflow: hidden; margin: 0 -32px; padding: 32px 0; border-top: 1px solid rgba(241,234,217,0.12); border-bottom: 1px solid rgba(241,234,217,0.12); -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .wall-track { display: flex; gap: 64px; animation: marquee 60s linear infinite; width: max-content; }
  .wall-track:hover { animation-play-state: paused; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .logo-wm { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: clamp(28px, 3vw, 44px); color: var(--paper-3); white-space: nowrap; transition: color .2s ease; display: flex; align-items: center; gap: 18px; }
  .logo-wm:hover { color: var(--accent); }
  .logo-wm::after { content: "◆"; color: rgba(241,234,217,0.25); font-size: 10px; font-style: normal; }
  .industry-grid { margin-top: 80px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px; }
  @media (max-width: 760px) { .industry-grid { grid-template-columns: 1fr; gap: 32px; } }
  .industry { border-top: 1px solid rgba(241,234,217,0.18); padding-top: 24px; }
  .industry-name { font-family: var(--mono); font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: #E89A4A; margin-bottom: 18px; }
  .industry-list { display: flex; flex-wrap: wrap; gap: 8px 18px; list-style: none; }
  .industry-list li { font-family: var(--serif); font-size: 24px; color: var(--paper); font-weight: 400; letter-spacing: -0.01em; }
  .industry-list li.it { font-style: italic; font-weight: 300; color: var(--paper-3); }

/* CAREER ARC */
.arc-wrap { margin-top: 40px; }
.arc-caption { text-align: center; margin-bottom: 8px; }
.arc-caption-note {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.arc-svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

.arc-line {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.2;
  stroke-linecap: round;
  opacity: 0.35;
}

.arc-baseline { stroke: var(--rule); stroke-width: 1; }
.arc-tick { stroke: var(--ink-soft); stroke-width: 1; opacity: 0.6; }
.arc-tick-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  fill: var(--ink-soft);
}

.arc-dot-group { cursor: pointer; outline: none; }
.arc-dot-group:focus-visible .arc-dot-halo { opacity: 0.22; }
.arc-dot-hit { fill: transparent; }

.arc-dot {
  fill: var(--paper);
  stroke: var(--ink);
  stroke-width: 1.5;
  transition: all .25s ease;
  r: 5;
}
.arc-dot-group:hover .arc-dot,
.arc-dot-group.is-hovered .arc-dot { r: 6.5; stroke: var(--accent); }
.arc-dot-group.is-selected .arc-dot { r: 7.5; fill: var(--accent); stroke: var(--accent); }

.arc-dot-halo { fill: var(--accent); opacity: 0; transition: opacity .25s ease; }
.arc-dot-group:hover .arc-dot-halo,
.arc-dot-group.is-hovered .arc-dot-halo { opacity: 0.08; }
.arc-dot-group.is-selected .arc-dot-halo { opacity: 0.14; }

.arc-dot-tether {
  stroke: var(--ink-soft);
  stroke-width: 0.8;
  stroke-dasharray: 2 3;
  opacity: 0.25;
  transition: opacity .25s ease;
}
.arc-dot-group:hover .arc-dot-tether,
.arc-dot-group.is-selected .arc-dot-tether { opacity: 0.6; }

.arc-dot-label {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: 15px;
  fill: var(--accent);
  letter-spacing: -0.01em;
  pointer-events: none;
}
.arc-dot-group.is-hovered:not(.is-selected) .arc-dot-label { fill: var(--ink); }

.arc-detail {
  margin-top: 36px;
  padding-top: 36px;
  border-top: 1px solid var(--rule);
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 56px;
  align-items: start;
  animation: arcDetailIn .35s ease;
}
@media (max-width: 760px) {
  .arc-detail { grid-template-columns: 1fr; gap: 20px; padding-top: 28px; margin-top: 28px; }
}
@keyframes arcDetailIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.arc-detail-meta { padding-top: 4px; }
.arc-detail-year {
  font-family: var(--serif);
  font-size: 48px;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 8px;
}
.arc-detail-period {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.arc-detail-title {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 28px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin: 0;
}
.arc-detail-title .it { font-style: italic; font-weight: 300; }
.arc-detail-co {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-top: 10px;
}
.arc-detail-desc {
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-top: 20px;
  max-width: 62ch;
}
.arc-detail-desc strong { color: var(--ink); font-weight: 500; }
.arc-detail-desc em { color: var(--accent); font-style: italic; }
.arc-detail-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 22px; }
.arc-tag {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
  background: var(--paper-2);
  padding: 5px 10px;
  border-radius: 4px;
}

  /* FOR FROG */
  .for-frog { background: var(--paper-2); border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); position: relative; overflow: hidden; }
  .for-frog::before { content: ""; position: absolute; right: -200px; top: -200px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(45,74,62,0.07) 0%, transparent 70%); pointer-events: none; }
  .frog-mark { display: inline-flex; align-items: center; gap: 14px; color: var(--accent-2); font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 40px; }
  .frog-title { font-family: var(--serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 52px); line-height: 1.15; letter-spacing: -0.02em; color: var(--ink); max-width: 28ch; margin-bottom: 36px; }
  .frog-title .it { font-style: italic; color: var(--accent); font-weight: 400; }
  .frog-title .dim { font-style: italic; color: var(--ink-soft); font-weight: 300; }
  .frog-body { font-family: var(--serif); font-size: 20px; line-height: 1.55; color: var(--ink-soft); font-weight: 300; max-width: 60ch; margin-bottom: 64px; }
  .frog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
  @media (max-width: 760px) { .frog-grid { grid-template-columns: 1fr; gap: 24px; } }
  .frog-card { background: var(--paper); border-radius: 16px; padding: 32px; position: relative; border: 1px solid var(--rule); }
  .frog-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; color: var(--accent); margin-bottom: 16px; }
  .frog-card h4 { font-family: var(--serif); font-weight: 500; font-size: 24px; line-height: 1.2; letter-spacing: -0.015em; color: var(--ink); margin-bottom: 14px; }
  .frog-card p { font-family: var(--sans); font-size: 15px; line-height: 1.6; color: var(--ink-soft); }
  .frog-card p em { color: var(--accent-2); font-style: normal; font-weight: 600; }
  .frog-close { margin-top: 56px; padding-top: 32px; border-top: 1px solid var(--rule); font-family: var(--serif); font-size: 22px; line-height: 1.45; color: var(--ink); font-weight: 300; max-width: 60ch; }
  .frog-close .it { font-style: italic; color: var(--accent); }

  /* POV */
  .pov { background: var(--accent); color: var(--paper); position: relative; overflow: hidden; }
  .pov::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1), transparent 50%); pointer-events: none; }
  .pov-quote { font-family: var(--serif); font-weight: 300; font-style: italic; font-size: clamp(36px, 5vw, 72px); line-height: 1.05; letter-spacing: -0.025em; color: var(--paper); max-width: 22ch; position: relative; }
  .pov-quote::before { content: "\\201C"; font-size: 1.5em; line-height: 0; color: rgba(241,234,217,0.4); margin-right: 0.05em; vertical-align: -0.4em; }
  .pov-attr { font-family: var(--mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--paper-2); margin-top: 32px; }
  .pov-grid { margin-top: 64px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
  @media (max-width: 760px) { .pov-grid { grid-template-columns: 1fr; } }
  .pov-card { border-top: 1px solid rgba(241,234,217,0.3); padding-top: 24px; }
  .pov-card h4 { font-family: var(--serif); font-weight: 500; font-size: 22px; color: var(--paper); margin-bottom: 12px; letter-spacing: -0.01em; }
  .pov-card p { font-family: var(--sans); font-size: 15px; line-height: 1.6; color: var(--paper-2); }

  /* WORKING PAPER FEATURE inside POV */
  .pov-feature {
    margin-top: 96px;
    padding: 64px 0 0;
    border-top: 1px solid rgba(241,234,217,0.3);
    position: relative;
  }
  .pov-feature-label {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em;
    text-transform: uppercase; color: rgba(241,234,217,0.7);
    display: inline-flex; align-items: center; gap: 10px;
    margin-bottom: 28px;
  }
  .pov-feature-label span { color: var(--paper); font-size: 8px; }
  .pov-feature-title {
    font-family: var(--serif); font-weight: 400; font-style: italic;
    font-size: clamp(44px, 6vw, 88px); line-height: 0.95;
    color: var(--paper); letter-spacing: -0.03em;
  }
  .pov-feature-sub {
    font-family: var(--serif); font-weight: 300; font-style: italic;
    font-size: clamp(20px, 2vw, 26px); line-height: 1.3;
    color: rgba(241,234,217,0.85);
    margin-top: 12px;
    max-width: 30ch;
  }
  .pov-feature-thesis {
    font-family: var(--serif); font-weight: 300; font-size: clamp(18px, 1.4vw, 22px);
    line-height: 1.55; color: var(--paper);
    margin-top: 40px; max-width: 56ch;
    padding-left: 28px;
    border-left: 2px solid rgba(241,234,217,0.4);
  }
  .pov-feature-grid {
    margin-top: 56px;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px;
  }
  @media (max-width: 980px) { .pov-feature-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .pov-feature-grid { grid-template-columns: 1fr; } }
  .pov-feature-card {
    background: rgba(0, 0, 0, 0.16);
    border: 1px solid rgba(241,234,217,0.18);
    border-radius: 12px;
    padding: 24px 22px;
  }
  .pov-feature-num {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em;
    color: rgba(241,234,217,0.7);
    margin-bottom: 14px;
  }
  .pov-feature-card h5 {
    font-family: var(--serif); font-weight: 500; font-size: 19px;
    line-height: 1.2; color: var(--paper);
    letter-spacing: -0.01em; margin-bottom: 12px;
  }
  .pov-feature-card p {
    font-family: var(--sans); font-size: 14px; line-height: 1.55;
    color: var(--paper-2);
  }
  .pov-feature-card p em {
    color: var(--paper); font-style: normal; font-weight: 600;
  }
  .pov-feature-foot {
    margin-top: 40px;
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em;
    text-transform: uppercase; color: rgba(241,234,217,0.65);
    text-align: right;
  }

  /* EDU */
  .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 32px; }
  @media (max-width: 760px) { .edu-grid { grid-template-columns: 1fr; gap: 32px; } }
  .edu { padding: 32px; background: var(--paper-2); border-radius: 16px; }
  .edu-degree { font-family: var(--serif); font-weight: 500; font-size: 22px; line-height: 1.25; color: var(--ink); }
  .edu-school { font-family: var(--mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-soft); margin-top: 12px; }
  .edu-honor { font-family: var(--serif); font-style: italic; font-size: 16px; color: var(--accent); margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--rule); }

  /* RECOGNITION */
  .recognition { margin-top: 56px; padding-top: 40px; border-top: 1px solid var(--rule); }
  .rec-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 24px; }
  .rec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
  @media (max-width: 760px) { .rec-grid { grid-template-columns: 1fr; gap: 20px; } }
  .rec-item { display: grid; grid-template-columns: 24px 1fr; gap: 16px; align-items: start; }
  .rec-num { color: var(--accent); font-size: 12px; padding-top: 4px; }
  .rec-name { font-family: var(--serif); font-size: 20px; font-weight: 500; line-height: 1.2; letter-spacing: -0.01em; color: var(--ink); margin-bottom: 6px; }
  .rec-detail { font-family: var(--sans); font-size: 14px; line-height: 1.5; color: var(--ink-soft); }

  /* CTA */
  .cta { background: var(--ink); color: var(--paper); padding: 120px 0; position: relative; overflow: hidden; }
  .cta::before { content: ""; position: absolute; inset: 0; background: radial-gradient(80% 50% at 50% 100%, rgba(200,65,42,0.18), transparent 70%); pointer-events: none; }
  .cta-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 64px; align-items: end; position: relative; }
  @media (max-width: 760px) { .cta-grid { grid-template-columns: 1fr; gap: 32px; } }
  .cta-title { font-family: var(--serif); font-weight: 300; font-size: clamp(48px, 6vw, 96px); line-height: 0.95; letter-spacing: -0.03em; }
  .cta-title .it { font-style: italic; color: var(--accent); }
  .cta-meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--paper-3); display: grid; gap: 12px; }
  .cta-meta a { color: var(--paper); text-decoration: none; border-bottom: 1px solid rgba(241,234,217,0.3); padding-bottom: 4px; transition: border .2s ease; }
  .cta-meta a:hover { border-color: var(--accent); }
  .footer-strip { border-top: 1px solid rgba(241,234,217,0.18); margin-top: 96px; padding-top: 32px; display: flex; justify-content: space-between; align-items: center; font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--paper-3); }
  .footer-strip .made { color: var(--paper-3); }
  .footer-strip .made span { color: var(--accent); }
`;