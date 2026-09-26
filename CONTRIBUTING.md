# ItStepProject

## Technologies
- Backend: Node.js / Express
- Frontend: React + Vite
- Database: PostgreSQL / MongoDB (choose as needed)

## Repository Structure
```
ItStepProject/
├── backend/     — server-side part
├── frontend/    — client-side part (React + Vite)
├── docs/        — project documentation
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

## Step 1. Clone the repository
```
git clone https://github.com/<mentor>/ItStepProject.git
cd ItStepProject
```

## Step 2. Run the project

### Frontend
```
cd frontend
npm install
npm run dev
```
It will open at http://localhost:5173.

### Backend
```
cd backend
npm install
npm run dev
```
The server usually starts at http://localhost:5000 (check in `backend/src/server.js`).

Before running, copy `.env.example` to `.env` in both folders (`frontend/` and `backend/`) and fill in your own values:

```
cp .env.example .env
```

## Step 3. Working correctly with branches

ℹ️ The `git switch` command requires Git version 2.23+. Check with: `git --version`.

### 3.1. Switching to develop
All development starts from the `develop` branch (not from `main`!):

```
git switch develop
git pull origin develop
```

If the `develop` branch doesn't exist locally:

```
git switch -c develop origin/develop
```

### 3.2. Creating your own branch
A branch is created only from `develop`, following a strict naming pattern:

```
feature/<your-name>-<backend|frontend>
```

Examples:
```
git switch -c feature/ivan-backend
git switch -c feature/olena-frontend
```

For a specific small task, you can add more detail to the name:
```
git switch -c feature/ivan-backend-auth
git switch -c feature/olena-frontend-navbar
```

⚠️ Never work directly in `main` or `develop` — only in your own `feature/...` branch.
⚠️ One branch = one task/feature. Don't mix several unrelated tasks in one branch.

### 3.3. Working in a branch
```
git status
git add .
git commit -m "feat(backend): added user registration endpoint"
```

Commit message format:

| Prefix | When to use |
|---|---|
| feat: | new functionality |
| fix: | bug fix |
| docs: | documentation changes |
| refactor: | code improvement without behavior change |
| test: | adding/updating tests |
| chore: | technical changes (configs, dependencies) |

### 3.4. Pushing a branch to GitHub
```
git push origin feature/ivan-backend
```

If the branch is being pushed for the first time:
```
git push --set-upstream origin feature/ivan-backend
```

## Step 4. How to contribute your code to the project (Pull Request)

1. On GitHub, a "Compare & pull request" prompt will appear next to your branch — click it (or manually: Pull requests → New pull request).
2. Set: base: `develop`, compare: `feature/ivan-backend`.
3. Fill in the description: what was done, how to test it.
4. Assign the mentor as Reviewer.
5. After approval — Merge pull request (Squash and merge — for a clean history in `develop`).
6. Delete the branch after merging:
```
git branch -d feature/ivan-backend
git push origin --delete feature/ivan-backend
```

## How develop gets into main
When a portion of the functionality in `develop` is stable and tested, the mentor creates a Pull Request `develop → main` (a regular Merge, without Squash — to preserve the commit history of all students).

## 🚫 Recommendations to avoid conflicts

**1. Sync with develop daily, not once a week**
```
git switch develop
git pull origin develop
git switch feature/ivan-backend
git merge develop
```
The longer a branch "lives" without syncing, the higher the chance of a conflict.

**2. One person — one area of responsibility in a file**
Agree with your mentor/team on who is responsible for which component/module. If two people edit the same file at the same time (e.g., `App.jsx`), a conflict is almost guaranteed.

**3. Small, frequent commits and PRs instead of one huge one**
A PR with 20 files is hard to review and even harder to merge without conflicts. Better to have 3–4 small PRs than one huge one every two weeks.

**4. Don't edit files unrelated to your task**
If you notice an unrelated bug in someone else's file, it's better to notify the author or create a separate PR with `fix:`, rather than fixing it "along the way" in your PR for a different feature.

**5. Before starting a new task — always pull a fresh develop**
```
git switch develop
git pull origin develop
git switch -c feature/ivan-new-task
```
Never create a new branch from an old local copy of `develop`.

**6. Use .gitignore properly**
Don't commit `node_modules/`, `.env`, `dist/`, `build/` — they are specific to each computer and cause "false" conflicts.

**7. If a conflict does occur**
```
git status
```
Git will show the files with conflicts (marked with `<<<<<<<`, `=======`, `>>>>>>>`). Open the file, choose/merge the needed code manually, remove the conflict markers, then:
```
git add .
git commit -m "merge: resolved conflict in App.jsx"
git push origin feature/ivan-backend
```
💡 If you're not sure how to merge the code correctly, it's better to consult the mentor or the author of the conflicting changes than to delete someone else's code at random.

**8. Communication is the best defense against conflicts**
Before starting work on a big change (e.g., changing the folder structure or a shared component) — give the team a heads-up in chat. A technical code conflict often starts with a lack of communication.

## ✅ Checklist before creating a Pull Request
- [ ] The code runs locally without errors (`npm run dev` starts)
- [ ] The branch is synced with `develop` (no conflicts)
- [ ] Commits have clear messages
- [ ] No unnecessary files (`node_modules`, `.env` were not committed)
- [ ] A description has been added to the Pull Request

## Project Branching Strategy

| Branch | Purpose |
|---|---|
| main | stable version of the project (protected, direct pushes forbidden) |
| develop | working branch where all completed features are merged |
| feature/<name>-backend | student's branch for backend development |
| feature/<name>-frontend | student's branch for frontend development |
