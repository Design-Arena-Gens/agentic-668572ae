"use client";

import { useMemo, useState } from "react";

type TrendSignal = {
  id: string;
  label: string;
  description: string;
};

type GeneratedPlan = {
  idea: string;
  hook: string;
  trendSummary: string[];
  visualPlan: string[];
  transitions: string[];
  onScreenText: string[];
  audio: string;
  script: string[];
  caption: string;
  callToAction: string;
  hashtags: string[];
  videoFormat: string;
  recommendedTitle: string;
  scheduling: string;
  automation: string;
};

const TREND_SIGNALS: TrendSignal[] = [
  {
    id: "unexpected-transition",
    label: "Transizione Inaspettata",
    description: "Cut rapido su beat drop con artefatto visivo sorprendente."
  },
  {
    id: "capcut-template",
    label: "Template CapCut",
    description:
      "Template remix virale con testo dinamico e beat drop (filtro 'Velocity')."
  },
  {
    id: "greenscreen-reaction",
    label: "Green Screen Reaction",
    description:
      "Reazione con screenshot/voiceover su aggiornamento trend o news pop."
  },
  {
    id: "dual-storyline",
    label: "Dual Storyline",
    description:
      "Split-screen con due azioni: storytelling rapido + contesto testuale."
  },
  {
    id: "comment-reply",
    label: "Risposta a Commento",
    description: "Screenshot commento e reply con testo on-screen e pointing."
  },
  {
    id: "micro-tutorial",
    label: "Micro Tutorial (3 step)",
    description:
      "3 bullet veloci con hook forte e CTA finale, supportato da testo bold."
  }
];

const HOOK_TEMPLATES = [
  "Se non stai usando {trend}, stai perdendo il boost del momento!",
  "Trend alert: {trend} + {niche} = video da salvare SUBITO.",
  "Scopri la combo lampo che sta esplodendo nel feed {niche}.",
  "Questo hack da 10 secondi sta facendo impazzire l'algoritmo {niche}.",
  "Hai 5 secondi? Guarda come trasformiamo {audience} in super fan."
];

const AUDIO_RECOMMENDATIONS = [
  "Audio trending: 'Addicted - ZEDD (sped up clean cut)' — ritmo 142 BPM.",
  "Utilizza 'CapCut Viral Beat - 0:10 intro + drop' per sincronizzare transizioni.",
  "Scegli 'TikTok Viral Kaiju Mashup' (mix synth + clap) per mantenere high energy.",
  "Trending sound 'POV Velocity Reverb' — ottimo per transizioni con testo bold.",
  "Usa 'Dance Bounce Loop' con beat marcato a 0:03 per accentuare il cambio scena."
];

const FORMATS = [
  "9:16 full frame, 1080x1920, 60fps, 10s max",
  "9:16 4K export 60fps, sicurezza per repurpose",
  "9:16 1080x1920, 25fps, bitrate > 20Mbps"
];

const SCHEDULING = [
  "Pubblica tra le 18:30 e le 20:00 (fascia alta interazione serale).",
  "Scheduling ideale: pausa pranzo 12:15-12:45 nelle giornate feriali.",
  "Programma alle 21:05 durante la wave 'sofa scrolling'.",
  "Lancia alle 8:30 con boost commenti iniziali per agganciare commuting audience."
];

const CTA_TEMPLATES = [
  "Scrivi nei commenti quale parte vuoi che approfondiamo!",
  "Salva il video per replicarlo subito e tagga chi deve provarlo.",
  "Dimmi nei commenti se vuoi la versione estesa in DM.",
  "Seguici per avere il format completo e template gratis.",
  "Screenshotta e condividi nelle tue stories per ricordartelo."
];

const HASHTAG_POOLS: Record<string, string[]> = {
  default: [
    "#tiktokitalia",
    "#virale",
    "#creatorsitalia",
    "#trend2024",
    "#perte",
    "#fyp"
  ],
  beauty: [
    "#beautyitalia",
    "#skincaretips",
    "#makeuptrend",
    "#glowup",
    "#tiktokbeauty"
  ],
  food: [
    "#foodtokitalia",
    "#ricettalampo",
    "#cucinavelocissima",
    "#chefathome",
    "#foodtrend"
  ],
  fashion: [
    "#fashiontok",
    "#outfitideas",
    "#stylehack",
    "#closetcheck",
    "#modaitaliana"
  ],
  travel: [
    "#italytravel",
    "#weekendescape",
    "#viaggiare",
    "#travelhack",
    "#hiddenplaces"
  ],
  tech: [
    "#techtok",
    "#aihack",
    "#productivitytips",
    "#startupitalia",
    "#creatorstack"
  ],
  fitness: [
    "#homeworkout",
    "#fitspoitalia",
    "#fitnesshack",
    "#gymtok",
    "#benessere"
  ]
};

