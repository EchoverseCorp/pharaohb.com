import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { JsonLd } from '@/components/shared/JsonLd';
import { First100SectionKey, getFirst100Entry, getFirst100Section } from '@/data/first100Content';

interface MappedContentPageProps {
  section: First100SectionKey;
}

function upsertMeta(name: string, content: string) {
  const selector = `meta[name="${name}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function sectionVoice(section: First100SectionKey): { lens: string; focus: string; defaultNeed: string } {
  if (section === 'think-clearly') {
    return {
      lens: 'mental clarity and decision quality',
      focus: 'separating useful reflection from repetitive rumination',
      defaultNeed: 'Think Clearly',
    };
  }
  if (section === 'build-discipline') {
    return {
      lens: 'consistency and execution',
      focus: 'building reliable systems that work even when motivation drops',
      defaultNeed: 'Build Discipline',
    };
  }
  if (section === 'find-direction') {
    return {
      lens: 'purpose and direction',
      focus: 'making aligned choices when life feels scattered',
      defaultNeed: 'Find Direction',
    };
  }
  if (section === 'creative-expression' || section === 'creative-media') {
    return {
      lens: 'creative expression',
      focus: 'turning insight into finished creative output',
      defaultNeed: 'Creative Expression',
    };
  }
  return {
    lens: 'applied learning',
    focus: 'converting ideas and reading into practical action',
    defaultNeed: 'Books and Tools',
  };
}

function titleSignals(title: string) {
  const t = title.toLowerCase();
  return {
    overthinking: /\boverthinking|rumination|noisy mind|overanalyzing|indecision|cognitive bias\b/.test(t),
    decisions: /\bdecision|judgment|thinking clearly|mental model\b/.test(t),
    discipline: /\bdiscipline|habit|procrastinating|consistency|routine|productive|momentum\b/.test(t),
    direction: /\bdirection|purpose|meaning|life path|lost in life|self-mastery\b/.test(t),
    creativity: /\bcreative|creativity|artist|writing|art\b/.test(t),
    books: /\bbook|philosophy|stoic|guide|study\b/.test(t),
  };
}

function generateExamples(title: string, section: First100SectionKey): string[] {
  const s = titleSignals(title);
  if (section === 'think-clearly' || s.overthinking || s.decisions) {
    return [
      'Before responding to a difficult message, write two possible outcomes and choose the one aligned with your long-term standard.',
      'When stuck between options, force a 10-minute deadline and commit to the best available evidence, not perfect certainty.',
      'Use a one-page decision log so you can learn from outcomes instead of replaying anxiety loops.',
    ];
  }
  if (section === 'build-discipline' || s.discipline) {
    return [
      'Reduce your morning routine to a non-negotiable 20-minute baseline that you can keep every day.',
      'Use environment design: remove one distraction trigger tonight, then track the next 7 days.',
      'Pair one difficult behavior with a fixed cue (same time, same place) until it becomes automatic.',
    ];
  }
  if (section === 'find-direction' || s.direction) {
    return [
      'List three projects, then keep only the one that serves your values and your next 12 months.',
      'Replace “what should I do with my life?” with “what problem can I solve repeatedly this quarter?”',
      'Run a weekly direction review: what created energy, what drained energy, what to keep or cut.',
    ];
  }
  if (section === 'creative-expression' || section === 'creative-media' || s.creativity) {
    return [
      'Create a daily shipping window: 30 minutes minimum, output first, editing second.',
      'Treat creative blocks as unclear constraints; define format, length, and deadline before starting.',
      'Publish drafts in cycles and let feedback improve clarity over time.',
    ];
  }
  return [
    'Convert one insight from this page into a concrete action today.',
    'Keep your implementation simple enough to repeat for seven days.',
    'Measure behavior change, not just understanding.',
  ];
}

function buildDeepContent(title: string, section: First100SectionKey) {
  const voice = sectionVoice(section);
  const examples = generateExamples(title, section);
  return {
    intro: [
      `${title} is not just a concept to understand, it is a practical skill you can train. Most people stay stuck because they consume ideas without building a repeatable way to apply them.`,
      `This guide approaches ${title.toLowerCase()} through the lens of ${voice.lens}, with emphasis on ${voice.focus}. The goal is not inspiration alone, but measurable movement in daily life.`,
    ],
    whyItMatters: [
      `Without structure, your mind defaults to loops: repeated thoughts, delayed decisions, and fragmented action. Over time, those loops quietly shape your identity and outcomes.`,
      `When you clarify this area, you reclaim time, attention, and agency. Better choices become less emotional and more intentional, and your daily behavior starts matching your deeper values.`,
      `The practical impact is compounding: one clearer decision today reduces noise tomorrow, and that reduction creates space for stronger execution across work, relationships, and creative life.`,
    ],
    framework: [
      'Name the exact problem in one sentence. If it is vague, your action will also be vague.',
      'Define a simple success condition for the next seven days. Keep it observable.',
      'Pick one primary method and one fallback method to maintain momentum.',
      'Schedule implementation windows and protect them like non-negotiable commitments.',
      'Review outcomes weekly and adjust the process, not your identity.',
    ],
    mistakes: [
      'Confusing planning with progress and delaying execution in the name of perfection.',
      'Trying to optimize everything at once instead of stabilizing one system first.',
      'Treating setbacks as personal failure instead of feedback about the process.',
      'Consuming more content when what is needed is consistent implementation.',
    ],
    sevenDayPlan: [
      'Day 1: Define your objective and baseline behavior.',
      'Day 2: Apply the framework to one real decision or task.',
      'Day 3: Remove one friction point from your environment.',
      'Day 4: Repeat with tighter constraints and shorter feedback loops.',
      'Day 5: Track what worked and what created resistance.',
      'Day 6: Refine your process and keep only what is sustainable.',
      'Day 7: Review results, document lessons, and set the next cycle.',
    ],
    prompts: [
      `Where am I creating unnecessary complexity around ${title.toLowerCase()}?`,
      'What one behavior, if repeated daily, would create the largest long-term shift?',
      'What am I avoiding because I am waiting to feel ready?',
      'What would consistent execution look like at 80% quality this week?',
    ],
    examples,
    close: `Use this page as a working document, not a one-time read. Return to it after each weekly cycle and tighten your process. Progress comes from repetition with awareness, not from intensity without structure.`,
    needLabel: voice.defaultNeed,
  };
}

export default function MappedContentPage({ section }: MappedContentPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const entry = getFirst100Entry(section, slug || '');
  const sectionData = getFirst100Section(section);

  useEffect(() => {
    if (!entry) return;
    document.title = `${entry.title} | Pharaoh B`;
    upsertMeta('description', entry.summary);
  }, [entry]);

  if (!entry || !sectionData) {
    return (
      <PageLayout>
        <SectionContainer className="pt-32 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-cinzel text-3xl text-gold-gradient mb-4">Page Not Found</h1>
            <p className="font-cormorant text-lg text-muted-foreground mb-6">
              This mapped page is not available yet.
            </p>
            <Link to={sectionData?.href || '/start'} className="font-cinzel text-xs tracking-wider uppercase text-primary">
              Return to Section {'->'}
            </Link>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  const related = sectionData.entries.filter((item) => item.slug !== entry.slug).slice(0, 6);
  const studyGuideMode = entry.section === 'study-guides';
  const studyTopic = entry.title.replace(/\s*-\s*study guide$/i, '').trim();
  const content = buildDeepContent(entry.title, entry.section);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.summary,
    mainEntityOfPage: entry.href,
  };

  return (
    <PageLayout>
      <JsonLd data={schema} />
      <PageHeader title={entry.title} subtitle={sectionData.title} orientationText={sectionData.description} />

      <SectionContainer>
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="border border-primary/20 bg-card p-6 md:p-8">
            <h2 className="font-cinzel text-2xl text-foreground mb-3">Summary</h2>
            <p className="font-cormorant text-lg text-muted-foreground leading-relaxed">{entry.summary}</p>
          </section>

          <section className="border border-border bg-card p-6 md:p-8">
            <h2 className="font-cinzel text-2xl text-foreground mb-4">Full Guide</h2>
            <div className="space-y-4 font-cormorant text-lg text-muted-foreground leading-relaxed">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="border border-border bg-card p-6 md:p-8">
            <h3 className="font-cinzel text-xl text-foreground mb-3">Why This Matters</h3>
            <div className="space-y-3 font-cormorant text-muted-foreground leading-relaxed">
              {content.whyItMatters.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="border border-border bg-card p-6 md:p-8">
            <h3 className="font-cinzel text-xl text-foreground mb-3">Real-World Examples</h3>
            <ul className="space-y-2 font-cormorant text-muted-foreground">
              {content.examples.map((example) => (
                <li key={example}>- {example}</li>
              ))}
            </ul>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border bg-card p-5">
              <h3 className="font-cinzel text-lg text-foreground mb-3">Core Framework</h3>
              <ol className="space-y-2 font-cormorant text-muted-foreground">
                {content.framework.map((step) => (
                  <li key={step}>- {step}</li>
                ))}
              </ol>
            </div>
            <div className="border border-border bg-card p-5">
              <h3 className="font-cinzel text-lg text-foreground mb-3">Common Mistakes</h3>
              <ul className="space-y-2 font-cormorant text-muted-foreground">
                {content.mistakes.map((mistake) => (
                  <li key={mistake}>- {mistake}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="border border-border bg-card p-6 md:p-8">
            <h3 className="font-cinzel text-xl text-foreground mb-3">7-Day Implementation Plan</h3>
            <ul className="space-y-2 font-cormorant text-muted-foreground">
              {content.sevenDayPlan.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </section>

          {studyGuideMode && (
            <section className="border border-primary/20 bg-card p-6 md:p-8">
              <h2 className="font-cinzel text-2xl text-foreground mb-4">{studyTopic} - Study Guide Template</h2>
              <div className="space-y-5 font-cormorant text-muted-foreground">
                <div>
                  <h3 className="font-cinzel text-lg text-foreground mb-2">Summary</h3>
                  <p>Capture the book's central argument in one clear paragraph and explain why it still matters today.</p>
                </div>
                <div>
                  <h3 className="font-cinzel text-lg text-foreground mb-2">Key Ideas</h3>
                  <p>List 5 to 10 core principles with one sentence each on practical application.</p>
                </div>
                <div>
                  <h3 className="font-cinzel text-lg text-foreground mb-2">Exercises</h3>
                  <p>Define three actions the reader can complete this week to apply the material directly.</p>
                </div>
                <div>
                  <h3 className="font-cinzel text-lg text-foreground mb-2">Lecture</h3>
                  <p>Link one lecture or breakdown that helps readers reinforce understanding in audio/video format.</p>
                </div>
                <div>
                  <h3 className="font-cinzel text-lg text-foreground mb-2">Affiliate</h3>
                  <p>Include the primary purchase link as a convenience for readers who want the original text.</p>
                </div>
              </div>
            </section>
          )}

          <section className="border border-border bg-card p-6 md:p-8">
            <h3 className="font-cinzel text-xl text-foreground mb-3">Reflection Prompts</h3>
            <ul className="space-y-2 font-cormorant text-muted-foreground">
              {content.prompts.map((prompt) => (
                <li key={prompt}>- {prompt}</li>
              ))}
            </ul>
            <p className="font-cormorant text-muted-foreground mt-4">{content.close}</p>
          </section>

          <section className="border border-border bg-card p-6">
            <h3 className="font-cinzel text-xl text-foreground mb-4">Keep Exploring This Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {related.map((item) => (
                <Link key={item.slug} to={item.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="font-cormorant text-foreground">{item.title}</p>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={sectionData.href} className="px-4 py-2 border border-primary/40 text-primary font-cinzel text-xs tracking-wider">
                Back to {sectionData.title}
              </Link>
              <Link to={`/${content.needLabel.toLowerCase().replace(/\s+/g, '-')}`} className="px-4 py-2 border border-primary/40 text-primary font-cinzel text-xs tracking-wider">
                Open {content.needLabel}
              </Link>
              <Link to="/search" className="px-4 py-2 border border-primary/40 text-primary font-cinzel text-xs tracking-wider">
                Search Library
              </Link>
            </div>
          </section>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
