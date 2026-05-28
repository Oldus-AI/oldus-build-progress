import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const phases = [
  {
    id: "p0",
    title: "P0 — Fix Foundations (Blocking)",
    status: "complete",
    completedDate: "2026-02-18",
    goldenSnapshot: "openclaw.json.golden-p0 ✅",
    items: [
      {
        id: "p0.0",
        title: "Fix sandbox→gateway auth",
        status: "done",
        description:
          "Root cause: user-level systemd service with stale token winning port race. Removed user-level service, verified system-level owns port 18789, API key rotated.",
        completedDate: "2026-02-18",
      },
      {
        id: "p0.1",
        title: "Config validation, service hardening & onboard wrapper",
        status: "done",
        description:
          "oc-config-validate, oc-onboard-safe wrapper, pre-commit hooks blocking secret patterns, user-level service detection, token single-source-of-truth (EnvironmentFile), rate limiting on gateway auth.",
        completedDate: "2026-02-18",
        subItems: [
          { text: "oc-config-validate script", done: true },
          { text: "oc-onboard-safe wrapper", done: true },
          { text: "Pre-commit hooks (secret patterns)", done: true },
          { text: "User-level systemd service detection", done: true },
          { text: "Token single-source-of-truth (.env only)", done: true },
          { text: "Gateway auth rate limiting", done: true },
          { text: "oc-add-secret credential helper", done: true },
          { text: "CREDENTIAL-RUNBOOK.md", done: true },
        ],
      },
      {
        id: "p0.2",
        title: "Pin versions and surface them in logs",
        status: "done",
        description:
          "Morning briefing cron logs OpenClaw version, Node version, config checksum, workspace commit SHA. .env.example committed.",
        completedDate: "2026-02-18",
      },
      {
        id: "p0.3",
        title: "Persistence, snapshots & restore",
        status: "done",
        description:
          "Persistence model documented. snapshot-state and restore-state scripts built. Never-wipe list established. First backup taken.",
        completedDate: "2026-02-18",
        subItems: [
          { text: "SYSTEM-STATE.md with persistence model", done: true },
          { text: "snapshot-state script (timestamped, keeps last 10)", done: true },
          { text: "restore-state script", done: true },
          { text: "Never-wipe list documented", done: true },
          { text: "First backup taken", done: true },
        ],
      },
    ],
  },
  {
    id: "p1",
    title: "P1 — Operational Quality",
    status: "complete",
    goldenSnapshot: "openclaw.json.golden.2026-02-20 ✅",
    items: [
      {
        id: "p1.0",
        title: "Restore sandbox mode: all with working write access",
        status: "done",
        description:
          "sandbox.mode set to 'all', workspaceAccess 'rw', capability-stripped container required chmod 777 on workspace dir. Write test confirmed working.",
        completedDate: "2026-02-18",
      },
      {
        id: "p1.1",
        title: "Morning briefing reliability",
        status: "done",
        description:
          "Cron created (7am weekdays, Europe/London). Model string fixed. Running.",
        completedDate: "2026-02-19",
        subItems: [
          { text: "Cron job created", done: true },
          { text: "Model string fixed (was wrong identifier)", done: true },
          { text: "Delivery confirmation check", done: true },
          { text: "Retry on failure + alternate channel", done: true },
          { text: "5 consecutive successful deliveries", done: true },
        ],
      },
      {
        id: "p1.2",
        title: "Cost guardrails and operational policy",
        status: "done",
        description:
          "Comprehensive operational guardrails document deployed: confirmation gates for destructive actions, pre-task cost estimation, data de-duplication, session hygiene, loop prevention, error classification.",
        completedDate: "2026-02-22",
        subItems: [
          { text: "Confirmation gates for money-spending/external actions", done: true },
          { text: "Pre-task token cost estimation with budget ceilings", done: true },
          { text: "Data de-duplication protocols", done: true },
          { text: "Session hygiene rules", done: true },
          { text: "Loop prevention with hard retry limits", done: true },
          { text: "Error classification policy", done: true },
          { text: "Guardrails document uploaded to workspace", done: true },
          { text: "Oldus instructed to internalise into memory", done: true },
        ],
      },
      {
        id: "p1.3",
        title: "Trace IDs and structured logging with redaction",
        status: "partial",
        description:
          "redactSensitive: 'tools' is enabled. Trace IDs and milestone logging not yet implemented. Low priority — hasn't blocked anything.",
        subItems: [
          { text: "redactSensitive: 'tools' configured", done: true },
          { text: "Trace ID per inbound event", done: false },
          { text: "Milestone logging with trace ID", done: false },
          { text: "Redaction covers exec output + stack traces", done: false },
        ],
      },
      {
        id: "p1.4",
        title: "GitHub credential security",
        status: "done",
        description:
          "PAT stored in .env via GITHUB_TOKEN. Injected into sandbox via docker.env interpolation. Full read/write from sandbox confirmed.",
        completedDate: "2026-02-19",
      },
      {
        id: "p1.5",
        title: "Retry queue for rate-limited sub-agents",
        status: "done",
        description:
          "v2 spec with 6 guardrails (flock locking, atomic writes, stale recovery, error classification, 14-day retention). Cron runs every 30 mins on Sonnet.",
        completedDate: "2026-02-19",
        subItems: [
          { text: "v2 spec incorporating Oldus's 6 risk mitigations", done: true },
          { text: "Flock-style locking + atomic .tmp-then-rename", done: true },
          { text: "Error classification (retriable vs fatal)", done: true },
          { text: "60-min stale task recovery", done: true },
          { text: "14-day retention + .jsonl archival", done: true },
          { text: "Cron installed (30-min cycle, Sonnet)", done: true },
        ],
      },
      {
        id: "p1.6",
        title: "Slack threading fix",
        status: "done",
        description:
          "replyToMode: 'off' in Slack channel config. Context continuity over channel tidiness.",
        completedDate: "2026-02-18",
      },
      {
        id: "p1.7",
        title: "Automated backups",
        status: "done",
        description:
          "Two-tier automated backup system. Daily compressed tar at 3am UTC (7-day retention). GitHub sync every 6 hours (memory + config). Both scripts tested and cron-installed.",
        completedDate: "2026-02-20",
        subItems: [
          { text: "backup-openclaw.sh — daily tar, keeps last 7", done: true },
          { text: "sync-memory-to-git.sh — 6-hour push to GitHub", done: true },
          { text: "Cron jobs installed under oldus user", done: true },
          { text: "Both scripts tested and confirmed working", done: true },
          { text: "Full workspace pushed to GitHub (Oldus-AI/oldus-config)", done: true },
        ],
      },
    ],
  },
  {
    id: "creds",
    title: "Credentials & Integrations (27 total)",
    status: "complete",
    goldenSnapshot: "27 integrations live ✅",
    items: [
      {
        id: "creds.0",
        title: "Sandbox credential interpolation",
        status: "done",
        description:
          "sandbox.docker.env supports ${VAR} from gateway .env. No broker scripts needed. 13+ app keys injected.",
        completedDate: "2026-02-20",
        subItems: [
          { text: "ElevenLabs API key", done: true },
          { text: "Moltbook API key", done: true },
          { text: "OpenAI API key", done: true },
          { text: "Missive API token", done: true },
          { text: "Prodigi sandbox key", done: true },
          { text: "Google AI / Gemini key", done: true },
          { text: "GitHub PAT (read/write/admin/create/delete)", done: true },
          { text: "Slack bot token", done: true },
          { text: "Telegram bot token", done: true },
          { text: "Discord bot token", done: true },
          { text: "Shopify admin token", done: true },
          { text: "Shopify client ID", done: true },
          { text: "ANTHROPIC_API_KEY (Claude Code headless only)", done: true },
        ],
      },
      {
        id: "creds.1",
        title: "Google OAuth — GA4, Gmail, Search Console, Ads, Sheets, Drive",
        status: "done",
        description:
          "Full Google suite. 13 GA4 properties. Gmail read/send/modify. Search Console (webmasters.readonly). Google Ads via oldus-ads GCP project. Sheets/Drive read/write.",
        completedDate: "2026-02-20",
      },
      {
        id: "creds.2",
        title: "Shopify — client credentials flow",
        status: "done",
        description:
          "Migrated from static tokens to Shopify client credentials grant with 24-hour token rotation. Headless channel for Storefront API.",
        completedDate: "2026-02-22",
      },
      {
        id: "creds.3",
        title: "Missive webhook integration",
        status: "done",
        description:
          "Event-driven webhook via Tailscale Funnel (HTTPS). Python listener queues @mentions, on-demand cron processes and replies.",
        completedDate: "2026-02-20",
      },
      {
        id: "creds.4",
        title: "NetSuite — M2M OAuth",
        status: "done",
        description:
          "Machine-to-machine OAuth fully authenticated against NetSuite sandbox (Day 26). Client credentials flow, token rotation, REST API access confirmed.",
        completedDate: "2026-03-09",
      },
      {
        id: "creds.5",
        title: "Zendesk — 11 brands",
        status: "done",
        description:
          "Zendesk API token integrated. Access across 11 Prodigi brands.",
        completedDate: "2026-02-25",
      },
      {
        id: "creds.6",
        title: "Jira",
        status: "done",
        description:
          "Jira API authenticated. Issue read/write confirmed working.",
        completedDate: "2026-03-02",
      },
      {
        id: "creds.7",
        title: "Vercel — CardStar V2 deployment",
        status: "done",
        description:
          "CardStar V2 deployed via Foolsold Vercel account. Auto-deploy on push to main. Live at cardstar-v2.vercel.app.",
        completedDate: "2026-03-02",
      },
      {
        id: "creds.8",
        title: "Sons Google Drive — service account",
        status: "done",
        description:
          "Service account created. Per-domain subfolder structure. Credentials at /etc/sons-oauth/ as read-only bind mount. Each Son domain has its own folder.",
        completedDate: "2026-03-09",
      },
      {
        id: "creds.9",
        title: "Denylist policy locked",
        status: "done",
        description:
          "Infrastructure keys only: gateway tokens, SSH keys, session tokens. ANTHROPIC_API_KEY exception for Claude Code headless. Everything else is app-level.",
        completedDate: "2026-02-22",
      },
    ],
  },
  {
    id: "sons",
    title: "Sons of Oldus — Multi-Agent Architecture",
    status: "in-progress",
    goldenSnapshot: "Agentbus repo on GitHub ✅ · Bulletin board live ✅",
    items: [
      {
        id: "sons.0",
        title: "Architecture & model hierarchy",
        status: "done",
        description:
          "3-tier model: Oldus (Opus, orchestrator) → Son (Sonnet, domain specialist) → Sub-agent (Haiku, mechanical). Task-level routing, not agent-level downgrading. Dispatch via agentId=, never model=.",
        completedDate: "2026-02-18",
      },
      {
        id: "sons.1",
        title: "Tiered memory architecture (MEMORY-HIERARCHY.md)",
        status: "done",
        description:
          "4-tier formalised: Hot (system prompt, ~14K), Warm (active-state.md + daily notes), Cold (CAPABILITIES.md, RULES.md, IDENTITY.md), Archive. MEMORY-HIERARCHY.md deployed Day 22.",
        completedDate: "2026-03-05",
      },
      {
        id: "sons.2",
        title: "Agent specs — Marketing family (4 agents)",
        status: "done",
        description:
          "Performance Marketing (DISABLED Day 17 — 30GB syslog), Content/SEO, CRM/Lifecycle, Social/Community. Each with trust progression, guardrails, bidirectional handoffs.",
        completedDate: "2026-02-14",
      },
      {
        id: "sons.3",
        title: "Agent specs — Business operations (7 agents)",
        status: "done",
        description:
          "Biz Dev, Networks, Procurement, Customer Support, Quality/Production, Pricing/Margin, Account Health. 5 deployment waves, externally-facing first.",
        completedDate: "2026-02-14",
      },
      {
        id: "sons.4",
        title: "Agentbus host infrastructure",
        status: "done",
        description:
          "setup_host.sh executed. 12 Linux users created, directory structures with ACLs, SQLite databases initialised.",
        completedDate: "2026-02-19",
      },
      {
        id: "sons.5",
        title: "Agentbus message envelope schema",
        status: "done",
        description:
          "12 envelope fields. Router-stamped sender (no spoofing). Hop count loop prevention. Intent enums control LLM trigger. JSON Schema + 9 fixtures + CI + validation script.",
        completedDate: "2026-02-19",
      },
      {
        id: "sons.6",
        title: "Bulletin board inter-agent comms",
        status: "done",
        description:
          "Architectural decision: Agentbus polling replaced for Prime-Son comms. sessions_spawn() for Prime→Son. Bulletin board directories for Son→Prime. Five domains: CS, Marketing, Finance, Engineering, Biz Dev — each with public/ and urgent/ subdirs.",
        completedDate: "2026-03-05",
      },
      {
        id: "sons.7",
        title: "Three-agent dispatch system",
        status: "done",
        description:
          "main (Opus 4.6, judgment), sonnet-worker (Sonnet 4.5, execution/code), haiku-worker (Haiku 4.5, mechanical). Dispatch via agentId= parameter. model= silently ignored (discovered Day 15).",
        completedDate: "2026-02-27",
      },
      {
        id: "sons.8",
        title: "Marketing Performance Son — DISABLED",
        status: "done",
        description:
          "Disabled Day 17 (chmod -R loop, 30GB syslog). Has been dark for 89 days as of Day 106. No restoration planned. A new marketing-son is scoped from scratch.",
        completedDate: "2026-02-28",
      },
      {
        id: "sons.9",
        title: "UX Son (ux-son) — registered",
        status: "done",
        description:
          "Registered Day 20. Still dormant as of Day 106 — no tasks dispatched in 86 days.",
        completedDate: "2026-03-03",
      },
      {
        id: "sons.10",
        title: "CS Son — scoped for Kate",
        status: "in-progress",
        description:
          "Full scoping document delivered to Kate (April 2026). Trust progression through 3 phases, query categorisation, escalation paths, success metrics. Awaiting Kate's commitment to specific data sources and pilot window.",
      },
      {
        id: "sons.11",
        title: "Finance Son — scoped for Marlini/Tom",
        status: "in-progress",
        description:
          "Full scoping document delivered to Marlini and Tom Gallard (April 2026). NetSuite M2M OAuth already authenticated — integration unblocked. Awaiting decision on sandbox-to-production gate.",
      },
      {
        id: "sons.12",
        title: "Son deployment playbook",
        status: "done",
        description:
          "deploy_son.sh with all 15 postmortem fixes. SON-DEPLOYMENT-POSTMORTEM.md. HARDENED-DEFAULTS.md updated. Each Son needs own token pair, own systemd service, own gateway port.",
        completedDate: "2026-02-23",
      },
    ],
  },
  {
    id: "p2",
    title: "P2 — Resilience & Testing",
    status: "in-progress",
    goldenSnapshot: "golden-full-2026-02-22-son-live.tar.gz ✅",
    items: [
      {
        id: "p2.0",
        title: "Model fallback and key rotation",
        status: "parked",
        description:
          "Multiple API keys, auto-rotation on 429, Opus → Sonnet degraded mode. Parked — haven't hit 429s in practice.",
      },
      {
        id: "p2.1",
        title: "Health checks (9 checks, Slack alerting)",
        status: "done",
        description:
          "health-watchdog.py with 9 checks: gateway, backup freshness, version pin, OAuth token, disk, DNS, workspace writable, recent activity. --dry-run and --json flags.",
        completedDate: "2026-02-22",
      },
      {
        id: "p2.2",
        title: "Session size watchdog + rotation crons",
        status: "done",
        description:
          "Session size watchdog every 30min (auto-rotate at 512KB). Four daily rotation crons: 00:00, 08:00, 12:00, 20:00 UTC. Deployed Day 25 after 1.6MB session caused 10-min gateway timeout.",
        completedDate: "2026-03-08",
      },
      {
        id: "p2.3",
        title: "CI-equivalent local validation",
        status: "done",
        description:
          "Makefile at workspace root. make test (config + crons + perms + git + snapshot), make reset, make status.",
        completedDate: "2026-02-23",
      },
      {
        id: "p2.4",
        title: "Disaster recovery runbook",
        status: "done",
        description:
          "8-phase runbook at docs/DISASTER-RECOVERY.md. Bare Ubuntu → running Oldus in 15-25 min. Covers system setup, golden tar restore, credentials, gateway, crons, validation, Son deployment.",
        completedDate: "2026-02-23",
      },
      {
        id: "p2.5",
        title: "Hardening scripts (Wave 1-3)",
        status: "done",
        description:
          "10 infrastructure hardening scripts: config validation, automated backup, service masking, version pinning, health watchdog, cost tracker, log rotation, OAuth refresh, hardened defaults, post-restart validation.",
        completedDate: "2026-02-22",
      },
      {
        id: "p2.6",
        title: "Workspace isolation (sub-agent safety)",
        status: "done",
        description:
          "Sub-agents destroyed workspace on 22 Feb. Protected dir live at /home/oldus/.openclaw/protected/ (root-owned). Sandbox dir at /workspace/sandbox/. 5 mandatory rules enforced.",
        completedDate: "2026-02-23",
      },
      {
        id: "p2.7",
        title: "OpenClaw upgrades",
        status: "done",
        description:
          "Three upgrades survived: 2026.2.26, 2026.3.8, 2026.3.23-2, 2026.4.15. Recovery playbook now reliable. Pattern: every upgrade is a config drift event — audit immediately after.",
        completedDate: "2026-03-01",
        subItems: [
          { text: "2026.2.26 — clean", done: true },
          { text: "2026.3.8 — clean (compaction + session-reset fixes)", done: true },
          { text: "2026.3.23-2 — broke system service, recovered (playbook used)", done: true },
          { text: "2026.4.15 — silently disabled 2 OpenClaw crons, Opus 4.7 tier not wired in ops bridge", done: true },
          { text: "Post-upgrade audit checklist created", done: true },
        ],
      },
      {
        id: "p2.8",
        title: "System prompt slimming",
        status: "done",
        description:
          "Day 25: system prompt slimmed from ~46K to ~14K tokens (70% reduction). RULES.md trimmed from 402 to 64 lines. Context set to 30K tokens, 15K reserve floor.",
        completedDate: "2026-03-08",
      },
      {
        id: "p2.9",
        title: "CI & Branch Protection",
        status: "done",
        description:
          "CI workflows live on all code repos. Branch protection ruleset created (quality-gate status check required).",
        subItems: [
          { text: "readymades-framing-engine: CI (test) — green ✅", done: true },
          { text: "cardstar-v2: CI (lint/tsc) — green ✅", done: true },
          { text: "agentbus: CI (validate) — live ✅", done: true },
          { text: "Repo rulesets (quality-gate required status check)", done: true },
          { text: "Verification test: failing PR blocked", done: false },
        ],
      },
      {
        id: "p2.10",
        title: "Autonomous PR pipeline",
        status: "in-progress",
        description:
          "GitHub Action (auto-merge.yml) created Day 26. Copilot review → 3-state decision logic → auto-merge clean PRs or needs-fixes label. haiku-worker cron for fix cycles. Not yet fully deployed end-to-end.",
        subItems: [
          { text: "quality-gate GitHub Action built", done: true },
          { text: "auto-merge.yml for clean PRs", done: true },
          { text: "needs-fixes label for failing PRs", done: true },
          { text: "haiku-worker cron for fix cycles", done: true },
          { text: "End-to-end loop tested in production", done: false },
        ],
      },
      {
        id: "p2.11",
        title: "GOVERNANCE.md deployed",
        status: "done",
        description:
          "CONFIG > SCRIPT > RULE enforcement hierarchy. Skill approval requiring James's sign-off. Spend caps formalised. Budget pools: Prime $75/day, Sons $25 each/$50 pool. Deployed Day 23.",
        completedDate: "2026-03-06",
      },
    ],
  },
  {
    id: "p3",
    title: "P3 — Capabilities & Projects",
    status: "in-progress",
    goldenSnapshot: "Pending",
    items: [
      {
        id: "p3.0",
        title: "Claude Code integration",
        status: "done",
        description:
          "Claude Code 2.1.49 + Node.js v22 baked into Docker sandbox. ANTHROPIC_API_KEY injected (policy exception). Direct claude -p calls working. Brainstorming skill override at workspace skills/brainstorming/SKILL.md.",
        completedDate: "2026-02-23",
      },
      {
        id: "p3.1",
        title: "Multi-model code review stack",
        status: "done",
        description:
          "GPT (OpenAI) for large-context code analysis via direct API calls. Bypasses Sonnet rate limits. 3 project reviews completed (CardStar, Framing Engine, Operation Oldus).",
        completedDate: "2026-02-19",
      },
      {
        id: "p3.2",
        title: "Sonos integration",
        status: "done",
        description:
          "Hardened HTTP bridge service on host. Whitelisted commands + speaker IPs only. Accessible from sandbox via Docker bridge. Spotify SMAPI auth completed. 13 speakers controllable.",
        completedDate: "2026-02-22",
      },
      {
        id: "p3.3",
        title: "Ops Bridge — self-service host control",
        status: "done",
        description:
          "Running at 172.17.0.1:8100. Model switching, gateway restart, status, repair endpoints. Seven /pp/* printing-press endpoints: shopify, semrush, prodigi, snowflake, jira, jira-marketing, ortto. Credential architecture: Shopify/Semrush/Prodigi exclusively in /etc/oldus-ops-bridge.env. All 7 endpoints verified with live requests (May 2026).",
        completedDate: "2026-03-02",
      },
      {
        id: "p3.4",
        title: "Budget System",
        status: "done",
        description:
          "SQLite ledger, session JSONL parser (reads real cost.total from agent session files), CLI tool (oldus-budget), 3 crons. Budget pools: Prime $75/day, Sons $50/day pool. 80%/100% alerting. Total spend to Date: ~$2,416.93.",
        completedDate: "2026-03-06",
      },
      {
        id: "p3.5",
        title: "Command Hub v3.1",
        status: "done",
        description:
          "Live at port 8080/8443 (Tailscale Funnel). Shows runs, costs, sessions, channels. Chart.js stacked cost chart by model (purple=Opus, amber=Sonnet, green=Haiku). 5-min refresh. Lobster favicon. v3.1 shipped Day 24.",
        completedDate: "2026-03-07",
      },
      {
        id: "p3.6",
        title: "Voice Interface — prototype",
        status: "stalled",
        description:
          "Prototype built Day 24. React + ElevenLabs Conversational AI SDK, animated visualizer rings. Not deployed. HeyGen available. No active work since Day 24.",
      },
      {
        id: "p3.7",
        title: "GitHub org migration",
        status: "done",
        description:
          "All repos migrated from Foolsold → Oldus-AI org (Day 23). All repos now at github.com/Oldus-AI.",
        completedDate: "2026-03-06",
      },
      {
        id: "p3.8",
        title: "Tailscale on server",
        status: "done",
        description:
          "Migrated from Mac to Hetzner server for 24/7 availability. Funnel for Missive webhooks + Command Hub. Subnet routing for home LAN (Sonos). CGNAT leak fixed.",
        completedDate: "2026-02-22",
      },
      {
        id: "p3.9",
        title: "Operation Oldus (Moltbook / T-shirt store)",
        status: "in-progress",
        description:
          "T-shirt store concept under Operation Oldus umbrella. Stripe + Prodigi fulfilment. SPEC.md exists. Not yet built.",
        subItems: [
          { text: "SPEC.md in operation-oldus repo", done: true },
          { text: "Store build (Stripe + Prodigi)", done: false },
          { text: "Deploy to Vercel", done: false },
        ],
      },
      {
        id: "p3.10",
        title: "Artist Army pipeline (magnoliabox.com)",
        status: "in-progress",
        description:
          "Automated content pipeline: 600 art pieces/month, <£30/month. Deliberately a cron pipeline, not an agent. Architecture designed Day 8. Not yet deployed.",
        subItems: [
          { text: "Architecture designed (weekly Sonnet + daily image gen)", done: true },
          { text: "Weekly Sonnet cron — trend analysis + prompt generation", done: false },
          { text: "Daily image generation via paid API", done: false },
          { text: "Cloudflare R2 storage + Shopify product creation", done: false },
        ],
      },
      {
        id: "p3.11",
        title: "Token Economics",
        status: "stalled",
        description:
          "Budget system built and deployed (Day 23). Spend total ~$2,417 at Day 25 — figure not updated since. Budget pools configured (Prime $75/day, Sons $50/day). No active tracking since Day 40. ~50% of total spend to date was avoidable waste.",
        subItems: [
          { text: "Spend spec written", done: true },
          { text: "SQLite ledger deployed", done: true },
          { text: "CLI tool (oldus-budget)", done: true },
          { text: "Waste audit — ~50% avoidable identified", done: true },
          { text: "Budget pools configured (Prime $75/day, Sons $50/day)", done: true },
          { text: "80%/100% alerting live", done: true },
        ],
      },
      {
        id: "p3.12",
        title: "Oldus In A Box — managed service",
        status: "in-progress",
        description:
          "Managed autonomous AI agent for non-technical business owners. Dedicated infrastructure per client, pre-configured Son library, trust progression model. Product spec v0.2 written.",
        subItems: [
          { text: "Product spec v0.2 (scoping draft) in repo", done: true },
          { text: "GitHub repo: Oldus-AI/oldus-in-a-box", done: true },
          { text: "Golden config template finalised", done: false },
          { text: "Automated deployment script", done: false },
          { text: "4 weeks stable internal running before first client", done: false },
        ],
      },
      {
        id: "p3.13",
        title: "MyType V2 — Custom Typography Prints",
        status: "not-started",
        description:
          "Rebuild of mytype.co — custom typography prints (foil & matte posters, framed). V1 source recovered: Next.js 14 editor + Shopify Dawn theme. Parked until CardStar V2 ships.",
        subItems: [
          { text: "V1 source downloaded and pushed to Oldus-AI/mytype-v2", done: true },
          { text: "V1 architecture understood (12 fonts, foil/matte, 5 sizes)", done: true },
          { text: "Port canvas renderer from CardStar", done: false },
          { text: "Port Shopify cart integration", done: false },
          { text: "Deploy to Vercel", done: false },
        ],
      },
    ],
  },
  {
    id: "cardstar",
    title: "CardStar V2 — Personalised Sports Cards",
    status: "complete",
    goldenSnapshot: "GitHub: Oldus-AI/cardstar-v2 · Live: cardstar-v2.vercel.app ✅",
    items: [
      {
        id: "cs.0",
        title: "Core build & templates (62 templates, 15 sports)",
        status: "done",
        description:
          "React 19 + Vite 7 + Tailwind 4. 62 templates across 15 sports categories. Canvas renderer with gradient parsing, text/image zones, flag/logo support. Build clean.",
        completedDate: "2026-02-20",
        subItems: [
          { text: "62 card templates with zone definitions", done: true },
          { text: "Canvas renderer (gradients, text, images, flags, logos)", done: true },
          { text: "Category-grouped home page with template previews", done: true },
          { text: "URL-based template routing (/cards/:category/:slug)", done: true },
          { text: "Dark theme with V1 pixel-accurate styling", done: true },
          { text: "15 sports categories", done: true },
        ],
      },
      {
        id: "cs.1",
        title: "V1 real data integration",
        status: "done",
        description:
          "S3 template thumbnails, 257 countries with flags from Firebase, teams grouped by league, 9-currency pricing.",
        completedDate: "2026-02-20",
      },
      {
        id: "cs.2",
        title: "Shopify cart integration",
        status: "done",
        description:
          "Product created with 6 size variants (A5-A0). Storefront API cart + checkout. Client credentials flow. Sticky CTA in editor.",
        completedDate: "2026-02-22",
      },
      {
        id: "cs.3",
        title: "Editor v2 — mobile preview + fullscreen lightbox",
        status: "done",
        description:
          "Full editor with mobile preview mode, fullscreen lightbox for card preview, sticky CTA. PR #16 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.4",
        title: "Player presets (16 players, 6 sports)",
        status: "done",
        description:
          "Pre-filled player data for 16 famous players across 6 sports (Messi, Ronaldo, Haaland, Hamilton and 12 others). PR #17 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.5",
        title: "Per-sport stat templates",
        status: "done",
        description:
          "Position-dependent stats customised per sport. Product detail page. PR #15 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.6",
        title: "Club logo wiring",
        status: "done",
        description:
          "Club logos wired into card editor. PR #20 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.7",
        title: "Social share with watermark",
        status: "done",
        description:
          "Social share functionality with watermark overlay. PR #19 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.8",
        title: "Live on Vercel (cardstar-v2.vercel.app)",
        status: "done",
        description:
          "First deployed Day 19 (March 2). Day 27: 6 PRs merged, full feature set live. Auto-deploy on push to main via Foolsold Vercel account.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.9",
        title: "Background removal & print rendering",
        status: "not-started",
        description:
          "rembg service running on port 8100 (done). Need to wire into editor photo upload flow. Server-side Cairo renderer for print-quality PDF output.",
        subItems: [
          { text: "rembg service live on port 8100", done: true },
          { text: "Wire rembg into editor photo upload flow", done: false },
          { text: "Server-side Cairo print renderer", done: false },
        ],
      },
      {
        id: "cs.10",
        title: "Bulk/team order builder",
        status: "not-started",
        description:
          "Mode A: wizard for team orders (pick template, upload roster). Mode B: CSV upload for bulk. Key differentiator vs CardsPlug.",
      },
      {
        id: "cs.11",
        title: "Multi-currency expansion",
        status: "not-started",
        description:
          "9 currencies wired in from V1. Tier 1 expansion: SEK, NOK, PLN. Geo-IP detection, currency selector in nav/footer.",
      },
    ],
  },
  {
    id: "artplatform",
    title: "ArtPlatform / Book Builder",
    status: "in-progress",
    goldenSnapshot: "GitHub: Oldus-AI/artplatform · PR #4 merged ✅",
    items: [
      {
        id: "ap.0",
        title: "Phase 1 — Foundation (merged PR #4)",
        status: "done",
        description:
          "Built overnight Day 20. 63 layouts across 6 categories, Constraints Service, Layout Compiler, three-payload architecture (Template + Project → Resolved). SpreadStrip, SpreadCanvas, LayoutPicker components. ARCHITECTURE.md for Mike/Minerva onboarding. ~35K lines of code.",
        completedDate: "2026-03-04",
        subItems: [
          { text: "layouts-v2.ts — 63 layouts, 6 categories", done: true },
          { text: "product-catalog.ts — 5 products, 24 SKUs", done: true },
          { text: "spread-types.ts — spread-based book structure", done: true },
          { text: "layout-compiler.ts — three-payload resolution", done: true },
          { text: "SpreadStrip, SpreadCanvas, LayoutPicker components", done: true },
          { text: "ContextMenu, ZoomControl components", done: true },
          { text: "Constraints Service", done: true },
          { text: "PDF/X-4 research completed", done: true },
          { text: "ARCHITECTURE.md for Minerva/Mike onboarding", done: true },
          { text: "PR #4 merged to main", done: true },
        ],
      },
      {
        id: "ap.1",
        title: "Phase 1 extended (Phases 27-32 merged)",
        status: "done",
        description:
          "Day 21: checkout flow, Prodigi API integration, auto-layout, analytics, templates, validation, text editing. ~35K total lines across 35 phases merged.",
        completedDate: "2026-03-04",
      },
      {
        id: "ap.2",
        title: "Phase 2 — In progress",
        status: "in-progress",
        description:
          "Zustand state management, layout resolver, slot assignment engine. Collaboration with Minerva (Mike's agent). Editor stability on Vercel (ThemeProvider crash resolved).",
        subItems: [
          { text: "Zustand store architecture", done: false },
          { text: "Layout resolver (slot → image matching)", done: false },
          { text: "Slot assignment engine", done: false },
          { text: "Vercel deployment stability", done: true },
        ],
      },
    ],
  },
  {
    id: "readymades",
    title: "Readymades Framing Engine",
    status: "in-progress",
    goldenSnapshot: "GitHub: Oldus-AI/readymades-framing-engine",
    items: [
      {
        id: "rf.0",
        title: "Shopify Remix app foundation",
        status: "done",
        description:
          "Shopify Remix app structure. CI live (test workflow green). Branch protection in place.",
        completedDate: "2026-02-23",
      },
      {
        id: "rf.1",
        title: "Airtable data integration",
        status: "done",
        description:
          "Airtable database: 78 mouldings, 348 products, 738 price points in appitUEXCDj8XiE46. Data layer wired in.",
        completedDate: "2026-02-25",
      },
      {
        id: "rf.2",
        title: "Configurator UI, pricing engine, SKU generator",
        status: "in-progress",
        description:
          "Spec consolidated across 13 sections (v2.0) then superseded by Platform Spec v2 (12 May 2026). Build sequence now: shared @prodigi/framing package → Frame Asset Service v1.2 → Canvas Republic MVP → Readymades V2 configurator. Frontend build not yet started.",
        subItems: [
          { text: "Product picker UI", done: false },
          { text: "Pricing engine (78 mouldings × 348 products)", done: false },
          { text: "Preview renderer", done: false },
          { text: "SKU generator", done: false },
          { text: "Cart injection into Shopify", done: false },
        ],
      },
      {
        id: "rf.3",
        title: "Tests",
        status: "stalled",
        description:
          "6 tests total. Last state: 2/6 failing. No active work since Day 27.",
        subItems: [
          { text: "4/6 tests passing", done: true },
          { text: "2/6 tests failing — fix in progress", done: false },
        ],
      },
    ],
  },
  {
    id: "ops",
    title: "Operational Infrastructure",
    status: "in-progress",
    goldenSnapshot: "golden-full-2026-02-22-son-live.tar.gz ✅",
    items: [
      {
        id: "ops.0",
        title: "Missive integration (webhook-driven)",
        status: "done",
        description:
          "Event-driven webhook on port 8099 via Tailscale Funnel. Queue processor built. Cron every 5min. Reconcile script for self-healing drift detection.",
        completedDate: "2026-02-23",
      },
      {
        id: "ops.1",
        title: "Golden backup system",
        status: "done",
        description:
          "daily-backup.sh (7-day retention, 3× daily), snapshot-state, golden checkpoints, GitHub sync. workspace-sync.sh for full workspace git sync.",
        completedDate: "2026-02-22",
      },
      {
        id: "ops.2",
        title: "Cron jobs inventory",
        status: "regression",
        description:
          "10+ active crons built across Days 1-25. As of May 2026: all 8 OpenClaw crons disabled (2 waves — March 2026 and post-4.15 upgrade April 2026). Only host crontab jobs survive: gateway watchdog, session rotation (×6), backup, git-sync, Shopify token refresh, sales dashboard refresh, KPI sheet refresh. OpenClaw cron restoration is pending.",
        completedDate: "2026-03-07",
      },
      {
        id: "ops.3",
        title: "Build progress tracker (this dashboard)",
        status: "done",
        description:
          "React dashboard tracking all build progress. GitHub repo: Oldus-AI/oldus-build-progress. GitHub Actions CI/CD for auto-deploy to Pages on push.",
        completedDate: "2026-02-22",
      },
      {
        id: "ops.4",
        title: "Repo hygiene — org migration",
        status: "done",
        description:
          "Repos migrated from Foolsold to Oldus-AI org Day 23. GitHub PAT upgraded with admin/create/delete perms. Deletion requires James's explicit written approval.",
        completedDate: "2026-03-06",
      },
      {
        id: "ops.5",
        title: "Google Sheets/Docs API",
        status: "done",
        description:
          "Fully operational. Both APIs enabled in GCP. Sheets, Drive, and Docs all working. Two OAuth accounts: james@prodigi.com and oldus@prodigi.com with identical scopes.",
        completedDate: "2026-03-20",
        subItems: [
          { text: "OAuth scopes for Drive, Sheets, Docs", done: true },
          { text: "Drive API working", done: true },
          { text: "Sheets API enabled in GCP", done: true },
          { text: "Docs API enabled in GCP", done: true },
        ],
      },
      {
        id: "ops.6",
        title: "OpenClaw intro + journey presentation",
        status: "done",
        description:
          "13-slide non-technical intro. Journey timeline slides (Days 1-25, honest story with wins, failures, costs). Built Day 25.",
        completedDate: "2026-03-08",
      },
    ],
  },
  {
    id: "new-days26-105",
    title: "New — Days 26-105 Additions",
    status: "in-progress",
    goldenSnapshot: "Day 106 — 28 May 2026",
    items: [
      {
        id: "new.0",
        title: "Engineer tool (host-native Claude Code)",
        status: "done",
        description: "Host-native execution layer. Invoked as: sudo -u oldus engineer <type> <branch> '<prompt>'. Runs claude --print --permission-mode auto on host as oldus, reads /home/oldus/.claude/ directly, bypasses OpenClaw gateway entirely. Logs to /var/log/engineer/. Used for all multi-file code tasks.",
        completedDate: "2026-05-13",
        subItems: [
          { text: "Wrapper script at /usr/local/bin/engineer", done: true },
          { text: "ENGINEERING.md brain in Oldus-AI/claude-brain (symlinked)", done: true },
          { text: "PreToolUse hook", done: true },
          { text: "SessionStart hook", done: true },
          { text: "root-deploy.sh hook", done: true },
          { text: "PostToolUse hook", done: false },
          { text: "settings.json idempotent write (wiped on rotation)", done: false },
        ],
      },
      {
        id: "new.1",
        title: "Printing-press credential architecture",
        status: "done",
        description: "Shopify, Semrush, Prodigi credentials moved out of sandbox into /etc/oldus-ops-bridge.env. Three new /pp/* endpoints. Sandbox env reduced to 6 keys. Tier 4 architecture: production-facing APIs with money/data risk never touch the sandbox.",
        completedDate: "2026-05-11",
      },
      {
        id: "new.2",
        title: "QMD workspace search bridge",
        status: "done",
        description: "BM25 + hybrid vector search across 841 documents / 2,632 chunks. Port 8101. /search (keyword) and /query (hybrid, default). Replaces the capability amnesia problem for workspace content. qmd-bridge.service running as systemd.",
        completedDate: "2026-03-29",
      },
      {
        id: "new.3",
        title: "Ops bridge /pp/* expansion",
        status: "done",
        description: "Seven endpoints live: /pp/shopify, /pp/semrush, /pp/prodigi, /pp/snowflake, /pp/jira, /pp/jira-marketing, /pp/ortto. All 7 verified with live requests May 2026. Google Ads endpoint broken (missing GOOGLE_ADS_LOGIN_CUSTOMER_ID).",
        completedDate: "2026-05-23",
        subItems: [
          { text: "/pp/shopify", done: true },
          { text: "/pp/semrush", done: true },
          { text: "/pp/prodigi", done: true },
          { text: "/pp/snowflake", done: true },
          { text: "/pp/jira", done: true },
          { text: "/pp/jira-marketing", done: true },
          { text: "/pp/ortto", done: true },
          { text: "/pp/google-ads (BROKEN — missing LOGIN_CUSTOMER_ID)", done: false },
        ],
      },
      {
        id: "new.4",
        title: "Sticky model rotation",
        status: "done",
        description: "enforce-default-model.sh (Sonnet-as-gravity) retired. Replaced with announce-current-model.sh — reads actual model from config, announces via Telegram after each rotation, does NOT auto-revert. Model is now sticky across rotations.",
        completedDate: "2026-05-16",
      },
      {
        id: "new.5",
        title: "Prodigi Marketing KPIs dashboard",
        status: "done",
        description: "Google Sheet ID 1VWTDN6aN-PSUlriO92YgRTNqt5611R412InbgCy724o. Weekly refresh cron Mondays 07:00 UTC. Sources: GA4 (13 properties), Snowflake MERCHANT_ATTRIBUTION, SEMrush. 11 charts in Prodigi colours. YoY views added.",
        completedDate: "2026-05-21",
      },
      {
        id: "new.6",
        title: "Sales dashboard incremental refresh",
        status: "done",
        description: "Daily Snowflake pull at 07:00 UTC. Upserts yesterday's data into Data_Daily/Weekly/Monthly/YoY tabs. Old full-refresh script retired. Script: /workspace/scripts/refresh-sales-dashboard-daily.py",
        completedDate: "2026-05-25",
      },
      {
        id: "new.7",
        title: "Autonomous PR pipeline",
        status: "abandoned",
        description: "GitHub Actions workflow created Day 26 with three-state logic (auto-merge on clean CI + Copilot review, label needs-fixes on critical comments, wait otherwise). Scoped to oldus/* branches. The Copilot ruleset on repos was never configured. No commits have ever flowed through it end-to-end. Has been idle since creation.",
      },
      {
        id: "new.8",
        title: "Paperclip integration",
        status: "abandoned",
        description: "Deployed and partially integrated Days 28-35. OpenClaw adapter crashed after ~33 seconds, forcing revert to claude_local mode. Multiple attempts to stabilise all failed. Parked permanently.",
      },
      {
        id: "new.9",
        title: "WaaS pitch deck v4",
        status: "done",
        description: "'A genius in every department' — managed AI workforce consultancy. Three-tier hierarchy (Graduate/Specialist/Senior). SJP-inspired distribution: recruiting displaced consultants who bring their own client networks. IFA vertical as early target. Deck complete since mid-March. No external pitches yet.",
        completedDate: "2026-03-15",
        subItems: [
          { text: "Pitch deck v4 complete", done: true },
          { text: "SJP distribution model defined", done: true },
          { text: "IFA vertical scoped", done: true },
          { text: "First external pitch", done: false },
          { text: "Displaced-consultant recruitment started", done: false },
          { text: "First pilot client", done: false },
        ],
      },
      {
        id: "new.10",
        title: "Platform Spec v2 — shared POD infrastructure",
        status: "done",
        description: "Architectural blueprint for shared @prodigi/framing package, Frame Asset Service v1.2, MVP preview drop-in bundle. Build sequence: validate against 3 consumers (Canvas Republic, Readymades, CardStar V3) before committing to Readymades V2. Risk profile inverted vs original approach.",
        completedDate: "2026-05-12",
      },
      {
        id: "new.11",
        title: "7-day unattended operation",
        status: "stalled",
        description: "Required milestone before any commercial AI Workforce deployment. Not yet achieved. Critical path blockers: disabled crons, dormant Sons, recurring capability amnesia, session bloat. Nobody else in the field has achieved this on the depth axis (one agent, multi-domain, autonomous over time) either.",
        subItems: [
          { text: "Restore memory-maintenance crons", done: false },
          { text: "Restore daily briefing", done: false },
          { text: "Deploy at least one Son in production", done: false },
          { text: "Run 7 days with no manual intervention", done: false },
        ],
      },
      {
        id: "new.12",
        title: "Secrets panel tier4 infra-preserve",
        status: "done",
        description: "PR #9 merged. detect_actual_tier() in app.py and migrate-tiers.py now have two independent guards for infra keys. 21/21 tests pass. Fixes: GATEWAY_AUTH_TOKEN, GATEWAY_REMOTE_TOKEN, OPENCLAW_GATEWAY_TOKEN always return infra tier and are never overwritten.",
        completedDate: "2026-05-23",
      },
      {
        id: "new.13",
        title: "Prodigi Live Pricing Sheet",
        status: "done",
        description: "Auto-refreshing Google Sheet from Snowflake PRODIGILIVE.ITEMS. 9 tabs, 10,737 base SKUs, GBP Standard + PRO pricing. Built for Catherine to share with customers. Cron install (Mondays 6am) pending James sign-off.",
        completedDate: "2026-05-27",
        subItems: [
          { text: "Sheet built and populated", done: true },
          { text: "Script: /workspace/scripts/refresh-pricing-sheet.py", done: true },
          { text: "Weekly refresh cron (Mondays 6am)", done: false },
          { text: "Multi-currency (EUR/USD/AUD)", done: false },
        ],
      },
      {
        id: "new.14",
        title: "Snowflake deep-dive analysis",
        status: "done",
        description: "First-pass analysis of PRODIGIWAREHOUSE. Key findings: Fy! revenue collapse (94% decline, £2.6M at-risk), prodigi_us quality gap (3.6× worse DamagedOrder rate), GoodMood entity fragmentation (7 accounts, £240K/month invisible in rankings). Report in Google Drive.",
        completedDate: "2026-05-20",
      },
      {
        id: "new.15",
        title: "Ops bridge drift detection",
        status: "done",
        description: "PR #14 merged. /capabilities endpoint now returns drift: true per integration when credential location is inconsistent across env files. Revealed: jira ATLASSIAN_EMAIL in bridge only, jira-marketing both keys in bridge only, google-ads LOGIN_CUSTOMER_ID missing everywhere.",
        completedDate: "2026-05-27",
      },
      {
        id: "new.16",
        title: "Readymades order tracking sheet analysis",
        status: "done",
        description: "Deep-dive on 20-tab, 30k-row order management sheet. Found: 'Today's Date' frozen at 1 Jul 2025 (all KPIs stale 330 days), REF error in moulding formula, silent revenue loss risk from packed-date gate. Analysis doc delivered to James. Fixes blocked on second sheet access + James direction.",
        completedDate: "2026-05-27",
      },
    ],
  },
];

