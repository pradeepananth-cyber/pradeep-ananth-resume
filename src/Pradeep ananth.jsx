import React, { useState, useRef, useEffect } from 'react';

// ============================================================
// SYSTEM PROMPT for the AI chat
// ============================================================
const SYSTEM_PROMPT = `You are an AI assistant representing Pradeep Ananth. Your audience is the frog (Capgemini Invent) hiring committee evaluating Pradeep for a Vice President role focused on selling design-led customer experience transformation to C-suite buyers in CPG, Financial Services, and Healthcare.

Frame everything you say with that audience and that role in mind. The committee wants to know: can he sell the work? Can he hold a room of design-literate strategists AND a room of enterprise IT buyers? Will clients buy big from him? Does he get GenAI as more than a buzzword?

VOICE: Smart, warm, confident, direct. Never slick. Never marketing fluff. Use specifics over abstractions. Speak in third person about Pradeep ("Pradeep would...", "He led...", "His instinct here..."). 2-4 short paragraphs maximum. Use line breaks between paragraphs. No markdown bullets, no headers — clean prose only.

ABOUT PRADEEP:

Currently Partner, Customer Transformation, Life Sciences at IBM Consulting (since July 2023). Key clients: Abbott, Illumina, Genentech, AbbVie, Regeneron. He owns major Customer Experience Transformation engagements with a strong Generative AI through-line.

Headline IBM achievement: He grew the Adobe practice at Abbott from $0 to $20M over 5 years.

Specific GenAI projects he's running right now:
- ABBOTT: Partnered with Writer AI to deliver GenAI on commercial use cases — including auto-generated FAQs for support teams. Also extending Abbott's Adobe platform for Generative Engine Optimization (GEO) — adding llms.txt files, JSON-LD structured data, and other facilities so Abbott's web properties are discoverable and citable by LLM-based search and answer engines.
- REGENERON: Building a GenAI solution that analyzes huge volumes of qualitative user research to surface emotive territories that marketing can tap into. Essentially turning a year of ethnographic research into a real-time positioning tool.

CAREER ARC:
- Razorfish (2005-2010) — Group VP Technology, West Region. Part of 8-person exec team running a $50M+ business inside a $300M+ agency that was acquired by Microsoft for $6B. Clients: Visa, Genentech, Microsoft, Sony, Intel, NFL, Mattel, CBS, Yahoo. Notably, he partnered with frog Design on the Sun Microsystems engagement during this era — direct firsthand experience with frog's craft.
- Vivaki / Publicis Groupe (2010-2014) — CTO of a 200-person, $100M+ digital advertising unit. Built the AWS-based data platform that ingested signals from Google, Yahoo, DoubleClick, Bing.
- Deloitte Digital (2014-2019) — Digital Experience & SaaS Practice Lead, West Region. Strategic advisor to C-suite at HP, Intel, Salesforce, Cisco, Ally Bank, Cigna, Experian. Adobe / Salesforce / Google ecosystems.
- Celtra (2019-2020) — EVP / Chief Customer Officer, ~$45M ARR SaaS.
- Hearsay (2020-June 2023) — Chief Services Officer. Hand-picked by the board, one of seven executives leading a turnaround of a $55M ARR fintech CX SaaS.
- IBM Consulting (July 2023-present) — Partner, Customer Transformation, Life Sciences (current).

EDUCATION & RECOGNITION:
- Carnegie Mellon, MS Information Systems Management. Barker-Musser Fellow, 1 of 5 worldwide.
- PSG College of Technology, BE Electronics & Communications. Valedictorian.
- Industry Silver Badge, IBM.
- Active advisor to Silicon Valley agentic-AI startups Squarediff and Bodhium Labs.

WHAT HE BRINGS TO A DESIGN-LED CONSULTING ENVIRONMENT (very relevant for frog):
- He came up on the agency side (Razorfish was the original digital experience agency). He speaks creative.
- He can translate creative ambition into something enterprise IT will actually buy. That bridge is rare.
- He has personally sold and delivered in all three of frog's stated industry priorities: CPG (Unilever, P&G, Adidas, Taco Bell), FS (Visa, Ally Bank, Cigna), Healthcare (Genentech, Abbott, Illumina, AbbVie, Regeneron).
- He has lived inside Big Consulting (Deloitte), SaaS (Celtra, Hearsay), the holding-company agency model (Publicis/Vivaki, Razorfish), and enterprise consulting (IBM).

POINT OF VIEW:
- Generative AI is the new operating system for the customer relationship, not a feature bolted onto CX.
- Life sciences is the most data-rich and most CX-conservative industry; that regulatory rigor will become an advantage once GenAI is deployed responsibly.
- Modern CX is a context engine, not a content factory.
- Most enterprises don't have a tech problem; they have a translation problem between boardroom ambition, brand voice, regulated reality, and engineering throughput.

STYLE RULES:
- If asked something specific you don't actually know, say so honestly and pivot to adjacent ground.
- Don't oversell. Be measured.
- For "summarize a chapter" requests, focus on what's relevant for a market-facing VP role at frog: business outcomes, client relationships, sold and delivered work, team built, ability to hold rooms.
- For "apply to a client X" requests, give specific tactical insight: what their CX challenge likely looks like today, why Pradeep's mix of experience suits it, what he would propose in the first 90 days. Be concrete.`;

