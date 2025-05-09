import { ProfileConfig } from '@/types/platform-config';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getConfig } from '@/lib/config';

const config = getConfig();

export const useProfileStore = create<ProfileConfig>()(
  persist<ProfileConfig>(
    () => ({
      profile: config.profile,
      socialLinks: config.socialLinks,
      websiteLinks: config.websiteLinks,
    }),
    { name: 'duckfolio-storage' }
  )
);