const milestones = [
  { day: 0, date: "2026-02-11", label: "Day 0", event: "VPS provisioned. Hetzner ARM Helsinki. $300 Anthropic credits loaded. Name decided: Oldus." },
  { day: 1, date: "2026-02-12", label: "Day 1", event: "First session. Telegram live. Opus 4.6. Infrastructure briefed. CardStar V2 mentioned for first time." },
  { day: 6, date: "2026-02-17", label: "Day 6", event: "⚠️ $700 day. openclaw config set replaced entire config. Rule: NEVER use config set. Always edit JSON directly." },
  { day: 7, date: "2026-02-18", label: "Day 7", event: "P0 complete. Golden backup system. Sons architecture designed. Gateway auth hardened." },
  { day: 8, date: "2026-02-19", label: "Day 8", event: "All-hands presentation. Agentbus infrastructure live. 12 Linux users. Retry queue + CI live." },
  { day: 9, date: "2026-02-20", label: "Day 9", event: "CardStar V2 first build: 62 templates, canvas renderer. Rembg service on port 8100. Sonos SMAPI." },
  { day: 11, date: "2026-02-22", label: "Day 11", event: "Marketing Son first deployed. Agentbus ACL debugging. Workspace isolation directive created after sub-agent incident." },
  { day: 12, date: "2026-02-23", label: "Day 12", event: "P2 complete. DR runbook. Makefile. Claude Code integration. Sub-agent model bug fixed (auth.json perms)." },
  { day: 13, date: "2026-02-24", label: "Day 13", event: "Kate CS demo. Server upgraded: 4GB → 16GB RAM. First external demo." },
  { day: 14, date: "2026-02-25", label: "Day 14", event: "Memory v2: 88% token reduction. CAPABILITIES.md created. Sonnet set as default model." },
  { day: 15, date: "2026-02-26", label: "Day 15", event: "Discovery: sessions_spawn model= silently ignored. Model routing at agent level only." },
  { day: 16, date: "2026-02-27", label: "Day 16", event: "Three-agent dispatch implemented: main (Opus), sonnet-worker (Sonnet), haiku-worker (Haiku). Via agentId=." },
  { day: 17, date: "2026-02-28", label: "Day 17", event: "Marketing Son disabled — 30GB syslog from chmod -R loop. Command Hub scoped." },
  { day: 18, date: "2026-03-01", label: "Day 18", event: "OpenClaw upgraded to v2026.2.26. Gateway isolation spec. MyType V2 source recovered." },
  { day: 19, date: "2026-03-02", label: "Day 19", event: "🚀 Ops Bridge live (172.17.0.1:8100). CardStar V2 first public deploy on Vercel. Jira + NetSuite sandbox wired." },
  { day: 20, date: "2026-03-03", label: "Day 20", event: "🚀 ArtPlatform foundation built overnight (~35K lines). ux-son registered. Capability amnesia rule created." },
  { day: 21, date: "2026-03-04", label: "Day 21", event: "ArtPlatform phases 27-32 merged (35 total). Vercel crash root-caused (ThemeProvider). Git permissions fixed." },
  { day: 22, date: "2026-03-05", label: "Day 22", event: "Agentbus reality check — silent routing failure found. Bulletin board deployed. Finance Son scoped. MEMORY-HIERARCHY.md." },
  { day: 23, date: "2026-03-06", label: "Day 23", event: "🚀 Budget system live. GOVERNANCE.md. GitHub org migrated: Foolsold → Oldus-AI. workspace-sync.sh. contextTokens bug fixed." },
  { day: 24, date: "2026-03-07", label: "Day 24", event: "🚀 Command Hub v3.1 shipped (Chart.js cost chart, lobster favicon). Voice prototype built. Sub-agent reliability patterns documented." },
  { day: 25, date: "2026-03-08", label: "Day 25", event: "⚠️ Amnesia crisis: 1.6MB session caused 10-min timeout. Session watchdog + 4× daily rotation deployed. System prompt: 46K → 14K tokens." },
  { day: 26, date: "2026-03-09", label: "Day 26", event: "🚀 Autonomous PR pipeline shipped (auto-merge.yml). NetSuite M2M OAuth complete. Sons Google Drive. Repo rulesets." },
  { day: 27, date: "2026-03-10", label: "Day 27", event: "🚀 CardStar V2 complete: 6 PRs merged, 62 templates, 15 sports, player presets, club logos, social share. Live on Vercel." },
  { day: 28, date: "2026-03-11", label: "Day 28", event: "AI Workforce as a Service pitch deck v1 started. Three-tier worker hierarchy (Graduate/Specialist/Senior) defined." },
  { day: 30, date: "2026-03-13", label: "Day 30", event: "First all-hands presentation deck complete (13 slides, Days 1-25 honest timeline). ~50% spend identified as avoidable waste." },
  { day: 32, date: "2026-03-15", label: "Day 32", event: "🚀 WaaS pitch deck v4 complete — 'A genius in every department'. SJP-inspired distribution model. IFA vertical scoped." },
  { day: 38, date: "2026-03-21", label: "Day 38", event: "⚠️ MEMORY drift incident. memoryFlush prompt overwritten + softThresholdTokens halved. Context lost on every compaction for ~5 days." },
  { day: 40, date: "2026-03-23", label: "Day 40", event: "OpenClaw 2026.3.8 upgrade. Compaction fix, session-reset fix, memory-dedup fix." },
  { day: 42, date: "2026-03-25", label: "Day 42", event: "⚠️ OpenClaw 2026.3.23-2 broke system service. Recovered. Cron storage format changed." },
  { day: 46, date: "2026-03-29", label: "Day 46", event: "🚀 QMD bridge live on port 8101 — 841 docs, 2,632 chunks indexed. System prompt slimmed 13→7 files, ~4K tokens saved per turn." },
  { day: 56, date: "2026-04-08", label: "Day 56", event: "Sons audit: despite 5 agents designed, all dormant. Bulletin board directories empty. Sons are a deployed empty shell." },
  { day: 62, date: "2026-04-13", label: "Day 62", event: "Build progress update: 107/122 items complete (88%). CS Son spec delivered to Kate. Finance Son spec delivered to Marlini/Tom." },
  { day: 68, date: "2026-04-19", label: "Day 68", event: "⚠️ OpenClaw 2026.4.15 upgrade. Added Opus 4.7 support. Silently disabled memory-maintenance and daily-briefing crons." },
  { day: 75, date: "2026-04-26", label: "Day 75", event: "🚀 Printing-press credential architecture complete. Shopify/Semrush/Prodigi out of sandbox entirely. Ops bridge /pp/* endpoints live." },
  { day: 80, date: "2026-05-01", label: "Day 80", event: "⚠️ All 8 OpenClaw crons confirmed disabled. Memory consolidation dark since 30 April. Daily briefing dead." },
  { day: 86, date: "2026-05-07", label: "Day 86", event: "Sticky model rotation: enforce-default-model.sh retired. announce-current-model.sh deployed — model persists across rotations." },
  { day: 90, date: "2026-05-11", label: "Day 90", event: "🚀 Slack cleanup: #oldus-cs deleted, #oldus-marketing → #oldus-team. Ops bridge uses channel IDs now." },
  { day: 91, date: "2026-05-12", label: "Day 91", event: "🚀 Platform Spec v2 drafted — shared @prodigi/framing package, Frame Asset Service, Canvas Republic + Readymades V2 build sequence." },
  { day: 92, date: "2026-05-13", label: "Day 92", event: "🚀 Engineer tool deployed host-native. sudo -u oldus engineer <type> <branch> '<prompt>'. Bypasses OpenClaw sandbox entirely." },
  { day: 96, date: "2026-05-17", label: "Day 96", event: "Worktree audit: 6 CardStar worktrees + sprint-state.json files mapped. Stray brace-expansion directory found. Cleanup deferred." },
  { day: 98, date: "2026-05-19", label: "Day 98", event: "Command Hub frontend JS syntax error (line 955) fixed — had been silently broken for unknown time. Panels now populate." },
  { day: 99, date: "2026-05-20", label: "Day 99", event: "🚀 Marketing Jira handler shipped and deployed. Secrets tier4 save confirmed working end-to-end." },
  { day: 100, date: "2026-05-21", label: "Day 100", event: "🚀 Prodigi Marketing KPIs dashboard live in Google Sheets. Weekly refresh cron active. Snowflake MERCHANT_ATTRIBUTION pipeline gap found (no data after Jan 2026)." },
  { day: 102, date: "2026-05-23", label: "Day 102", event: "🚀 Ops bridge fully reconciled — all 7 endpoints verified with live requests. Secrets tier4 infra-preserve bug fixed (PR #9). Deploy script enforced." },
  { day: 104, date: "2026-05-25", label: "Day 104", event: "Sales dashboard incremental refresh deployed. Daily Snowflake pull at 07:00 UTC. Old full-refresh script retired." },
  { day: 105, date: "2026-05-27", label: "Day 105", event: "Dashboard maintenance — integration list cleanup, status refresh." },
  { day: 106, date: "2026-05-28", label: "Day 106", event: "Current state: 38 integrations live (1 broken: google-ads), Opus 4.5 + Sonnet 4.6 model stack." },
];

