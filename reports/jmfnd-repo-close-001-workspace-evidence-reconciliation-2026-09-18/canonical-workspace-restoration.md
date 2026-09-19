# Canonical Workspace Restoration

## Canonical local baseline

- Path: /Volumes/UsersExternal/JM1-PRIME/workspaces/jmerrill-foundation-canonical
- Source: fresh clone of https://github.com/jmerrillorg/jmerrillfoundation.git
- Starting SHA: 222c2b4b5a8742c6666747412b3048abb4651baf
- Working branch: codex/jmfnd-repo-close-001
- Toolchain: Node 24.11.0, npm 11.6.1, pnpm 11.24.0

The external workspace volume was selected because the internal data volume had only about 116 MiB available and the first build attempt failed with ENOSPC. A cloud-backed read also timed out there. The external volume had sufficient capacity and produced a clean validation result.

The original worktree remains intact as forensic evidence. It is not canonical development authority.

## Restoration result

CLEAN_CANONICAL_WORKSPACE_ESTABLISHED = YES

No branch or worktree was deleted. No stale branch was merged. No untracked FND-01 source artifact was moved or copied out of the forensic worktree.
