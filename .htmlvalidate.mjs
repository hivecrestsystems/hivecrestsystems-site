export default {
  root: true,
  extends: ['html-validate:recommended'],
  rules: {
    // The design hand-off uses inline styles. Iteration 2 moves them into a
    // stylesheet; turn this rule back on then.
    'no-inline-style': 'off',
  },
};
