import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getConfig } from '@/lib/config';

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

interface ProfileState {
  avatar: string;
  name: string;
  bio: string;
  socialLinks: SocialLink[];
  websiteLinks: WebsiteLink[];
}

const config = await getConfig();

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      avatar: config.profile.avatar,
      name: config.profile.name,
      bio: config.profile.bio,
      socialLinks: config.socialLinks,
      websiteLinks: config.websiteLinks,
    }),
    { name: 'duckfolio-storage' }
  )
);