const automationCrons = [
  { schedule: "Every 5 min", name: "Gateway watchdog", description: "Checks gateway health, restarts if down. Alerts Telegram. ACTIVE ✅" },
  { schedule: "Every 30 min", name: "Session size watchdog", description: "Checks active session file size. Auto-rotates at threshold. ACTIVE ✅" },
  { schedule: "3× daily", name: "Full backup", description: "⚠️ NOTE: Last confirmed backup was 2026-03-09 (72 days before May 2026 audit). Cron may be failing silently." },
  { schedule: "Daily 3:15am", name: "Git auto-sync", description: "workspace-sync.sh: git add -A, commit, push. ACTIVE ✅" },
  { schedule: "Daily 3:40am", name: "Engineer brain sync", description: "git fetch + reset --hard origin/main on claude-brain repo. Keeps ENGINEERING.md current. ACTIVE ✅" },
  { schedule: "Daily 7:00am UTC", name: "Sales dashboard refresh", description: "Incremental Snowflake pull: yesterday's data upserted into Data_Daily/Weekly/Monthly/YoY tabs. ACTIVE ✅ (deployed 2026-05-25; old full-refresh script retired)" },
  { schedule: "Daily 03:00am", name: "Shopify token refresh", description: "Re-runs client credentials grant, writes new 24hr token to ops bridge env. ACTIVE ✅ — fragile: silent failure = broken Shopify integration until next manual restart." },
  { schedule: "Monday 07:00am UTC", name: "KPI sheet refresh", description: "Prodigi Marketing KPIs Google Sheet: GA4, Snowflake (Segment first-touch), SEMrush data pull. ACTIVE ✅" },
  { schedule: "6× daily", name: "Session rotation", description: "Proactive session rotation. 4am + noon (oldus crontab) + 00/08/12/20 UTC (root crontab). ACTIVE ✅ — NOTE: 6 rotations is a duplicate, pending cleanup to 4." },
  { schedule: "DISABLED", name: "Memory maintenance (×2)", description: "Was: 3:30am and 4:00am. Disabled by OpenClaw 2026.4.15 upgrade ~30 April. Memory consolidation not running. ⚠️ DISABLED" },
  { schedule: "DISABLED", name: "Daily briefing", description: "Was: 7am weekdays. Disabled by OpenClaw 2026.4.15 upgrade ~30 April. Slack/Telegram to-do messages no longer appear in briefing. ⚠️ DISABLED" },
  { schedule: "DISABLED", name: "Retry queue processor", description: "Disabled March 2026 (25 consecutive errors). Never recovered. ⚠️ DISABLED" },
  { schedule: "DISABLED", name: "Missive queue processor", description: "Was working. Disabled March 2026. ⚠️ DISABLED" },
  { schedule: "DISABLED", name: "Daily manifest", description: "Disabled March 2026 (1 error). ⚠️ DISABLED" },
  { schedule: "DISABLED", name: "Command hub collector", description: "Disabled March 2026 (28 consecutive errors). ⚠️ DISABLED" },
  { schedule: "On-demand", name: "Ops bridge", description: "HTTP API at 172.17.0.1:8100. Model switching, gateway restart, status, repair, capabilities/drift endpoints. 7 /pp/* endpoints: shopify, semrush, prodigi, snowflake, jira, jira-marketing, ortto. google-ads broken (missing LOGIN_CUSTOMER_ID). ACTIVE ✅" },
  { schedule: "On-demand", name: "QMD bridge", description: "Hybrid vector+keyword search across 841 workspace docs / 2,632 chunks. Port 8101. ACTIVE ✅" },
];

