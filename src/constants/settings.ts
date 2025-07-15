export enum LOCALE {
  EN = 'en',
  ZH = 'zh'
}

export const LOCALES: Record<LOCALE, { name: string; locale: LOCALE }> = {
  [LOCALE.EN]: {
    name: 'English',
    locale: LOCALE.EN
  },
  [LOCALE.ZH]: {
    name: '简体中文',
    locale: LOCALE.ZH
  }
}

export enum THEME {
  Dark,
  Light
}
