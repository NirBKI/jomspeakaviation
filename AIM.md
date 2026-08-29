# Agentic Infrastructure Manifest (AIM) - Localized

This document defines how the enterprise-grade AIM applies specifically to the CCAE Portfolio Rebuild.

## 5-Layer Stack
Given the solo nature of this project, the 5 layers have been scaled down to prevent operational bloat while maintaining security.

1. **Memory Layer (Constitution)**: Defined in `.agents/constitution.md`. Ensures the AI agent operates with least privilege, refuses auto-run, and never leaks secrets.
2. **Knowledge Layer (Skills)**: Defined in `.agents/skills/`. Includes basic runbooks for validating Supabase RLS and running security scans.
3. **Guardrail Layer (Hooks)**: Defined in `.agents/hooks.json`. Placeholder for deterministic python/bash pre-tool checks. Currently enforced via explicit human approval (HITL) on all commands.
4. **Delegation Layer (Subagents)**: Defined in `.agents/subagents/`. A Security Reviewer subagent is available to analyze diffs before merging to main.
5. **Distribution Layer (Plugins)**: Placeholder. Not required for a solo repository.

## RACI Boundaries
- **Responsible**: Google Antigravity (writing code, generating specs).
- **Accountable**: Munir Mohamad (approving PRs, reviewing security diffs, validating logic).
- **Consulted**: AIM Whitepaper and Cybersecurity Protocol.
- **Informed**: (N/A)