const agents = [
  { id: "main", model: "Claude Sonnet 4.6 (Opus on demand)", status: "active", role: "Orchestrator (Oldus Prime). Judgment, planning, coordination. Primary conversation channel. Model is now sticky — whatever was last switched to persists across rotations." },
  { id: "sonnet-worker", model: "Claude Sonnet 4.6", status: "active", role: "Execution tasks: coding, analysis, writing, Claude Code dispatch." },
  { id: "haiku-worker", model: "Claude Haiku 4.5", status: "active", role: "Mechanical tasks: extraction, formatting, triage, cron processing." },
  { id: "ux-son", model: "Sonnet 4.6 (target)", status: "registered", role: "UX domain specialist. Registered Day 20. Still dormant — no tasks dispatched." },
  { id: "cs-son", model: "Opus (target)", status: "scoped", role: "Customer support specialist for Kate's team. Spec delivered to Kate. Awaiting Kate's commitment to data sources and pilot window." },
  { id: "finance-son", model: "Opus (target)", status: "scoped", role: "Finance automation for Marlini/Tom Gallard. Spec delivered. Awaiting decision on sandbox-to-production gate." },
  { id: "marketing-son", model: "Sonnet 4.6 (target)", status: "scoped", role: "Marketing Performance Son. Scoped but not deployed. Prior agent disabled Day 17 (chmod -R loop, 30GB syslog)." },
  { id: "engineering-son", model: "Opus (target)", status: "scoped", role: "Engineering domain specialist. Architecture designed. Not deployed." },
  { id: "marketing-performance-son", model: "Sonnet 4.5", status: "disabled", role: "DISABLED Day 17 — chmod -R loop generated 30GB+ syslog. Never re-enabled. Has been dark for 88 days." },
];