const TITLES = [
  "Template pronto per video virale da 10s",
  "Hook + Script TikTok per cavalcare il trend",
  "Idea TikTok lampo per crescere ora",
  "Combo perfetta: trend, script e CTA"
];

const TOPICS = [
  "tutorial lampo",
  "behind-the-scenes",
  "challenge remix",
  "storytime express",
  "reaction in green screen",
  "lista top 3"
];

const AUDIENCES = [
  "community",
  "audience",
  "fanbase",
  "nuovi follower",
  "clienti ideali",
  "super fan"
];

const TRENDS = [
  "AI glow-up",
  "POV velocity cut",
  "voiceover confession",
  "hook-in-3 parole",
  "comments-to-story",
  "loop infinito"
];

const VISUAL_BLUEPRINTS = [
  {
    label: "Scena 1",
    templates: [
      "Close-up su {focus} con testo bold in sovrimpressione.",
      "Inquadratura selfie con pointing gesture verso il testo.",
      "Green screen con screenshot trend e reaction facial expression."
    ]
  },
  {
    label: "Scena 2",
    templates: [
      "Cut al prodotto/risultato finale con zoom-in rapido.",
      "Clip del dietro le quinte con overlay bullet dinamico.",
      "Transizione capcut (spin) verso elemento sorpresa."
    ]
  },
  {
    label: "Scena 3",
    templates: [
      "Testo finale + CTA mentre mostri {focusSecondary}.",
      "Loop finale su gesto iconico + invito a commentare.",
      "Split screen prima/dopo con countdown 3-2-1."
    ]
  }
];

