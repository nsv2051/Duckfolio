import profileConfig from '../../public/platform-config.json';

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string;
};

export type WebsiteLink = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type ProfileConfig = typeof profileConfig;

export function getConfig(): ProfileConfig {
  return profileConfig;
}