// ============================================================
// DATA
// ============================================================
const CHAPTERS = [
  { key: 'IBM',       label: 'IBM',       full: 'IBM Consulting (Partner, Customer Transformation, Life Sciences — 2023 to present)' },
  { key: 'Hearsay',   label: 'Hearsay',   full: 'Hearsay (Chief Services Officer — 2020-2023)' },
  { key: 'Celtra',    label: 'Celtra',    full: 'Celtra (EVP / Chief Customer Officer — 2019-2020)' },
  { key: 'Deloitte',  label: 'Deloitte',  full: 'Deloitte Digital (Digital Experience Practice Lead — 2014-2019)' },
  { key: 'Vivaki',    label: 'Vivaki',    full: 'Vivaki / Publicis (CTO — 2010-2014)' },
  { key: 'Razorfish', label: 'Razorfish', full: 'Razorfish (Group VP, Technology, West — 2005-2010)' }
];

const MARQUEE = [
  'Abbott','Illumina','Genentech','AbbVie','Regeneron','Microsoft','Intel','HP','Adobe',
  'Salesforce','Cisco','Sony','Unilever','P&G','Adidas','Visa','Cigna','Ally Bank','Experian',
  'Singapore Airlines','NFL','CBS','Mattel','Taco Bell','Yahoo','Sun Microsystems'
];

