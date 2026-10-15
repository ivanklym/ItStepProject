# AI-assisted testing

A short guide on how we use an AI coding assistant to write tests for this project,
and what to watch out for. **AI output is a draft — a human always reviews it.**

## 1. Stack and tool

| Part | Choice | Why |
|---|---|---|
| Test runner | [Vitest](https://vitest.dev/guide/) | Native Vite integration, same config file, Jest-compatible API |
| Component testing | [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | Tests what the user sees, not implementation details |
| DOM environment | jsdom | Simulates a browser in Node |
| AI assistant | Claude (claude.ai) | Chat-based; we paste the component and ask for tests |

> The backend (`backend/`) has no code or `package.json` yet, so only the frontend is covered.
> When the backend appears, the same workflow applies (e.g. Vitest/Jest + Supertest for Express).

### Setup

```bash
cd frontend
npm install
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

What was configured:

- `frontend/vite.config.js` — added a `test` block (`environment: 'jsdom'`, `setupFiles`, `include: ['tests/**/*.test.{js,jsx}']`).
- `frontend/tests/setup.js` — registers `jest-dom` matchers (`toBeInTheDocument`, ...) and cleans up the DOM after each test.
- `frontend/package.json` — scripts `test` (single run) and `test:watch`.
- `frontend/tests/` — all test files live here.

Run:

```bash
cd frontend
npm test          # run once (CI-friendly)
npm run test:watch  # re-run on change
```

### Setting up the AI tool

1. Open [claude.ai](https://claude.ai) (or use Copilot / ChatGPT — the workflow is the same).
2. Give it **context**: paste the component source, `package.json` (so it knows the stack), and tell it which libraries to use.
3. Ask for tests, then **run them yourself**. Never trust "this should pass".

## 2. Prompts that worked well

Good prompts are specific about the stack, the target, and the expected style.

**Generating tests**

```text
I have a React 18 + Vite project. Test stack: Vitest + React Testing Library + jest-dom.
Write unit tests for the component below. Query by role/text (not by CSS class),
one behavior per test, no snapshot tests. Put them in tests/App.test.jsx.

<paste src/App.jsx>
```

**Reviewing generated tests**

```text
Review these tests. Which ones would still pass if the component were broken?
Which ones test implementation details instead of behavior?
```

**Fixing a failure**

```text
This test fails with the error below. Here are the test, the component, and the
full error output. Explain the cause first, then propose a fix.
```

What made these work: naming the exact libraries, forbidding bad patterns up front
(CSS-class selectors, snapshots), asking for *one behavior per test*, and pasting the
real source instead of describing it.

## 3. What the AI got wrong and how we fixed it

Tested component: `frontend/src/App.jsx`.

| Problem | How it was found | Fix |
|---|---|---|
| **Brittle test**: the first draft asserted `container.firstChild` has class `App`. That checks a CSS detail, and breaks on any harmless refactor. | Human review; confirmed by renaming the class — only this test failed, for a non-functional reason. | Replaced with a test that asserts there is exactly one `<h1>` (an accessibility-relevant rule). |
| **"Passing" is not "correct"**: all tests were green on the first run, which says nothing about whether they can fail. | Manual *mutation check*: temporarily changed the message text, changed `<h1>` to `<h2>`, renamed the class. | Verified each change made exactly the expected test fail, then restored the code. |
| **Emoji in the heading**: the heading is `ItStepProject 🚀`; an exact-string match would fail or be fragile. | Reading the component source before accepting the test. | Used a regex on the accessible name: `name: /ItStepProject/`. |
| **Version compatibility**: the latest Vitest may expect a newer Vite than the project's Vite 5. | Checked `package.json` before installing. | Pinned `vitest@^2`, which fits Vite 5. |

> ✍️ Add your own findings here — real mistakes you hit while working with the AI are the most valuable part of this section.

## 4. Best practices

- **Give context, not just a request** — stack, libraries, file paths, and the real source code.
- **Small units first** — one component or function per prompt. Big prompts give vague, generic tests.
- **Run everything locally** (`npm test`) before committing. AI cannot run your project.
- **Do a mutation check** — break the code on purpose and make sure the tests fail.
- **Test behavior, not implementation** — query by role/text, avoid CSS classes and internal state.
- **Read every line** you commit. You are responsible for it, not the AI.
- **Commit with the `test:` prefix** (see `CONTRIBUTING.md`).

## 5. Limitations

- AI can produce tests that look correct but assert nothing meaningful, or that always pass.
- It may use outdated APIs or wrong versions of libraries (always check against the official docs).
- It does not know your business rules — expected values must be verified by a human.
- It cannot see your code unless you paste it; stale context leads to wrong tests.
- Passing tests ≠ good coverage. Check what is **not** covered.
- Do not paste secrets (`.env`, tokens, keys) into an AI chat.

## Useful links

- Vitest: https://vitest.dev/guide/
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- jest-dom matchers: https://github.com/testing-library/jest-dom
- Jest (similar API, referenced in the task): https://jestjs.io/docs/getting-started
