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

| Незрозуміла інструкція про копіювання файлів | ШІ сказав скопіювати package.json і vite.config.js з архіву із заміною. Я неправильно замінив package.json, тому npm install встановив лише старі 63 пакети, а npm test видав помилку Missing script: "test". | Помітив за помилкою і за кількістю пакетів (63 замість приблизно 150). Додав скрипти командою npm pkg set scripts.test="vitest run" і встановив тестові залежності вручну через npm install -D vitest jsdom @testing-library/react. Тепер більше довіряю командам, ніж кроку "скопіюй файл". |
| Дужки з інструкції вписав буквально | У гайді для гілки було feature/<ім'я>-frontend. Я залишив кутові дужки (<Viktor>), і термінал видав помилку bash: Viktor: No such file or directory, бо розцінив < як перенаправлення. | Гілка не створилася, я побачив помилку. Повторив команду без дужок: git switch -c feature/viktor-frontend. |
| Команди не збігалися з моєю папкою | ШІ радив cd frontend і git add frontend/..., а я вже був у папці frontend. Вийшла помилка cd: frontend: No such file or directory. | Це виказав git status, де був шлях ../docs/ai-testing.md. Перевірив місце командою pwd і далі виконував git-команди з кореня репозиторію. ШІ не бачить мій термінал, тому шляхи треба перевіряти самому. |
| Коміти не створилися | Після команд git log показував тільки чужі коміти. | git commit падав з помилкою Author identity unknown. Вказав своє ім'я та пошту через git config --global user.name і user.email, після цього повторив коміти. |


Підсумок: більшість проблем були не в самому коді тестів, а навколо нього. ШІ давав на вигляд правильні кроки, але не знав мою папку, мої налаштування git і те, чи файл справді замінився. Тепер після кожного кроку від ШІ я перевіряю результат реальними командами: pwd, git status, git log, npm test.

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
