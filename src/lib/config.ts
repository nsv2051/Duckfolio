import fs from 'fs';
import path from 'path';
import type { ProfileConfig } from '@/types/platform-config';

const configPath = path.join(process.cwd(), 'public', 'platform-config.json');

const fallbackConfig: ProfileConfig = {
  profile: {
    avatar: '/avatar.png',
    bio: '',
    name: 'Duckfolio',
  },
  socialLinks: [],
  websiteLinks: [],
};

export function getConfig(): ProfileConfig {
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8')) as ProfileConfig;
  } catch {
    return fallbackConfig;
  }
}
