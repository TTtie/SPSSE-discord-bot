module.exports = {
  name: 'warn',
  once: false,
  async execute(warn: string) {
    console.warn(warn);
  }
}