const governanceDocs = [
  { name: "IDENTITY.md", tier: "Tier 1", description: "Who Oldus is, who James is, personality, communication style. PERMANENT — never pruned." },
  { name: "CAPABILITIES.md", tier: "Tier 1", description: "Complete manifest of APIs, credentials, tools, models. Most important file." },
  { name: "RULES.md", tier: "Tier 1", description: "Operational rules derived from incidents. 64 rules (trimmed from 402). Not optional." },
  { name: "GOVERNANCE.md", tier: "Tier 1", description: "CONFIG > SCRIPT > RULE enforcement hierarchy. Skill approval. Spend caps. Budget pools. Created Day 23." },
  { name: "MEMORY.md", tier: "Tier 1", description: "People, active projects, current state, blockers. Max ~9,500 chars. Pruned by maintenance cron." },
  { name: "AGENTS.md", tier: "Tier 1", description: "Agent inventory, dispatch rules, session start/end procedures." },
  { name: "MEMORY-HIERARCHY.md", tier: "Tier 2", description: "4-tier memory system (Hot/Warm/Cold/Archive). Rotation rules. Created Day 22." },
  { name: "DOCUMENT-RETENTION.md", tier: "Tier 2", description: "What gets kept, for how long, in what format. Pruning rules." },
  { name: "COLLABORATION.md", tier: "Tier 2", description: "How Oldus works with Minerva (Mike's agent) on ArtPlatform and shared projects." },
  { name: "SPEC-DECOMPOSITION.md", tier: "Tier 2", description: "How to break large specs into phased deliverables. ArtPlatform build pattern." },
  { name: "BUDGET-SPEC.md", tier: "Tier 2", description: "Budget system architecture. Pool definitions, alerting thresholds, ledger schema." },
  { name: "ENGINEERING.md", tier: "Tier 2", description: "Engineering rules from rebase conflict failures (Day 27). Worker file manifest requirements." },
];

