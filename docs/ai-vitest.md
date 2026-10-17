# AI Testing Guide

This guide explains how to use AI coding assistants (GitHub Copilot, Claude, ChatGPT)
to write tests for the ItStepProject frontend, which uses **Vitest** and **React Testing Library**.

## Testing Framework Setup

The project uses **Vitest** (a Vite-native test runner, Jest-compatible) for frontend unit tests.

### Prerequisites

- Node.js installed
- The frontend dependencies installed (`npm install` in `frontend/`)

### Installation

From the `frontend/` directory, install the testing dependencies:

```bash
npm install -D vitest@2 jsdom @testing-library/react @testing-library/jest-dom @testing-library/dom --legacy-peer-deps
```

### Configuration

Update `vite.config.js` to add the Vitest test configuration:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
  },
})
```

Create `src/tests/setup.js` to extend matchers:

```js
import '@testing-library/jest-dom/vitest'
```

Add a test script to `package.json`:

```json
"scripts": {
  "test": "vitest run"
}
```

Run tests with:

```bash
npm test
```

## Using an AI Tool to Write Tests

### Which AI tool

This guide was written using **GitHub Copilot** as the primary AI assistant, but the same
prompts work with **Claude** (claude.ai) or **ChatGPT** as well.

### GitHub Copilot setup

1. Install the GitHub Copilot extension in VS Code:
   - Extensions view (`Ctrl+Shift+X`) → search "GitHub Copilot" → Install
2. Sign in with your GitHub account when prompted.
3. Open a test file (e.g. `src/tests/App.test.jsx`) and start typing — Copilot will suggest
   completions inline as you type.

### Claude / ChatGPT setup

1. Open claude.ai or chat.openai.com.
2. Paste the component source code and ask the AI to generate unit tests.
3. Copy the generated code into your test file.

### Example prompts that worked well

**Prompt 1 — Generate tests for a React component:**

> Write Vitest unit tests for this React component using @testing-library/react.
> Test that it renders the main heading and the paragraph text correctly.
> Use `describe`, `it`, `expect`, `render`, `screen`. Import '@testing-library/jest-dom/vitest'.

**Prompt 2 — Test specific behavior:**

> Add a test case that checks the App component renders an element with role "heading" and level 1.

**Prompt 3 — Debug a failing test:**

> This Vitest test is failing with error: [error message]. Here is the test code: [code].
> Fix the test so it passes.

## What the AI Got Wrong and How I Fixed It

| AI mistake | Fix applied |

| Suggested `import '@testing-library/react'` without installing the package | Added `@testing-library/dom` as a dev dependency |
| Generated tests using `jest-dom` matchers (`toBeInTheDocument`) without importing `@testing-library/jest-dom/vitest` | Created `src/tests/setup.js` with the import |
| Tried to use `vitest` CLI before it was installed locally | Installed `vitest@2` as a dev dependency |
| Suggested Jest-compatible config that conflicted with Vite 5 | Pinned Vitest to v2.x for Vite 5 compatibility |

## Best Practices

1. **Review every AI-generated test.** AI can hallucinate imports, use wrong matcher names, or reference APIs that don't exist in your dependency versions.
2. **Run the tests after each AI suggestion.** A test that doesn't run is worse than no test.
3. **Keep tests small and focused.** Test one behavior per `it()` block.
4. **Use `screen.getByRole` and `screen.getByText`** rather than querying by implementation details (class names, IDs) — this makes tests more resilient to refactors.
5. **Don't test internal state.** Test rendered output and user-visible behavior.
6. **Pin dependency versions.** Vitest v5 requires Vite 6/7/8; this project uses Vite 5, so Vitest v2 is required.

## Limitations

- **AI doesn't know your exact dependency versions.** It may suggest APIs from newer major versions (e.g. Vitest 5) that are incompatible with your setup.
- **AI may invent imports or matchers.** Always verify imports exist in `node_modules`.
- **AI doesn't run your tests.** You must execute `npm test` locally to confirm everything passes.
- **For complex components with hooks/context**, AI-generated tests may miss required providers or mock setup. Manual review is essential.
- **Backend (Node.js/Express)** is not configured for testing in this project. The same approach applies, but you'd need `supertest` + Vitest for endpoint tests.

## References

- Vitest: https://vitest.dev/guide/
- Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- GitHub Copilot: https://docs.github.com/en/copilot
- Prompt engineering: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview
- Jest (reference, Vitest is API-compatible): https://jestjs.io/docs/getting-started
