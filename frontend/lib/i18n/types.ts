export type Locale = "en" | "hi";

export const LOCALES: Locale[] = ["en", "hi"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "raushni-locale";
export const LOCALE_COOKIE_KEY = "raushni-locale";

export type Messages = {
  common: {
    donate: string;
    volunteer: string;
    contact: string;
    subscribe: string;
    emailPlaceholder: string;
    explore: string;
    links: string;
    light: string;
    dark: string;
    lightMode: string;
    darkMode: string;
    language: string;
    english: string;
    hindi: string;
    allRightsReserved: string;
    toggleNav: string;
    readOnly: string;
    admin: string;
    logout: string;
    profile: string;
    settings: string;
    search: string;
    guestUser: string;
    guestReadOnly: string;
    notifications: string;
    closeSidebar: string;
    openSidebar: string;
  };
  nav: Record<string, string>;
  footer: {
    description: string;
    newsletterTitle: string;
    newsletterText: string;
    footerNote: string;
  };
  auth: {
    dashboardLogin: string;
    signInHint: string;
    email: string;
    password: string;
    signIn: string;
    signingIn: string;
    signOut: string;
    invalidCredentials: string;
    sessionNote: string;
    signedInAs: string;
  };
  dashboard: {
    brandSubtitle: string;
    categories: Record<string, string>;
    modules: Record<string, string>;
  };
  home: {
    heroEyebrow: string;
    heroSubtitle: string;
    aboutHeading: string;
    vision: string;
    missionHeading: string;
    mission: string;
    successHeading: string;
    successIntro: string;
    volunteerHeading: string;
    volunteerIntro: string;
    contactHeading: string;
    ctaDonate: string;
    ctaVolunteer: string;
    ctaContact: string;
    aboutEyebrow: string;
    missionEyebrow: string;
    successEyebrow: string;
    volunteerEyebrow: string;
    contactEyebrow: string;
    exploreWork: string;
    contactTrust: string;
    waysToHelp: string;
    startVolunteering: string;
    name: string;
    phoneOrEmail: string;
    message: string;
    sendMessage: string;
    objectives: string[];
    volunteerWays: string[];
    focusAreas: Array<{ title: string; text: string }>;
  };
  theme: {
    toLight: string;
    toDark: string;
  };
};
