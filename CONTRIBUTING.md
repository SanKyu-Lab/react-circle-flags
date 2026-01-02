# 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/). All commit messages must follow this format:

```plain
<type>(<scope>): <subject>
```

**Rules:**

- ✅ **English only** - All commit messages must be in English
- ✅ **Short and concise** - Header max 72 characters
- ✅ **Single line** - No multi-line subjects
- ✅ **Lowercase** - Subject and type must be lowercase
- ✅ **No period** - Don't end subject with a period

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code formatting (no logic changes)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build/tooling changes
- `ci` - CI/CD changes

**Examples:**

```bash
✅ Good:
git commit -m "feat(flags): add 428 circular country flag components"
git commit -m "fix(build): resolve missing @eslint/js dependency"
git commit -m "docs: update installation instructions"

❌ Bad:
git commit -m "添加国旗组件"  # Not English
git commit -m "Add flags"  # Missing type
git commit -m "feat: Add new feature."  # Period at end
git commit -m "FEAT: NEW FEATURE"  # Not lowercase
```

## Pull Request Guidelines

When submitting a Pull Request, please ensure the following:

- ✅ **Descriptive title** - Summarize the changes made
- ✅ **Detailed description** - Explain the purpose and context of the changes
- ✅ **Linked issues** - Reference any related issues (e.g., "Closes #123")
- ✅ **Tests included** - Add tests for new features or bug fixes
- ✅ **Pass all checks** - Ensure all CI checks pass before requesting review
