import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Seed = {
  code: string;
  title: string;
  track: 'fullstack' | 'aiml' | 'mern';
  status: 'shipped' | 'in-progress' | 'planned';
  summary: string;
  stack: string[];
  month?: number;
  featured?: boolean;
};

const GH = 'https://github.com/jinx71';

const fullstack: Seed[] = [
  { code: 'FS-01', title: 'Personal Developer Portfolio', track: 'fullstack', status: 'shipped', month: 1, summary: 'This site — a colour-coded build log and blog with a custom CMS behind it.', stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vercel'] },
  { code: 'FS-02', title: 'Full-Stack Task Manager', track: 'fullstack', status: 'shipped', month: 1, summary: 'CRUD done properly: JWT auth, hashed passwords, protected routes and a relational schema.', stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT'] },
  { code: 'FS-03', title: 'Weather & Air Quality Dashboard', track: 'fullstack', status: 'shipped', month: 2, summary: 'Live OpenWeatherMap and IQAir feeds rendered through Recharts with resilient async handling.', stack: ['React', 'REST APIs', 'Recharts'] },
  { code: 'FS-04', title: 'GMP Equipment Maintenance Logger', track: 'fullstack', status: 'shipped', month: 2, featured: true, summary: 'A pharma-domain app: maintenance activities, calibration due dates and compliance status, modelled the way a plant runs.', stack: ['React', 'Node.js', 'MongoDB', 'Mongoose'] },
  { code: 'FS-05', title: 'Documented REST API', track: 'fullstack', status: 'shipped', month: 3, summary: 'A pharmaceutical asset-tracking API with full Swagger/OpenAPI documentation.', stack: ['Node.js', 'Express', 'Swagger / OpenAPI', 'TypeScript'] },
  { code: 'FS-06', title: 'Auth System with RBAC', track: 'fullstack', status: 'shipped', month: 3, summary: 'Google OAuth2 plus JWT with admin / user / viewer roles and route-level permission gating.', stack: ['React', 'Node.js', 'Google OAuth2', 'JWT', 'RBAC'] },
  { code: 'FS-07', title: 'AI Document Summariser', track: 'fullstack', status: 'shipped', month: 4, summary: 'Upload an SOP or protocol, get a structured summary with action items — PDF parsing and chunked prompts.', stack: ['React', 'FastAPI', 'Anthropic API', 'PyMuPDF'] },
  { code: 'FS-08', title: 'XAI Visualisation Dashboard', track: 'fullstack', status: 'in-progress', month: 4, featured: true, summary: 'My MSc thesis as a product: a CNN ensemble classifying cervical cell images with GradCAM, SHAP and LLM explanations.', stack: ['React', 'FastAPI', 'EfficientNetV2L', 'GradCAM', 'SHAP'] },
  { code: 'FS-09', title: 'Real-Time Notification App', track: 'fullstack', status: 'shipped', month: 5, summary: 'WebSockets and Redis pub/sub for multi-room, event-driven delivery beyond request/response.', stack: ['React', 'Node.js', 'Socket.io', 'Redis'] },
  { code: 'FS-10', title: 'Dockerised App + CI/CD Pipeline', track: 'fullstack', status: 'shipped', month: 5, summary: 'A Calibration Tracker API containerised with Docker Compose and shipped to AWS EC2 via GitHub Actions.', stack: ['Docker', 'Docker Compose', 'GitHub Actions', 'AWS EC2', 'GHCR'] },
  { code: 'FS-11', title: 'Multi-Tenant SaaS Dashboard', track: 'fullstack', status: 'shipped', month: 6, summary: 'Workspace isolation, Stripe subscriptions and webhook billing — real-world product architecture.', stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe'] },
  { code: 'FS-12', title: 'AI Pharma Compliance Audit Tool', track: 'fullstack', status: 'shipped', month: 6, featured: true, summary: 'The capstone: upload audit documents, AI flags non-conformances against GMP standards, dashboard scores risk, findings export as PDF.', stack: ['React', 'FastAPI', 'LLM APIs', 'PostgreSQL', 'Docker'] },
];

const aiml: Seed[] = [
  { code: 'AI-01', title: 'Regulatory Document Q&A (RAG)', track: 'aiml', status: 'shipped', summary: 'Ingest SOPs and protocols, chunk + embed into a vector DB, answer questions with inline citations.', stack: ['FastAPI', 'ChromaDB', 'Anthropic', 'React'] },
  { code: 'AI-02', title: 'Multi-Agent Workflow Assistant', track: 'aiml', status: 'shipped', summary: 'A four-agent reflection loop (researcher → summariser → critic) with tool-calling and shared state.', stack: ['Python', 'LangGraph', 'FastAPI'] },
  { code: 'AI-03', title: 'CytoLens — Explainable Cytology Classifier', track: 'aiml', status: 'shipped', featured: true, summary: 'The thesis model deployed: cervical cell classification with Grad-CAM, occlusion maps and a clinical light-table UI.', stack: ['TensorFlow', 'FastAPI', 'React', 'Grad-CAM'] },
  { code: 'AI-04', title: 'RegSearch — Semantic Search Engine', track: 'aiml', status: 'shipped', summary: 'BM25, dense, hybrid and rerank modes benchmarked against each other over a regulatory corpus.', stack: ['Qdrant', 'fastembed (ONNX)', 'FastAPI'] },
  { code: 'AI-05', title: 'MLOps Model Monitor', track: 'aiml', status: 'shipped', summary: 'PSI + KS data-drift detection with a live telemetry dashboard — PSI as the primary signal to avoid false positives.', stack: ['FastAPI', 'scikit-learn', 'React', 'Docker'] },
  { code: 'AI-06', title: 'QueryPilot — NL-to-SQL Agent', track: 'aiml', status: 'shipped', summary: 'Natural-language questions against PostgreSQL with a three-layer SQL safety net and a self-correcting loop.', stack: ['LangGraph', 'PostgreSQL', 'FastAPI'] },
  { code: 'AI-07', title: 'LLM Assay — Evaluation Harness', track: 'aiml', status: 'shipped', summary: 'Compare five provider backends across six scorers for accuracy, latency and cost from a single CLI.', stack: ['Python', 'Multi-LLM', 'CLI'] },
  { code: 'AI-08', title: 'Sentinel — Anomaly Detection', track: 'aiml', status: 'shipped', featured: true, summary: 'Five unsupervised detectors plus DBSCAN clustering and a UMAP latent-space map for equipment sensor data.', stack: ['scikit-learn', 'UMAP', 'FastAPI'] },
  { code: 'AI-09', title: 'Production RAG + Eval + Guardrails', track: 'aiml', status: 'shipped', summary: 'Hybrid retrieval (RRF), two-layer hallucination guardrails and a RAGAS evaluation harness — demo to product.', stack: ['LangChain', 'RAGAS', 'Redis', 'FastAPI'] },
  { code: 'AI-10', title: 'Sentinel Cloud Microservice', track: 'aiml', status: 'shipped', summary: 'An IsolationForest service with Kubernetes manifests, Prometheus metrics and a GHCR CI/CD pipeline.', stack: ['FastAPI', 'Kubernetes', 'Prometheus', 'GHCR'] },
];

// MERN track is in active development — seeded as editable placeholders.
const mern: Seed[] = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    code: `MERN-${n}`,
    title: `MERN Web App ${n}`,
    track: 'mern' as const,
    status: 'in-progress' as const,
    summary: 'In active development. Edit this entry in the CMS to add the real title, summary, stack, live URL and repository.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
  };
});

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD ?? 'change-me-now';
  const name = process.env.ADMIN_NAME ?? 'Md. Sazed Ul Karim';

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { name },
    create: { email, name, passwordHash },
  });
  console.log(`Admin user ready: ${email}`);

  const all = [...fullstack, ...aiml, ...mern];
  for (let i = 0; i < all.length; i++) {
    const p = all[i];
    await prisma.project.upsert({
      where: { code: p.code },
      update: {},
      create: {
        code: p.code,
        title: p.title,
        track: p.track,
        status: p.status,
        summary: p.summary,
        stack: p.stack,
        month: p.month ?? null,
        repoUrl: `${GH}/${p.code.toLowerCase()}`,
        liveUrl: null,
        featured: Boolean(p.featured),
        order: i,
      },
    });
  }
  console.log(`Seeded ${all.length} projects across 3 tracks`);

  const samplePosts = [
    {
      slug: 'why-i-build-pharma-software',
      title: 'Why a pharma engineer is building software',
      excerpt: 'Eight years of GMP audits taught me the discipline good software already depends on. Here is how the two worlds connect.',
      tags: ['career', 'pharma', 'engineering'],
      accent: 'indigo',
      published: true,
      content: `## From the plant floor to the codebase\n\nIn a regulated plant, nothing ships without evidence. Every change is documented, every system validated, every failure traced to a root cause.\n\nIt turns out that is exactly how good software is built — tests as evidence, version control as the audit trail, CI/CD as the change-control gate.\n\n### What carries over\n\n- **Root-cause discipline** — debugging is a CAPA cycle.\n- **Validation mindset** — a passing test suite is a validation protocol.\n- **Documentation as a deliverable** — a README is a batch record.\n\nThis blog is where I write up what I learn as I build the portfolio.`,
    },
    {
      slug: 'rag-lessons-from-ten-projects',
      title: 'RAG lessons from building it ten different ways',
      excerpt: 'Hybrid retrieval, guardrails, and the gap between a demo and a product — notes from the AI/ML track.',
      tags: ['ai', 'rag', 'llm'],
      accent: 'teal',
      published: true,
      content: `## A demo is not a product\n\nThe first RAG project answers questions. The ninth one earns trust.\n\n### Three things that mattered most\n\n1. **Hybrid retrieval (RRF)** beats dense-only on regulatory text where exact terms carry meaning.\n2. **Guardrails** — a faithfulness check between retrieval and answer catches most hallucinations.\n3. **Evaluation** — RAGAS faithfulness and relevance scores turn "feels better" into a number.\n\nThe honest negative results were as useful as the wins.`,
    },
  ];

  for (const post of samplePosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: { ...post, publishedAt: new Date() },
    });
  }
  console.log(`Seeded ${samplePosts.length} blog posts`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