// ============================================================
// COMPONENT
// ============================================================
export default function PradeepResume() {
  const [messages, setMessages] = useState([]);   // chat history sent to API
  const [bubbles, setBubbles]   = useState([]);   // displayed bubbles {role, text, isThinking}
  const [busy, setBusy]         = useState(false);
  const [clientInput, setClientInput] = useState('');
  const [meshPaths, setMeshPaths] = useState([100, 110, 120, 130, 140]);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat when new bubbles appear
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [bubbles]);

  // Animate decorative SVG mesh
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.02;
      setMeshPaths(prev => prev.map((_, i) => 100 + i * 10 + Math.sin(t + i * 0.5) * 8));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // ------------- chat ask -----------------
  async function ask(question, displayLabel) {
    if (!question || !question.trim() || busy) return;
    setBusy(true);

    const newUserBubble = { role: 'user', text: displayLabel || question };
    const thinkingBubble = { role: 'assistant', text: '◇ thinking ◇', isThinking: true };
    setBubbles(prev => [...prev, newUserBubble, thinkingBubble]);

    const newMessages = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: newMessages
        })
      });
      if (!response.ok) throw new Error('API ' + response.status);
      const data = await response.json();
      const text = data.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n');

      // Replace thinking bubble with empty assistant bubble, then type out
      setBubbles(prev => [...prev.slice(0, -1), { role: 'assistant', text: '' }]);

      // Stream the text out for effect
      let i = 0;
      const tick = () => {
        if (i < text.length) {
          const slice = text.slice(0, i + 2);
          setBubbles(prev => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', text: slice };
            return next;
          });
          i += 2;
          setTimeout(tick, 8);
        } else {
          setBubbles(prev => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', text };
            return next;
          });
        }
      };
      tick();

      setMessages([...newMessages, { role: 'assistant', content: text }]);
    } catch (err) {
      setBubbles(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', text: "I can't reach the model from this hosted page (no API key in the browser). The live demo runs in the Claude artifact view. In the meantime, please reach out at pradeepananth@gmail.com." }
      ]);
    } finally {
      setBusy(false);
    }
  }

  function askChapter(c) {
    ask(
      `Summarize what Pradeep did at ${c.full}. Focus on what's most relevant to evaluating him for a market-facing Vice President role at frog (Capgemini Invent). Cover: scope of role, business outcomes, the kinds of clients/work, team or P&L size, and what it tells the committee about how he operates.`,
      `Tell me about ${c.label}.`
    );
  }

  function askClient() {
    const c = clientInput.trim();
    if (!c) return;
    setClientInput('');
    ask(
      `The frog hiring committee is asking how Pradeep would bring value to ${c}. Based on his actual experience and POV, give a specific, grounded take: what's the likely CX challenge at ${c} today, why Pradeep's background uniquely suits it, and what he would propose in the first 90 days of an engagement. Be concrete, not generic.`,
      `How would Pradeep bring value to ${c}?`
    );
  }

  // Build mesh path strings from animated yOffsets
  const meshD = meshPaths.map(y => `M0,${y} Q50,${y - 80} 100,${y} T200,${y}`);

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
            <a href="#clients"  onClick={navTo('clients')}>Clients</a>
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
            <div>
              <div className="eyebrow">Customer Experience &mdash; Reimagined for the AI Era</div>
              <h1 className="display">
                Pradeep<br/>
                <span className="it">Ananth.</span>
              </h1>
              <p className="lede">
                Two decades reinventing how the world&rsquo;s most ambitious companies meet their customers. Today, helping life&nbsp;sciences leaders translate <em>generative&nbsp;AI</em> into customer experiences that actually move outcomes.
              </p>
              <div className="hero-meta">
                <span>Partner, IBM Consulting</span>
                <span>Customer Transformation, Life Sciences</span>
                <span>20+ Years</span>
                <span>San Francisco</span>
              </div>
            </div>

            {/* AI Chat */}
            <div className="chat-card">
              <div className="chat-head">
                <div className="chat-title"><span className="pulse"/> Ask Pradeep&rsquo;s AI</div>
                <div className="chat-badge">Powered by Claude</div>
              </div>
              <div className="chat-prompt">
                Pick a chapter to <em>summarize</em>, or name a client and I&rsquo;ll show you how I&rsquo;d bring value.
              </div>

              <div className="chat-mode">
                <div className="chat-mode-label">Summarize a chapter</div>
                <div className="chat-chips">
                  {CHAPTERS.map(c => (
                    <button
                      key={c.key}
                      className="chip"
                      disabled={busy}
                      onClick={() => askChapter(c)}
                    >{c.label}</button>
                  ))}
                </div>
              </div>

              <div className="chat-mode">
                <div className="chat-mode-label">Apply to a client</div>
                <div className="chat-input-row">
                  <input
                    className="chat-input"
                    type="text"
                    placeholder="e.g., Roche, JPMorgan, Procter & Gamble…"
                    value={clientInput}
                    onChange={e => setClientInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && askClient()}
                    autoComplete="off"
                  />
                  <button className="chat-send" onClick={askClient} disabled={busy}>
                    {busy ? 'Thinking…' : 'Show me'}
                  </button>
                </div>
              </div>

              {bubbles.length > 0 && (
                <div className="chat-messages">
                  {bubbles.map((b, idx) => (
                    <div
                      key={idx}
                      className={`msg ${b.role === 'user' ? 'you' : 'bot'}${b.isThinking ? ' thinking' : ''}`}
                    >{b.text}</div>
                  ))}
                  <div ref={messagesEndRef}/>
                </div>
              )}
            </div>
          </div>

          {/* Decorative mesh */}
          <svg className="mesh" viewBox="0 0 200 200" preserveAspectRatio="none">
            {meshD.map((d, i) => <path key={i} d={d}/>)}
          </svg>
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

      {/* CLIENT WALL */}
      <section className="wall" id="clients">
        <div className="wrap">
          <div className="section-head">
            <div><div className="section-num">02 / Track Record</div></div>
            <h2 className="section-title">Two decades.<br/>Fifty-plus<br/><span className="it">global brands.</span></h2>
          </div>

          <div className="wall-marquee">
            <div className="wall-track">
              {[...MARQUEE, ...MARQUEE].map((name, i) => (
                <div className="logo-wm" key={i}>{name}</div>
              ))}
            </div>
          </div>

          <div className="industry-grid">
            <Industry name="Life Sciences & Healthcare"
              items={['Abbott', 'Illumina', 'Genentech', 'AbbVie', 'Regeneron', 'Cigna']}/>
            <Industry name="Technology"
              items={['Microsoft', 'Intel', 'HP', 'Adobe', 'Salesforce', 'Cisco', 'Sony', 'Yahoo']}/>
            <Industry name="Consumer & Retail"
              items={['Unilever', 'P&G', 'Adidas', 'Taco Bell', 'Mattel']}/>
            <Industry name="Financial Services"
              items={['Visa', 'Ally Bank', 'Experian']}/>
            <Industry name="Travel & Sports"
              items={['Singapore Airlines', 'NFL']}/>
            <Industry name="Media & Entertainment"
              items={['CBS', 'Sony Pictures']}/>
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

          <div className="timeline">
            <Role
              year="2023" period="Jul 2023 — Present"
              title={<>Partner, <span className="it">Customer Transformation, Life Sciences</span></>}
              co="IBM Consulting — San Francisco, CA"
              tags={['Life Sciences', 'GenAI / watsonx', 'Adobe Practice', 'CX Transformation', 'C-Suite Advisory']}
              desc={<>Owning <strong>Customer Experience Transformation</strong> mandates for marquee Life Sciences clients including <strong>Abbott, Illumina, Genentech, AbbVie, and Regeneron</strong>. Grew the Adobe practice at Abbott from <strong>$0 to $20M</strong> over five years. Active GenAI initiatives include the Writer-AI partnership for Abbott&rsquo;s commercial use cases (auto-generated FAQs at scale), Generative Engine Optimization on Abbott&rsquo;s Adobe platform (llms.txt, JSON-LD), and a research-to-territory GenAI engine for Regeneron. Recipient of the <strong>IBM Industry Silver Badge</strong> for industry impact.</>}
            />

            <Role
              year="2020" period="May 2020 — Jun 2023"
              title="Chief Services Officer"
              co="Hearsay Corp. (Fintech SaaS) — San Francisco, CA"
              tags={['SaaS Turnaround', 'Financial Services', 'P&L Ownership', 'Org Building']}
              desc={<>One of seven executives hand-picked by the board to turn around a <strong>$55M ARR</strong> last-mile digital CX business in fintech. GM of the entire client services unit &mdash; Professional Services, Strategic Consulting, Customer Support, Education. Launched value-added services across <strong>Data &amp; Analytics, Content Strategy, and Interactive Design</strong>, building a profitable services org that touched the full customer lifecycle.</>}
            />

            <Role
              year="2019" period="Apr 2019 — Apr 2020"
              title={<>EVP &amp; <span className="it">Chief Customer Officer</span></>}
              co="Celtra Inc. — San Francisco, CA"
              tags={['Customer Success', 'SaaS', 'AdTech']}
              desc={<>Owned retention and growth of a <strong>~$45M ARR</strong> SaaS platform for building and managing dynamic digital advertising at scale. Re-set customer success motion across enterprise accounts.</>}
            />

            <Role
              year="2014" period="Jan 2014 — Mar 2019"
              title={<>Digital Experience &amp; <span className="it">SaaS Practice Lead</span></>}
              co="Deloitte Digital — San Francisco, CA"
              tags={['Big-5 Consulting', 'Adobe / Salesforce', 'SaaS Transformation', 'C-Suite Advisory']}
              desc={<>Built and grew the West Region digital experience and SaaS Transformation practice. Strategic advisor to C-suite executives across <strong>HP, Intel, Salesforce, Cisco, Ally Bank, Cigna, Experian</strong>. Delivered end-to-end CX solutions on Adobe Experience Cloud, Salesforce Marketing Cloud, and Google Ad Cloud. Led delivery teams of up to 50 onshore + offshore. Operations Lead for the entire community of practice.</>}
            />

            <Role
              year="2010" period="Oct 2010 — Jan 2014"
              title="Chief Technology Officer"
              co="Vivaki (Publicis Groupe) — San Francisco, CA"
              tags={['CTO', 'AWS / Big Data', 'AdTech', 'Product Engineering']}
              desc={<>Technology leader for Publicis&rsquo; bet on the digital advertising future. Vivaki grew to <strong>200 people and $100M+ in revenue</strong>. Built the data platform that ingested signals from Google, Yahoo, DoubleClick, Bing &mdash; the early-cloud foundation for the agency network&rsquo;s digital practice. Shipped strategic products: <strong>Insights on Demand, Campaigns on Demand, Benchtools, Data Hub.</strong></>}
            />

            <Role
              year="2005" period="Jun 2005 — Sep 2010"
              title={<>Group Vice President, <span className="it">Technology — West</span></>}
              co="Razorfish — San Francisco, CA"
              tags={['Agency Exec', '$50M+ P&L', 'frog x Sun Microsystems', 'Multi-industry']}
              desc={<>Part of the 8-person executive management team running a <strong>$50M+ West Region business</strong> within a $300M+ global agency (acquired by Microsoft for $6B). Clients: <strong>Visa, Genentech, Microsoft, Sony, Intel, NFL, Mattel, CBS, PG&amp;E, Yahoo</strong>. Led $40M+ in business development wins. Grew the technology organization from 30 to 50 people. Held some of the highest delivery margins (20-25%) in the company. <em>Notably &mdash; partnered directly with frog Design on the Sun Microsystems engagement during this period.</em></>}
            />
          </div>
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
            Generative AI isn&rsquo;t a feature you bolt onto CX. It&rsquo;s the new operating system for the customer relationship itself.
          </p>
          <div className="pov-attr">&mdash; Pradeep, on what&rsquo;s actually changing</div>

          <div className="pov-grid">
            <PovCard h="The pharma paradox"
              body="Life sciences companies are simultaneously the most data-rich and most CX-conservative organizations on the planet. The same regulatory rigor that has slowed down meaningful customer-experience innovation is exactly the discipline that will let them lead, once GenAI is deployed responsibly."/>
            <PovCard h="From content factory to context engine"
              body="The modern CX function isn't a content factory; it's a context engine. The teams that win in the next five years will treat every interaction as a generative event — assembled in the moment from approved building blocks, governed by trust, measured by outcome."/>
            <PovCard h="Services orgs are the unlock"
              body="Most enterprises don't have a technology problem. They have a translation problem. The job is to bridge boardroom ambition, brand voice, regulated reality, and engineering throughput. That bridge is built by services leaders who have lived in all four worlds."/>
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