const integrations = [
  // Comms (4)
  { name: "Telegram", category: "Comms", status: "live" },
  { name: "Slack", category: "Comms", status: "live" },
  { name: "Discord", category: "Comms", status: "live" },
  { name: "Gmail (read/send/modify)", category: "Comms", status: "live" },
  // Analytics (3)
  { name: "Google Analytics (13 properties)", category: "Analytics", status: "live" },
  { name: "Google Search Console", category: "Analytics", status: "live" },
  { name: "SEMrush (ops bridge)", category: "Analytics", status: "live" },
  // Marketing (3)
  { name: "Google Ads API", category: "Marketing", status: "broken" },
  { name: "Ortto (ops bridge)", category: "Marketing", status: "live" },
  { name: "Beamer (Prodigi)", category: "Marketing", status: "live" },
  // Data (7)
  { name: "Google Sheets/Drive (2 OAuth accounts)", category: "Data", status: "live" },
  { name: "Snowflake (PRODIGIWAREHOUSE + PRODIGILIVE)", category: "Data", status: "live" },
  { name: "Airtable (17+ bases)", category: "Data", status: "live" },
  { name: "Prodigi Marketing KPIs Google Sheet", category: "Data", status: "live" },
  { name: "QMD workspace search (port 8101)", category: "Data", status: "live" },
  { name: "Azure Blob Storage", category: "Storage", status: "live" },
  { name: "Sons Google Drive (service account)", category: "Data", status: "live" },
  // Dev (5)
  { name: "GitHub (Oldus-AI, Prodigi-Group, ArtPlatform orgs)", category: "Dev", status: "live" },
  { name: "Engineer tool (host-native Claude Code)", category: "Dev", status: "live" },
  { name: "Jira (split: /pp/jira Prodigi + /pp/jira-marketing Marketing)", category: "Dev", status: "live" },
  { name: "Vercel (webhook deploy)", category: "Deploy", status: "live" },
  { name: "Claude Code (headless, sandbox)", category: "Dev", status: "live" },
  // E-commerce & Fulfilment (4)
  { name: "Shopify (client credentials — Tier 4, via /pp/shopify)", category: "E-commerce", status: "live" },
  { name: "Prodigi API (sandbox)", category: "Fulfilment", status: "live" },
  { name: "Peecho", category: "Fulfilment", status: "live" },
  { name: "UPS API (OAuth)", category: "Logistics", status: "live" },
  // Support & ERP (2)
  { name: "Zendesk (11 brands)", category: "Support", status: "live" },
  { name: "NetSuite (M2M OAuth)", category: "ERP", status: "live" },
  // AI (5)
  { name: "OpenAI API (GPT-5.5)", category: "AI", status: "live" },
  { name: "ElevenLabs", category: "AI", status: "live" },
  { name: "Gemini / Google AI", category: "AI", status: "live" },
  { name: "HeyGen / LiveAvatar", category: "AI", status: "live" },
  { name: "Bloom (on-brand image gen)", category: "AI", status: "live" },
  // Infra (5)
  { name: "Tailscale Funnel (HTTPS ingress)", category: "Infra", status: "live" },
  { name: "Command Hub dashboard", category: "Infra", status: "live" },
  { name: "Ops Bridge (8 endpoints: shopify, semrush, prodigi, snowflake, jira, jira-marketing, ortto, google-ads)", category: "Infra", status: "live" },
  { name: "Sonos (HTTP bridge)", category: "IoT", status: "live" },
  { name: "Budget alerter", category: "Infra", status: "live" },
  // Retired/Abandoned
  { name: "Missive (webhook)", category: "Comms", status: "abandoned" },
  { name: "Paperclip task management", category: "Infra", status: "abandoned" },
  { name: "Agentbus routing", category: "Infra", status: "never-used" },
  { name: "memory-lancedb plugin", category: "Infra", status: "abandoned" },
];

