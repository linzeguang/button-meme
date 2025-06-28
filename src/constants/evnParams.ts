export enum ENV_MODE {
  PROD = 'production',
  DEV = 'development'
}

export const ENV_PARAMS = {
  MODE: import.meta.env.VITE_MODE
}