const TRANSITION_LIBRARY = [
  "Snap transition sul beat (0:03).",
  "Whip pan a sinistra sincronizzato con clap audio.",
  "Flash white frame per mascherare il jump cut.",
  "CapCut velocity + slow per far risaltare il reveal.",
  "Hard cut con sound effect 'whoosh' + zoom punch."
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickUnique<T>(arr: T[], count: number): T[] {
  const source = [...arr];
  const result: T[] = [];
  while (result.length < Math.min(count, source.length)) {
    const index = Math.floor(Math.random() * source.length);
    result.push(source.splice(index, 1)[0]);
  }
  return result;
}

function buildHashtags(niche: string): string[] {
  const base = HASHTAG_POOLS.default;
  const extra = HASHTAG_POOLS[niche] ?? HASHTAG_POOLS.default;
  return [...pickUnique(base, 3), ...pickUnique(extra, 3)];
}

function craftHook(niche: string): string {
  const template = randomItem(HOOK_TEMPLATES);
  const trend = randomItem(TRENDS);
  const audience = randomItem(AUDIENCES);
  return template
    .replace("{trend}", trend)
    .replace("{niche}", niche)
    .replace("{audience}", audience);
}

function craftCaption(
  brandGoal: string,
  hook: string,
  callToAction: string
): string {
  return `${hook} 🚀\n${brandGoal} in meno di 10s. ${callToAction}`;
}

function craftVisualPlan(
  focus: string,
  focusSecondary: string
): string[] {
  return VISUAL_BLUEPRINTS.map((blueprint) =>
    randomItem(blueprint.templates)
      .replace("{focus}", focus)
      .replace("{focusSecondary}", focusSecondary)
  );
}

function craftScriptLines(
  hook: string,
  focus: string,
  transformation: string
): string[] {
  return [
    `Hook: ${hook}`,
    `Mostra ${focus} e racconta il trigger che scatena attenzione.`,
    `Rivela il twist: ${transformation}.`,
    "Chiudi rilanciando la sfida e ripetendo la CTA."
  ];
}

function craftOnScreenText(focus: string, trend: string): string[] {
  return [
    `1. ${focus.toUpperCase()} x trend ${trend}`,
    "2. Setup in 3 step ⚡",
    "3. Pronto? Replica e taggaci!"
  ];
}

function craftPlan({
  brand,
  niche,
  focus,
  desiredAction,
  trendSignalIds
}: {
  brand: string;
  niche: string;
  focus: string;
  desiredAction: string;
  trendSignalIds: string[];
}): GeneratedPlan {
  const signals = TREND_SIGNALS.filter((signal) =>
    trendSignalIds.includes(signal.id)
  );

  const hook = craftHook(niche || "creator");
  const trend = randomItem(TRENDS);
  const format = randomItem(TOPICS);
  const idea = `${brand || "Creator"} cavalca ${trend} in formato ${format} per mostrare ${focus} in modo ultra rapido e sorprendente.`;
  const visualPlan = craftVisualPlan(focus, desiredAction);
  const trendDescriptions = signals.length
    ? signals.map((signal) => `${signal.label}: ${signal.description}`)
    : ["Trend stack automatico selezionato dall'agente."];
  const onScreenText = craftOnScreenText(focus, trend);
  const transitions = pickUnique(TRANSITION_LIBRARY, 2);

  const audio = randomItem(AUDIO_RECOMMENDATIONS);
  const script = craftScriptLines(hook, focus, desiredAction);
  const callToAction = randomItem(CTA_TEMPLATES);
  const caption = craftCaption(desiredAction, hook, callToAction);
  const hashtags = buildHashtags(niche || "default");
  const videoFormat = randomItem(FORMATS);
  const recommendedTitle = randomItem(TITLES);
  const scheduling = randomItem(SCHEDULING);
  const automation =
    "Pronto per auto-pubblicazione: esporta, carica su TikTok Scheduler, inserisci caption e programma secondo orario suggerito.";

  return {
    idea,
    hook,
    trendSummary: trendDescriptions,
    visualPlan,
    transitions,
    onScreenText,
    audio,
    script,
    caption,
    callToAction,
    hashtags,
    videoFormat,
    recommendedTitle,
    scheduling,
    automation: `${automation} ${signals
      .map((signal) => signal.label)
      .join(" + ") || "Trend stack universale"}.`
  };
}

type FormState = {
  brand: string;
  niche: string;
  focus: string;
  desiredAction: string;
  trendSignalIds: string[];
};

const INITIAL_STATE: FormState = {
  brand: "",
  niche: "",
  focus: "",
  desiredAction: "",
  trendSignalIds: ["unexpected-transition", "micro-tutorial"]
};

export function IdeaGenerator() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedSignals = useMemo(
    () =>
      TREND_SIGNALS.filter((signal) =>
        form.trendSignalIds.includes(signal.id)
      ),
    [form.trendSignalIds]
  );

  const canGenerate =
    Boolean(form.focus.trim()) && Boolean(form.desiredAction.trim());

  const resetForm = () => {
    setForm(INITIAL_STATE);
    setPlan(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canGenerate) {
      return;
    }
    setIsGenerating(true);
    window.setTimeout(() => {
      setPlan(
        craftPlan({
          brand: form.brand.trim() || "Creator",
          niche: form.niche.trim() || "creator",
          focus: form.focus.trim(),
          desiredAction: form.desiredAction.trim(),
          trendSignalIds: form.trendSignalIds
        })
      );
      setIsGenerating(false);
    }, 250);
  };

  const toggleTrendSignal = (id: string) => {
    setForm((prev) => {
      const alreadySelected = prev.trendSignalIds.includes(id);
      if (alreadySelected) {
        return {
          ...prev,
          trendSignalIds: prev.trendSignalIds.filter(
            (signalId) => signalId !== id
          )
        };
      }
      return {
        ...prev,
        trendSignalIds: [...prev.trendSignalIds, id]
      };
    });
  };

  return (
    <div className="container">
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "2.8rem",
          textAlign: "center"
        }}
      >
        <div className="badge">⚡ Agente creativo per TikTok virali</div>
        <h1
          className="gradient-text"
          style={{ fontSize: "2.8rem", fontWeight: 800, margin: 0 }}
        >
          Viralizza il tuo prossimo TikTok da 10 secondi
        </h1>
        <p
          style={{
            maxWidth: "640px",
            margin: 0,
            color: "rgba(232,233,255,0.78)",
            lineHeight: 1.6
          }}
        >
          Inserisci l&apos;angolo creativo e l&apos;obiettivo. L&apos;agente
          genera idea, script, blueprint visivo, caption, hashtag e piano di
          pubblicazione pronti per l&apos;upload su TikTok.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          <button
            type="button"
            className="button-secondary"
            onClick={resetForm}
          >
            Reset
          </button>
          <button
            type="button"
            className="button-primary"
            onClick={() =>
              setForm({
                brand: "GlowLab Milano",
                niche: "beauty",
                focus: "siero viso effetto glass skin",
                desiredAction: "Far salvare il video e iscriversi alla waitlist",
                trendSignalIds: [
                  "capcut-template",
                  "micro-tutorial",
                  "comment-reply"
                ]
              })
            }
          >
            Carica esempio
          </button>
        </div>
      </header>

      <section className="card" style={{ padding: "2.2rem" }}>
        <form className="grid grid-2" onSubmit={handleSubmit}>
          <div className="grid" style={{ gap: "1.4rem" }}>
            <div className="input-group">
              <label htmlFor="brand">Brand o creator (opzionale)</label>
              <input
                id="brand"
                name="brand"
                className="input"
                placeholder="Es. GlowLab Milano"
                value={form.brand}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    brand: event.target.value
                  }))
                }
              />
            </div>

            <div className="input-group">
              <label htmlFor="niche">Niche / settore</label>
              <select
                id="niche"
                name="niche"
                className="select"
                value={form.niche}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    niche: event.target.value
                  }))
                }
              >
                <option value="">Seleziona la niche</option>
                <option value="beauty">Beauty & skincare</option>
                <option value="food">Food & recipe</option>
                <option value="fashion">Fashion & styling</option>
                <option value="travel">Travel & experience</option>
                <option value="tech">Tech & digital</option>
                <option value="fitness">Fitness & wellness</option>
                <option value="default">Altro / generico</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="focus">Cosa mostri nel video (focus visivo)</label>
              <textarea
                id="focus"
                name="focus"
                className="textarea"
                placeholder="Es. Applicazione del siero con luce LED mentre compare l'effetto glow."
                value={form.focus}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    focus: event.target.value
                  }))
                }
              />
            </div>

            <div className="input-group">
              <label htmlFor="desiredAction">
                Obiettivo o azione desiderata
              </label>
              <textarea
                id="desiredAction"
                name="desiredAction"
                className="textarea"
                placeholder="Es. Spingere gli utenti a salvare il format e unirsi alla waitlist."
                value={form.desiredAction}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    desiredAction: event.target.value
                  }))
                }
              />
            </div>
          </div>

          <div
            className="glass-border"
            style={{
              borderRadius: "18px",
              padding: "1.6rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.3rem",
              background: "rgba(16,16,25,0.65)"
            }}
          >
            <div>
              <div className="section-title">
                <h2 style={{ margin: 0, fontSize: "1.15rem" }}>
                  Trend signal stack
                </h2>
                <span style={{ color: "rgba(255,255,255,0.42)", fontSize: 12 }}>
                  Seleziona 2-3
                </span>
              </div>
              <div className="grid" style={{ gap: "0.75rem" }}>
                {TREND_SIGNALS.map((signal) => {
                  const selected = form.trendSignalIds.includes(signal.id);
                  return (
                    <button
                      type="button"
                      key={signal.id}
                      className={selected ? "button-primary" : "button-secondary"}
                      style={{
                        width: "100%",
                        justifyContent: "flex-start",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "0.35rem",
                        padding: "0.75rem 1rem",
                        fontSize: "0.9rem",
                        lineHeight: 1.3
                      }}
                      onClick={() => toggleTrendSignal(signal.id)}
                    >
                      <strong>{signal.label}</strong>
                      <span
                        style={{
                          color: selected
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.65)",
                          fontWeight: 400
                        }}
                      >
                        {signal.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="glass-border"
              style={{
                padding: "1rem",
                borderRadius: "14px",
                background: "rgba(10,10,16,0.9)",
                color: "rgba(255,255,255,0.78)",
                fontSize: "0.9rem",
                lineHeight: 1.6
              }}
            >
              <strong style={{ fontSize: "0.95rem" }}>
                Stack selezionato:
              </strong>
              <ul style={{ margin: "0.6rem 0 0", paddingLeft: "1.1rem" }}>
                {selectedSignals.map((signal) => (
                  <li key={signal.id}>{signal.label}</li>
                ))}
              </ul>
              {selectedSignals.length === 0 && (
                <p style={{ marginTop: "0.6rem" }}>
                  Nessun trend attivo: l&apos;agente applicherà un mix base.
                </p>
              )}
            </div>

            <div
              style={{
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem"
              }}
            >
              <button
                type="submit"
                className="button-primary"
                disabled={!canGenerate || isGenerating}
                style={
                  !canGenerate || isGenerating
                    ? { opacity: 0.6, cursor: "not-allowed" }
                    : undefined
                }
              >
                {isGenerating ? "Generazione..." : "Genera blueprint virale"}
              </button>
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.48)",
                  textAlign: "center"
                }}
              >
                Include idea, script, testi on-screen, caption, hashtag e piano
                pubblicazione.
              </span>
            </div>
          </div>
        </form>
      </section>

      {plan && (
        <section
          style={{
            marginTop: "3rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}
        >
          <div className="output-card">
            <div className="section-title">
              <h2 style={{ margin: 0, fontSize: "1.25rem" }}>
                Blueprint creativo completo
              </h2>
              <span className="chip">Idea & storytelling</span>
            </div>
            <div className="output-body">
              <strong>Idea centrale:</strong> {plan.idea}
            </div>
            <div className="output-body">
              <strong>Hook:</strong> {plan.hook}
            </div>
            <div>
              <h3 style={{ margin: "1.1rem 0 0.5rem", fontSize: "1rem" }}>
                Stack trend applicato
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                {plan.trendSummary.map((item, index) => (
                  <li key={index}>{item.replace("• ", "")}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ margin: "1.1rem 0 0.5rem", fontSize: "1rem" }}>
                Piano visivo scena-per-scena
              </h3>
              <ol style={{ margin: 0, paddingLeft: "1.3rem" }}>
                {plan.visualPlan.map((step, index) => (
                  <li key={index} style={{ marginBottom: "0.6rem" }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 style={{ margin: "1.1rem 0 0.5rem", fontSize: "1rem" }}>
                Transizioni consigliate
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                {plan.transitions.map((transition, index) => (
                  <li key={index}>{transition}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ margin: "1.1rem 0 0.5rem", fontSize: "1rem" }}>
                Testi on-screen
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                {plan.onScreenText.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
            <div className="output-body">
              <strong>Script parlato:</strong>
              <ul style={{ margin: "0.6rem 0 0", paddingLeft: "1.2rem" }}>
                {plan.script.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="output-body">
              <strong>Audio consigliato:</strong> {plan.audio}
            </div>
            <hr className="divider" />
            <div className="section-title">
              <h2 style={{ margin: 0, fontSize: "1.15rem" }}>
                Copy & pubblicazione
              </h2>
              <span className="chip">Caption & CTA</span>
            </div>
            <div className="output-body">
              <strong>Caption:</strong>
              <br />
              {plan.caption}
            </div>
            <div className="output-body">
              <strong>Call to action:</strong> {plan.callToAction}
            </div>
            <div>
              <strong style={{ fontSize: "0.95rem" }}>Hashtag:</strong>
              <div className="pill-stack" style={{ marginTop: "0.6rem" }}>
                {plan.hashtags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <hr className="divider" />
            <div className="section-title">
              <h2 style={{ margin: 0, fontSize: "1.15rem" }}>
                Pronto per la pubblicazione
              </h2>
              <span className="chip">Distribuzione</span>
            </div>
            <div className="output-body">
              <strong>Formato video:</strong> {plan.videoFormat}
            </div>
            <div className="output-body">
              <strong>Titolo per asset manager:</strong> {plan.recommendedTitle}
            </div>
            <div className="output-body">
              <strong>Timing:</strong> {plan.scheduling}
            </div>
            <div className="output-body">
              <strong>Automazione pubblicazione:</strong> {plan.automation}
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        Agente aggiornato sui trend TikTok: monitora CapCut templates, audio
        emergenti e dinamiche di comment triggering.
      </footer>
    </div>
  );
}