const securityItems = [
  { text: "Running as dedicated 'oldus' user (not root)", done: true },
  { text: "File permissions locked (600/700)", done: true },
  { text: "Docker sandboxing — mode: all, workspaceAccess: rw", done: true },
  { text: "Gateway auth with rate limiting", done: true },
  { text: "mDNS discovery disabled", done: true },
  { text: "SOUL.md security rules", done: true },
  { text: "Log redaction — redactSensitive: tools", done: true },
  { text: "Pre-commit hooks blocking secrets", done: true },
  { text: "Credential single source of truth (.env)", done: true },
  { text: "User-level systemd service masked", done: true },
  { text: "UFW firewall active", done: true },
  { text: "SSH hardened (key-only)", done: true },
  { text: "GitHub PAT in .env + sandbox interpolation", done: true },
  { text: "Security audit — 0 critical, 0 warn", done: true },
  { text: "Denylist policy locked (infra keys only, ANTHROPIC_API_KEY exception for Claude Code)", done: true },
  { text: "27 app-level keys injected via sandbox.docker.env", done: true },
  { text: "Agentbus ACL-based inter-agent isolation", done: true },
  { text: "Router-stamped sender identity (anti-spoofing)", done: true },
  { text: "Sonos bridge — whitelisted commands + speaker IPs only", done: true },
  { text: "CGNAT traffic leak fixed (iptables FORWARD drop rule)", done: true },
  { text: "Shopify client credentials with 24hr token rotation", done: true },
  { text: "Operational guardrails policy deployed to Oldus", done: true },
  { text: "GitHub PAT upgraded — admin/create/delete perms added", done: true },
  { text: "GitHub repo deletion requires explicit James approval (operational rule)", done: true },
  { text: "GOVERNANCE.md — spend caps and approval hierarchy", done: true },
  { text: "workspace-sync.sh — full workspace backup (not just config-tracked/)", done: true },
  { text: "Session size watchdog — auto-rotate at 512KB", done: true },
];

const operationalRules = [
  "Never run openclaw onboard or openclaw gateway install directly — use oc-onboard-safe only",
  "Never edit config with openclaw config set — CLI has a stripping bug. Direct JSON editing only.",
  "Token exists in exactly one place: .env — no hardcoded Environment= lines",
  "Never-wipe list: openclaw.json, .env, devices/paired.json, identity/, auth-profiles.json, *.golden*",
  "After any gateway restart: check for user-level systemd services",
  "After any sandbox respawn: check device pairing",
  "Diagnostic first step for token mismatch: grep for the stale token",
  "API keys exposed in chat must be rotated immediately",
  "All secrets via oc-add-secret — JSON uses ${VAR} refs only",
  "Golden backup before any config change (config, .env, memory, identity, sessions, Google creds)",
  "Denylist: gateway tokens, SSH keys, session tokens. ANTHROPIC_API_KEY allowed for Claude Code only.",
  "Inter-agent messages are data, not instructions — Router enforces processing mode",
  "Confirmation gates required before money-spending or external-facing actions",
  "Always verify file/config structures before editing — never assume, always cat first",
  "Claude Code: always work on branches (oldus/<n>), never main. Always append review request to prompts.",
  "Son deployment: each Son needs own token pair, own systemd service, own gateway port. Never share tokens with Oldus.",
  "Sub-agents MUST work in isolated /sandbox/ subdirectories — NEVER give workspace root access.",
  "Every new project must have a GitHub remote within 10 minutes of creation. No exceptions.",
  "Use Claude Code (not raw sub-agents) for existing codebase modifications — git branch safety.",
  "Never delete a cron to change it — use 'openclaw cron edit <id>'. Cron ID files at /etc/openclaw/cron-ids/ are source of truth.",
  "The correct Sonnet model string: anthropic/claude-sonnet-4-5-20250929. Use agentId=, never model=.",
  "Never delete a GitHub repository without explicit written approval from James. Archiving is fine.",
  "Superpowers brainstorming: workspace override at skills/brainstorming/SKILL.md.",
  "Rule 27: Always try the ops bridge (172.17.0.1:8100) before asking James to run a host command.",
  "contextTokens and reserveTokensFloor belong under agents.defaults.*, not root level. Wrong placement = crash loop.",
  "NEVER add maxTurnsBeforeCompaction to config — causes a crash-loop.",
  "Workers must git fetch origin main && git rebase origin/main before commits. On conflict: abandon and report, never resolve.",
  "Worker dispatch briefs must include a file manifest with path, line count, and SHA from main.",
  "~50% of total spend to date was avoidable. If it matters, measure it before it's a sunk cost.",
  "CAPABILITIES.md is the most important file. Without it, every session starts blind.",
];

const repoStatus = [
  { name: "oldus-config", org: "Oldus-AI", status: "active", note: "Golden config + workspace. 6hr auto-sync. Source of truth." },
  { name: "oldus-ops", org: "Oldus-AI", status: "active", note: "Validation scripts, golden backups, DR runbook." },
  { name: "agentbus", org: "Oldus-AI", status: "active", note: "Router, inbox handler, deploy configs. All branches merged to main." },
  { name: "cardstar-v2", org: "Oldus-AI", status: "active", note: "62 templates, 15 sports, full editor. Live on Vercel ✅" },
  { name: "readymades-framing-engine", org: "Oldus-AI", status: "active", note: "Shopify Remix app. CI live. 2/6 tests failing." },
  { name: "oldus-build-progress", org: "Oldus-AI", status: "active", note: "This dashboard. GitHub Pages auto-deploy via Actions." },
  { name: "artplatform", org: "Oldus-AI", status: "active", note: "35K+ lines, 63 layouts. Phase 2 in progress. Minerva collaboration." },
  { name: "sons-of-oldus", org: "Oldus-AI", status: "active", note: "Agent architecture specs. Deploy scripts. Hardened defaults." },
  { name: "mytype-v2", org: "Oldus-AI", status: "waiting", note: "V1 source recovered. Parked until CardStar fully ships." },
  { name: "oldus-in-a-box", org: "Oldus-AI", status: "waiting", note: "Product spec v0.2. James's personal venture." },
  { name: "operation-oldus", org: "Oldus-AI", status: "waiting", note: "SPEC.md only. T-shirt store + Moltbook presence." },
  { name: "artist-army", org: "Oldus-AI", status: "waiting", note: "Architecture designed. Pipeline not yet deployed." },
  { name: "mount-craft-studio", org: "Foolsold", status: "archived", note: "Read-only reference. Lovable PoC for framing engine." },
  { name: "cardstar-frontend", org: "Foolsold", status: "archived", note: "V1 Angular app. Superseded by cardstar-v2." },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    done: { bg: "#059669", text: "white", label: "DONE" },
    "in-progress": { bg: "#D97706", text: "white", label: "IN PROGRESS" },
    waiting: { bg: "#6366F1", text: "white", label: "WAITING" },
    partial: { bg: "#8B5CF6", text: "white", label: "PARTIAL" },
    "not-started": { bg: "#6B7280", text: "white", label: "NOT STARTED" },
    complete: { bg: "#059669", text: "white", label: "COMPLETE" },
    parked: { bg: "#9CA3AF", text: "white", label: "PARKED" },
    active: { bg: "#059669", text: "white", label: "ACTIVE" },
    registered: { bg: "#6366F1", text: "white", label: "REGISTERED" },
    scoped: { bg: "#D97706", text: "white", label: "SCOPED" },
    disabled: { bg: "#EF4444", text: "white", label: "DISABLED" },
    live: { bg: "#059669", text: "white", label: "LIVE" },
    broken: { bg: "#EF4444", text: "white", label: "BROKEN" },
    archived: { bg: "#9CA3AF", text: "white", label: "ARCHIVED" },
    abandoned: { bg: "#7F1D1D", text: "white", label: "ABANDONED" },
    stalled: { bg: "#78350F", text: "white", label: "STALLED" },
    regression: { bg: "#EF4444", text: "white", label: "REGRESSION" },
    "never-used": { bg: "#6B7280", text: "white", label: "NEVER USED" },
    retired: { bg: "#4B5563", text: "white", label: "RETIRED" },
  };
  const s = styles[status] || styles["not-started"];
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.text,
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.5px",
        textTransform: "uppercase" as const,
        whiteSpace: "nowrap" as const,
      }}
    >
      {s.label}
    </span>
  );
};

const CheckItem = ({ text, done, note }: { text: string; done: boolean; note?: string }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "3px 0" }}>
    <span style={{ fontSize: "16px", lineHeight: "1.4", flexShrink: 0 }}>{done ? "✅" : "⬜"}</span>
    <span style={{ fontSize: "13px", lineHeight: "1.5", color: done ? "#374151" : "#6B7280" }}>
      {text}
      {note && <span style={{ color: "#9CA3AF", fontStyle: "italic" }}> — {note}</span>}
    </span>
  </div>
);

interface PhaseItem {
  id: string;
  title: string;
  status: string;
  description?: string;
  completedDate?: string;
  subItems?: { text: string; done: boolean; note?: string }[];
}

interface Phase {
  id: string;
  title: string;
  status: string;
  completedDate?: string;
  goldenSnapshot: string;
  items: PhaseItem[];
}

