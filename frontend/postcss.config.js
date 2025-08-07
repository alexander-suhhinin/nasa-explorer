// Skip PostCSS processing during tests to avoid dependency issues
const config = process.env.NODE_ENV === 'test'
  ? { plugins: {} }
  : {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };

export default config;
