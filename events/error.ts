import {captureException} from "@sentry/node";

module.exports = {
  name: 'error',
  once: false,
  execute(error: Error) {
    console.error(error);
    captureException(error);
  }
}