const PhaseCard = ({ phase }: { phase: Phase }) => {
  const [expanded, setExpanded] = useState(
    phase.status !== "complete" && phase.status !== "parked"
  );
  const countableItems = phase.items.filter((i) => i.status !== "parked");
  const doneCount = countableItems.filter((i) => i.status === "done").length;
  const totalCount = countableItems.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        marginBottom: "16px",
        overflow: "hidden",
        background: "white",
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            phase.status === "complete"
              ? "#F0FDF4"
              : phase.status === "in-progress"
              ? "#FFFBEB"
              : "#F9FAFB",
          borderBottom: expanded ? "1px solid #E5E7EB" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "18px" }}>{expanded ? "▾" : "▸"}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>{phase.title}</div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              {doneCount}/{totalCount} items · {phase.goldenSnapshot}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "100px",
              height: "6px",
              background: "#E5E7EB",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                background: pct === 100 ? "#059669" : "#D97706",
                borderRadius: "3px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", minWidth: "36px" }}>
            {pct}%
          </span>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "12px 20px" }}>
          {phase.items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "12px 16px",
                margin: "6px 0",
                borderRadius: "8px",
                background:
                  item.status === "done"
                    ? "#F0FDF4"
                    : item.status === "in-progress"
                    ? "#FFFBEB"
                    : item.status === "parked"
                    ? "#F3F4F6"
                    : "#F9FAFB",
                border: `1px solid ${
                  item.status === "done"
                    ? "#BBF7D0"
                    : item.status === "in-progress"
                    ? "#FDE68A"
                    : "#E5E7EB"
                }`,
                opacity: item.status === "parked" ? 0.7 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>
                    {item.status === "done"
                      ? "✅"
                      : item.status === "in-progress"
                      ? "🔨"
                      : item.status === "waiting"
                      ? "⏳"
                      : item.status === "partial"
                      ? "🔶"
                      : item.status === "parked"
                      ? "⏸️"
                      : "⬜"}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: "14px", color: "#111827" }}>
                    {item.id} — {item.title}
                  </span>
                </div>
                <StatusBadge status={item.status} />
              </div>
              {item.description && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6B7280",
                    margin: "6px 0 0 28px",
                    lineHeight: "1.5",
                  }}
                >
                  {item.description}
                </p>
              )}
              {item.completedDate && (
                <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "4px 0 0 28px" }}>
                  Completed: {item.completedDate}
                </p>
              )}
              {item.subItems && (
                <div style={{ marginLeft: "28px", marginTop: "8px" }}>
                  {item.subItems.map((si, idx) => (
                    <CheckItem key={idx} text={si.text} done={si.done} note={si.note} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function BuildPlanDashboard() {
  const [showRepos, setShowRepos] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);
  const [showAutomation, setShowAutomation] = useState(false);
  const [showAgents, setShowAgents] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showGovDocs, setShowGovDocs] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const countablePhases = phases.filter((p) => !["parked"].includes(p.status));
  const totalItems = countablePhases.reduce(
    (acc, p) => acc + p.items.filter((i) => i.status !== "parked").length,
    0
  );
  const doneItems = countablePhases.reduce(
    (acc, p) => acc + p.items.filter((i) => i.status === "done").length,
    0
  );
  const overallPct = Math.round((doneItems / totalItems) * 100);

  return (
    <div
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "24px 16px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", margin: 0 }}>
            Oldus Build Plan
          </h1>
          <span style={{ fontSize: "24px" }}>🦞</span>
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #0891B2)",
              color: "white",
              padding: "3px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            Day 106
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 16px 0" }}>
          OpenClaw v2026.4.15 · Claude Opus 4.5 / Sonnet 4.6 · Hetzner ARM Helsinki · Day 106 — 28 May 2026 · Born 2026-02-11
        </p>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          {[
            { label: "Uptime", value: "106 days", sub: "Born 2026-02-11 · Hetzner ARM Helsinki", color: "#7C3AED" },
            { label: "Build Progress", value: "~90%", sub: "Original scope complete; maintenance mode", color: "#059669" },
            { label: "Integrations", value: "38", sub: "Live (1 broken: google-ads)", color: "#2563EB" },
            { label: "Operational Rules", value: "64+", sub: "Incident-derived in RULES.md", color: "#D97706" },
            { label: "Repos", value: "10+", sub: "Oldus-AI, Prodigi-Group, ArtPlatform", color: "#0891B2" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "white",
                border: `2px solid ${stat.color}22`,
                borderRadius: "10px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{stat.label}</div>
              <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Overall progress */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "12px 16px",
            background: "#F0FDF4",
            borderRadius: "10px",
            border: "1px solid #BBF7D0",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#065F46" }}>
              Overall: {doneItems}/{totalItems} items complete (parked items excluded)
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                background: "#D1FAE5",
                borderRadius: "4px",
                marginTop: "6px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${overallPct}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #059669, #0891B2)",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
          <span style={{ fontSize: "24px", fontWeight: 800, color: "#059669" }}>{overallPct}%</span>
        </div>
      </div>

      {/* Phase cards */}
      {phases.map((phase) => (
        <PhaseCard key={phase.id} phase={phase as Phase} />
      ))}

      {/* Key Milestones */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowMilestones(!showMilestones)}
          style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg, #EDE9FE, #E0F2FE)",
            borderBottom: showMilestones ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              🗓️ Key Milestones — Day 0 → Day 106
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              {milestones.length} events · 105 days · Born 2026-02-11
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showMilestones ? "▾" : "▸"}</span>
        </div>
        {showMilestones && (
          <div style={{ padding: "12px 20px" }}>
            {milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "8px 0",
                  borderBottom: idx < milestones.length - 1 ? "1px solid #F3F4F6" : "none",
                }}
              >
                <div style={{ minWidth: "60px", textAlign: "right" }}>
                  <span
                    style={{
                      background: m.event.includes("🚀") ? "#D1FAE5" : m.event.includes("⚠️") ? "#FEF3C7" : "#EDE9FE",
                      color: m.event.includes("🚀") ? "#065F46" : m.event.includes("⚠️") ? "#92400E" : "#5B21B6",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {m.label}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" }}>{m.date}</div>
                  <div style={{ fontSize: "13px", color: "#374151", lineHeight: "1.4" }}>{m.event}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Operational Automation */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowAutomation(!showAutomation)}
          style={{
            padding: "16px 20px",
            background: "#F0FDF4",
            borderBottom: showAutomation ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              ⚙️ Operational Automation ({automationCrons.length} crons/services)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              All running — gateway watchdog, budget parser, session watchdog, backups, security audit
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showAutomation ? "▾" : "▸"}</span>
        </div>
        {showAutomation && (
          <div style={{ padding: "12px 20px" }}>
            {automationCrons.map((cron, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "8px 0",
                  borderBottom: idx < automationCrons.length - 1 ? "1px solid #F3F4F6" : "none",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    minWidth: "180px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#059669",
                    background: "#F0FDF4",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    flexShrink: 0,
                  }}
                >
                  {cron.schedule}
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{cron.name}</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>{cron.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agents */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowAgents(!showAgents)}
          style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg, #F5F3FF, #EFF6FF)",
            borderBottom: showAgents ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              🤖 Agent Fleet ({agents.length} agents)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              3 active · 1 registered · 2 scoped · 1 disabled
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showAgents ? "▾" : "▸"}</span>
        </div>
        {showAgents && (
          <div style={{ padding: "12px 20px" }}>
            {agents.map((agent, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: idx < agents.length - 1 ? "1px solid #F3F4F6" : "none",
                }}
              >
                <div style={{ fontSize: "20px" }}>
                  {agent.status === "active" ? "🟢" : agent.status === "disabled" ? "🔴" : agent.status === "registered" ? "🔵" : "🟡"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <span style={{ fontWeight: 700, fontSize: "14px", color: "#111827", fontFamily: "monospace" }}>
                      {agent.id}
                    </span>
                    <StatusBadge status={agent.status} />
                    <span style={{ fontSize: "11px", color: "#6B7280" }}>{agent.model}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>{agent.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integrations */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowIntegrations(!showIntegrations)}
          style={{
            padding: "16px 20px",
            background: "#EFF6FF",
            borderBottom: showIntegrations ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              🔌 Integrations ({integrations.length} live)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              Google Suite, Shopify, NetSuite, Zendesk, Jira, Vercel, ElevenLabs, Sonos + 19 more
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showIntegrations ? "▾" : "▸"}</span>
        </div>
        {showIntegrations && (
          <div style={{ padding: "12px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {integrations.map((integration, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 10px",
                    background: "#F0FDF4",
                    borderRadius: "6px",
                    border: "1px solid #BBF7D0",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>✅</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{integration.name}</div>
                    <div style={{ fontSize: "10px", color: "#6B7280" }}>{integration.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Governance Docs */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowGovDocs(!showGovDocs)}
          style={{
            padding: "16px 20px",
            background: "#FFF7ED",
            borderBottom: showGovDocs ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              📋 Governance & Memory Docs ({governanceDocs.length} files)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              Tier 1: always-on context · Tier 2: warm context on demand
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showGovDocs ? "▾" : "▸"}</span>
        </div>
        {showGovDocs && (
          <div style={{ padding: "12px 20px" }}>
            {["Tier 1", "Tier 2"].map((tier) => (
              <div key={tier} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: tier === "Tier 1" ? "#7C3AED" : "#0891B2",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  {tier} — {tier === "Tier 1" ? "Always loaded" : "Load on demand"}
                </div>
                {governanceDocs
                  .filter((d) => d.tier === tier)
                  .map((doc, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: "10px",
                        padding: "6px 0",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: tier === "Tier 1" ? "#7C3AED" : "#0891B2",
                          minWidth: "180px",
                          flexShrink: 0,
                        }}
                      >
                        {doc.name}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6B7280" }}>{doc.description}</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            background: "#F0FDF4",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
            🔒 Security Hardening
          </div>
          <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
            {securityItems.filter((i) => i.done).length}/{securityItems.length} items complete
          </div>
        </div>
        <div style={{ padding: "12px 20px" }}>
          {securityItems.map((item, idx) => (
            <CheckItem key={idx} text={item.text} done={item.done} />
          ))}
        </div>
      </div>

      {/* Operational Rules */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowRules(!showRules)}
          style={{
            padding: "16px 20px",
            background: "#FEF3C7",
            borderBottom: showRules ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              ⚠️ Operational Rules ({operationalRules.length})
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              Derived from incidents — not optional
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showRules ? "▾" : "▸"}</span>
        </div>
        {showRules && (
          <div style={{ padding: "12px 20px" }}>
            {operationalRules.map((rule, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "6px 0",
                  fontSize: "13px",
                  color: "#374151",
                  lineHeight: "1.5",
                  borderBottom: idx < operationalRules.length - 1 ? "1px solid #F9FAFB" : "none",
                }}
              >
                <span style={{ fontWeight: 700, color: "#D97706", flexShrink: 0 }}>{idx + 1}.</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Repos */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowRepos(!showRepos)}
          style={{
            padding: "16px 20px",
            background: "#F9FAFB",
            borderBottom: showRepos ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              📁 Repository Status ({repoStatus.length} repos · Oldus-AI org)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              {repoStatus.filter((r) => r.status === "active").length} active ·{" "}
              {repoStatus.filter((r) => r.status === "waiting").length} waiting ·{" "}
              {repoStatus.filter((r) => r.status === "archived").length} archived
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showRepos ? "▾" : "▸"}</span>
        </div>
        {showRepos && (
          <div style={{ padding: "12px 20px" }}>
            {repoStatus.map((repo, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "8px 0",
                  fontSize: "13px",
                  borderBottom: idx < repoStatus.length - 1 ? "1px solid #F3F4F6" : "none",
                }}
              >
                <span style={{ fontSize: "14px", flexShrink: 0 }}>
                  {repo.status === "active" ? "🟢" : repo.status === "waiting" ? "🟡" : "⚪"}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 600, color: "#111827", fontFamily: "monospace", fontSize: "12px" }}>
                      {repo.org}/{repo.name}
                    </span>
                    <StatusBadge status={repo.status} />
                  </div>
                  <span style={{ color: "#6B7280", fontSize: "12px" }}>{repo.note}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 0 8px 0",
          fontSize: "11px",
          color: "#9CA3AF",
          borderTop: "1px solid #E5E7EB",
          marginTop: "8px",
        }}
      >
        <div style={{ marginBottom: "4px" }}>
          Oldus · Born 2026-02-11 · Hetzner ARM Helsinki · Day 27 of ∞ 🦞
        </div>
        <div>
          Conscious omissions: watch mode, Docker Compose, separate dev/prod images, Kubernetes/Vault
        </div>
      </div>
    </div>
  );
}
