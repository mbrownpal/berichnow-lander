#!/bin/sh
# Vercel ignoreCommand: exit 0 skips the deployment, exit 1 builds it.
# https://vercel.com/docs/project-configuration/vercel-json#ignorecommand

message="${VERCEL_GIT_COMMIT_MESSAGE-}"
if [ -z "$message" ]; then
  message=$(git log -1 --format=%s 2>/dev/null || true)
fi

# "Starts with" applies to the commit subject. Shell globs do not cross newlines.
subject=$(printf '%s\n' "$message" | head -n 1)

case "$subject" in
  "Update Kickstarter stats"*)
    printf 'Skipping Vercel build for OpenClaw stats commit: %s\n' "$subject"
    exit 0
    ;;
esac

printf 'Building commit: %s\n' "$subject"
exit 1
