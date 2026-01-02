module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting
        'refactor', // Code refactoring
        'perf', // Performance optimization
        'test', // Tests
        'chore', // Build/tooling
        'revert', // Revert
        'build', // Build system
        'ci', // CI configuration
      ],
    ],
    // Enforce short, single-line, English commit messages
    // Refer to https://github.com/conventional-changelog/commitlint/blob/master/docs/reference/rules.md for more details
    'header-max-length': [2, 'always', 72], // Max 72 chars for header
    'body-max-line-length': [2, 'always', 200], // Max 200 chars per line in body
    'subject-case': [2, 'always', 'sentence-case'], // Subject in sentence case
    'subject-empty': [2, 'never'], // Subject required
    'subject-full-stop': [2, 'never', '.'], // No period at end
    'type-case': [2, 'always', 'lower-case'], // Type must be lowercase
    'type-empty': [2, 'never'], // Type required
    'scope-empty': [2, 'never'], // Scope required
    'scope-case': [2, 'always', 'kebab-case'], // Scope must be lowercase if present
  },
}
