#!/bin/bash
# SessionStart hook: install the UI/UX Pro Max skills into the user-level
# skills directory. The remote (Claude Code on the web) container is
# ephemeral, so ~/.claude/skills is wiped between sessions; this re-installs
# the skills on every startup. Idempotent and non-interactive.
set -euo pipefail

# Only run in the remote (web) environment; local installs persist already.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

REPO_URL="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git"
SKILLS_DIR="${HOME}/.claude/skills"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

# Shallow clone just the skill source.
if ! git clone --depth 1 "$REPO_URL" "$TMP_DIR/repo" >/dev/null 2>&1; then
  echo "install-uiux-skills: clone failed, skipping skill install" >&2
  exit 0
fi

SRC="$TMP_DIR/repo/.claude/skills"
if [ ! -d "$SRC" ]; then
  echo "install-uiux-skills: no skills found in repo, skipping" >&2
  exit 0
fi

mkdir -p "$SKILLS_DIR"
installed=0
for dir in "$SRC"/*/; do
  [ -f "${dir}SKILL.md" ] || continue
  name="$(basename "$dir")"
  rm -rf "${SKILLS_DIR:?}/${name}"
  # -L dereferences symlinks (scripts/data point at the repo's src/ tree)
  # so each installed skill is self-contained.
  cp -rL "$dir" "${SKILLS_DIR}/${name}"
  installed=$((installed + 1))
done

echo "install-uiux-skills: installed ${installed} skill(s) into ${SKILLS_DIR}" >&2
