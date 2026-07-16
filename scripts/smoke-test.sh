#!/usr/bin/env bash
#
# End-to-end smoke test: packs the package exactly as it would be published,
# installs the tarball into a throwaway consumer project alongside ESLint and
# its peer plugins, and asserts that importing each preset
# (@hzblj/eslint-config, /react, /react-native) actually resolves and applies.
#
# This guards against the exports map or the base <- react/react-native
# composition breaking, and against a preset silently linting nothing.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Pack the package exactly as it would be published (project uses Yarn Berry).
yarn pack --out "$TMP/pkg.tgz" >/dev/null
cd "$TMP"

# The throwaway consumer intentionally uses npm — it simulates a plain consumer
# installing the published tarball, independent of our toolchain.
echo "› Setting up throwaway consumer in $TMP"
npm init -y >/dev/null
npm install --no-save \
  "./pkg.tgz" \
  eslint@9 \
  @eslint/js@9 \
  typescript-eslint@8 \
  typescript@5 \
  eslint-plugin-prettier@5 \
  eslint-config-prettier@10 \
  prettier@3 \
  eslint-plugin-simple-import-sort@12 \
  eslint-plugin-sort-keys-fix@1 \
  eslint-plugin-react@7 \
  eslint-plugin-react-hooks@5 \
  eslint-plugin-jsx-a11y@6 \
  >/dev/null 2>&1

# The presets pair with a Prettier config matching their style opinions
# (single quotes, no semicolons, no bracket spacing, no arrow parens).
cat >.prettierrc <<'EOF'
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": false,
  "arrowParens": "avoid"
}
EOF

# $1 = subpath after "@hzblj/eslint-config" ("" for base, "/react", "/react-native")
write_config() {
  cat >eslint.config.mjs <<EOF
import config from '@hzblj/eslint-config$1'
export default config
EOF
}

lint() { npx --no-install eslint "$1" >/dev/null 2>&1; }

fail() {
  echo "✗ $1"
  exit 1
}

# --- base preset -----------------------------------------------------------
write_config ""

printf "export const clean = 'ok'\n" >sample.ts
lint sample.ts || fail "base: well-formatted file should pass (formatter opinions applied)"

printf 'export const bad = "x";\n' >sample.ts
if lint sample.ts; then
  fail "base: double quotes + semicolon should be rejected — preset not applied"
fi
echo "✓ base preset applied (single quotes, no semicolons enforced)"

# --- react-native preset ---------------------------------------------------
write_config "/react-native"

# console is a warning, not an error — a clean file must still pass.
printf 'export function log(value) {\n  console.log(value)\n}\n' >sample.ts
lint sample.ts || fail "react-native: console should be a warning, not fail the check"

# Rules of Hooks is active (base has no react-hooks plugin) — a conditional
# hook call must error.
printf 'export function Component(cond) {\n  if (cond) {\n    useState(0)\n  }\n  return null\n}\n' >sample.tsx
if lint sample.tsx; then
  fail "react-native: conditional hook call should trip react-hooks/rules-of-hooks"
fi

# No DOM a11y rules on native — an <img> without alt text must pass here.
printf 'export const Icon = () => <img src="/i.png" />\n' >sample.tsx
lint sample.tsx || fail "react-native: DOM a11y rules must NOT apply on native"
echo "✓ react-native preset applied (Rules of Hooks active, console = warn, no DOM a11y)"

# --- react (web) preset ----------------------------------------------------
write_config "/react"

printf "export const clean = 'ok'\n" >sample.ts
lint sample.ts || fail "react: base formatter opinions should carry through"

# Web a11y is active here — the same <img> without alt text must error.
printf 'export const Icon = () => <img src="/i.png" />\n' >sample.tsx
if lint sample.tsx; then
  fail "react: jsx-a11y should flag an <img> without alt text"
fi
echo "✓ react preset applied (base formatter kept, web a11y active)"

echo "✓ SMOKE TEST PASSED"
