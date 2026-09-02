export type MenuItems = {
  id: string;
  name: string;
  visibilityArea: string;
  authenticatedOnly?: boolean;
};

export enum VisibilityArea {
  main_terminal = "main-terminal",
  portfolio_terminal = "portfolio-terminal",
  experience_terminal = "experience-terminal",
  projects_terminal = "projects-terminal",
  skills_terminal = "skills-terminal",
  contact_terminal = "contact-terminal",
  wormhole_terminal = "wormhole-terminal",
  wormhole_terminal_authenticated = "wormhole_terminal_authenticated",
}

export interface AuthResponse {
  token: string;
  tokenExpiresAtUtc: string;
  refreshToken: string;
  refreshTokenExpiresAtUtc: string;
  email: string;
  fullName: string;
  requiresTwoFactor: boolean;
  twoFactorToken?: string;
}

export interface WormholeLog {
  type: "success" | "error";
  message: string;
  data?: AuthResponse;
  error?: unknown;
}

export interface JwtPayload {
  sub: string;
  email: string;
  emailVerified: string;
  name: string;
  twoFactorEnabled: string;
  exp: number;
  iss: string;
  aud: string;
}
