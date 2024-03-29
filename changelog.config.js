module.exports = {
  disableEmoji: false,
  list: [
    'feat',
    'fix',
    'docs',
    'chore',
    'style',
    'refactor',
    'perf',
    'test',
    'build',
    'ci',
    'revert',
    'release',
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    'type',
    'scope',
    'subject',
    'body',
    'breaking',
    'issues',
    'lerna',
  ],
  scopes: [],
  types: {
    feat: {
      description: '新功能',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: '修改Bug',
      emoji: '🐛',
      value: 'fix',
    },
    docs: {
      description: '文档变更',
      emoji: '📝',
      value: 'docs',
    },
    chore: {
      description: '配置项',
      emoji: '🤖',
      value: 'chore',
    },
    style: {
      description: '样式修改',
      emoji: '🎨',
      value: 'style',
    },
    refactor: {
      description: '重构',
      emoji: '💡',
      value: 'refactor',
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '⚡️',
      value: 'perf',
    },
    test: {
      description: 'Adding missing tests',
      emoji: '💍',
      value: 'test',
    },
    build: {
      description: '构建',
      emoji: '📦',
      value: 'build',
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci',
    },
    revert: {
      description: '回退',
      emoji: '🏥',
      value: 'revert',
    },
    release: {
      description: 'Create a release commit',
      emoji: '🏹',
      value: 'release',
    },
  },
};
