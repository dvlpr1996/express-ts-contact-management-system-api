export default class MissingEnvVarsError extends Error {
  constructor(missingVars: string[]) {
    super(`Missing environment variables: ${missingVars.join(', ')}`);
    this.name = "MissingEnvVarsError";
  }
}