function Role({ year, period, title, co, tags, desc }) {
  return (
    <div className="role">
      <div className="role-time">
        <span className="yr">{year}</span>
        {period}
      </div>
      <div className="role-body">
        <div className="role-title">{title}</div>
        <div className="role-co">{co}</div>
        <p className="role-desc">{desc}</p>
        <div className="role-tags">
          {tags.map(t => <span key={t} className="role-tag">{t}</span>)}
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
  .hero { padding: 80px 0 60px; position: relative; }
  .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: end; }
  @media (max-width: 980px) { .hero-grid { grid-template-columns: 1fr; gap: 40px; } }
  .eyebrow { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); display: inline-flex; align-items: center; gap: 10px; margin-bottom: 28px; }
  .eyebrow::before { content: ""; width: 24px; height: 1px; background: var(--accent); }
  .display { font-family: var(--serif); font-weight: 400; font-size: clamp(64px, 10vw, 168px); line-height: 0.86; letter-spacing: -0.04em; color: var(--ink); font-variation-settings: "opsz" 144, "SOFT" 50; }
  .display .it { font-style: italic; font-weight: 300; color: var(--ink-soft); }
  .lede { font-family: var(--serif); font-size: clamp(20px, 1.6vw, 26px); line-height: 1.35; color: var(--ink-soft); font-weight: 300; max-width: 36ch; margin-top: 28px; }
  .lede em { color: var(--accent); font-style: italic; }
  .hero-meta { display: flex; flex-wrap: wrap; gap: 18px 32px; margin-top: 36px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.08em; color: var(--ink-soft); }
  .hero-meta span { display: inline-flex; align-items: center; gap: 8px; }
  .hero-meta span::before { content: "◆"; color: var(--accent); font-size: 9px; }

  /* CHAT CARD */
  .chat-card { background: var(--ink); color: var(--paper); border-radius: 24px; padding: 28px; box-shadow: 0 24px 60px -24px rgba(22,17,13,0.45); position: relative; overflow: hidden; }
  .chat-card::before { content: ""; position: absolute; inset: -2px; background: radial-gradient(120% 60% at 100% 0%, rgba(200,65,42,0.25), transparent 60%); pointer-events: none; }
  .chat-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; position: relative; }
  .chat-title { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--paper-2); display: flex; align-items: center; gap: 10px; }
  .pulse { width: 8px; height: 8px; border-radius: 50%; background: #6FCF97; box-shadow: 0 0 0 0 rgba(111,207,151,0.6); animation: pulse 2s infinite; }
  @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(111,207,151,0.6); } 70% { box-shadow: 0 0 0 10px rgba(111,207,151,0); } 100% { box-shadow: 0 0 0 0 rgba(111,207,151,0); } }
  .chat-badge { font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--paper-3); border: 1px solid rgba(241,234,217,0.18); padding: 4px 10px; border-radius: 999px; }
  .chat-prompt { font-family: var(--serif); font-size: 22px; line-height: 1.3; font-weight: 300; color: var(--paper); margin-bottom: 22px; position: relative; }
  .chat-prompt em { color: var(--accent); font-style: italic; }
  .chat-messages { display: flex; flex-direction: column; gap: 14px; max-height: 320px; overflow-y: auto; padding-right: 4px; scrollbar-width: thin; scrollbar-color: rgba(241,234,217,0.2) transparent; margin-top: 22px; padding-top: 22px; border-top: 1px solid rgba(241,234,217,0.1); }
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-thumb { background: rgba(241,234,217,0.2); border-radius: 2px; }
  .msg { font-size: 14px; line-height: 1.55; padding: 12px 16px; border-radius: 14px; max-width: 90%; animation: fadein .4s ease; white-space: pre-wrap; }
  @keyframes fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  .msg.you { background: var(--accent); color: var(--paper); align-self: flex-end; border-bottom-right-radius: 4px; }
  .msg.bot { background: rgba(241,234,217,0.08); color: var(--paper-2); border: 1px solid rgba(241,234,217,0.1); align-self: flex-start; border-bottom-left-radius: 4px; }
  .msg.bot.thinking { font-family: var(--mono); font-size: 12px; letter-spacing: 0.05em; color: var(--paper-3); opacity: 0.7; }
  .chat-input-row { display: flex; gap: 10px; }
  .chat-input { flex: 1; background: rgba(241,234,217,0.07); border: 1px solid rgba(241,234,217,0.14); color: var(--paper); padding: 14px 16px; border-radius: 12px; font-family: var(--sans); font-size: 14px; transition: border .2s ease; }
  .chat-input:focus { outline: none; border-color: var(--accent); }
  .chat-input::placeholder { color: rgba(241,234,217,0.4); }
  .chat-send { background: var(--accent); border: 0; color: var(--paper); padding: 0 22px; border-radius: 12px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: background .2s ease; }
  .chat-send:hover:not(:disabled) { background: #B83820; }
  .chat-send:disabled { opacity: 0.5; cursor: wait; }
  .chat-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { font-family: var(--mono); font-size: 11px; letter-spacing: 0.05em; background: transparent; color: var(--paper-3); border: 1px solid rgba(241,234,217,0.18); padding: 7px 12px; border-radius: 999px; cursor: pointer; transition: all .2s ease; }
  .chip:hover:not(:disabled) { background: rgba(200,65,42,0.15); color: var(--paper); border-color: var(--accent); }
  .chip:disabled { opacity: 0.5; cursor: wait; }
  .chat-mode { margin-top: 18px; }
  .chat-mode + .chat-mode { margin-top: 22px; padding-top: 22px; border-top: 1px solid rgba(241,234,217,0.1); }
  .chat-mode-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--paper-3); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
  .chat-mode-label::before { content: ""; width: 14px; height: 1px; background: var(--accent); }

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

  /* TIMELINE */
  .timeline { display: grid; gap: 0; margin-top: 32px; }
  .role { display: grid; grid-template-columns: 200px 1fr; gap: 56px; padding: 40px 0; border-top: 1px solid var(--rule); align-items: start; }
  .role:last-child { border-bottom: 1px solid var(--rule); }
  @media (max-width: 760px) { .role { grid-template-columns: 1fr; gap: 16px; padding: 32px 0; } }
  .role-time { font-family: var(--mono); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); padding-top: 8px; }
  .role-time .yr { display: block; font-size: 32px; font-family: var(--serif); color: var(--ink); letter-spacing: -0.02em; margin-bottom: 4px; }
  .role-title { font-family: var(--serif); font-weight: 500; font-size: 28px; line-height: 1.15; letter-spacing: -0.02em; color: var(--ink); }
  .role-title .it { font-style: italic; font-weight: 300; }
  .role-co { font-family: var(--mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-soft); margin-top: 8px; }
  .role-desc { font-family: var(--sans); font-size: 16px; line-height: 1.6; color: var(--ink-soft); margin-top: 18px; max-width: 60ch; }
  .role-desc strong { color: var(--ink); font-weight: 500; }
  .role-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
  .role-tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); background: var(--paper-2); padding: 5px 10px; border-radius: 4px; }

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

  /* MESH */
  .mesh { position: absolute; right: -10%; top: 8%; width: 50%; height: 70%; pointer-events: none; opacity: 0.5; z-index: 0; }
  @media (max-width: 980px) { .mesh { display: none; } }
  .mesh path { fill: none; stroke: var(--accent); stroke-width: 0.4; opacity: 0.4; }
`;