'use client';

import { Loader2, Save } from 'lucide-react';
import type { ProfileConfig, SocialLink, WebsiteLink } from '@/types/platform-config';
import { EditableListHeader, Field, IconButton } from './AdminShared';
import { createId } from './utils';

export function ConfigPanel({
  config,
  isSaving,
  onConfigChange,
  onSave,
}: {
  config: ProfileConfig;
  isSaving: boolean;
  onConfigChange: (config: ProfileConfig) => void;
  onSave: () => void;
}) {
  const setProfile = (profile: Partial<ProfileConfig['profile']>) => {
    onConfigChange({
      ...config,
      profile: {
        ...config.profile,
        ...profile,
      },
    });
  };

  const updateSocialLink = (index: number, patch: Partial<SocialLink>) => {
    onConfigChange({
      ...config,
      socialLinks: config.socialLinks.map((link, linkIndex) =>
        linkIndex === index ? { ...link, ...patch } : link,
      ),
    });
  };

  const updateWebsiteLink = (index: number, patch: Partial<WebsiteLink>) => {
    onConfigChange({
      ...config,
      websiteLinks: config.websiteLinks.map((link, linkIndex) =>
        linkIndex === index ? { ...link, ...patch } : link,
      ),
    });
  };

  return (
    <section className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="名称">
          <input
            className="admin-input"
            value={config.profile.name}
            onChange={(event) => setProfile({ name: event.target.value })}
          />
        </Field>
        <Field label="头像路径">
          <input
            className="admin-input"
            value={config.profile.avatar}
            onChange={(event) => setProfile({ avatar: event.target.value })}
          />
        </Field>
        <Field label="简介">
          <input
            className="admin-input"
            value={config.profile.bio}
            onChange={(event) => setProfile({ bio: event.target.value })}
          />
        </Field>
      </div>

      <EditableListHeader
        label="社交链接"
        onAdd={() =>
          onConfigChange({
            ...config,
            socialLinks: [
              ...config.socialLinks,
              { icon: '', id: createId('social'), platform: '', url: '' },
            ],
          })
        }
      />
      <div className="grid gap-4">
        {config.socialLinks.map((link, index) => (
          <div
            key={link.id || index}
            className="grid gap-3 rounded-lg border border-[#121212]/10 p-4 dark:border-white/10"
          >
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_2fr_auto]">
              <input
                className="admin-input"
                placeholder="id"
                value={link.id}
                onChange={(event) =>
                  updateSocialLink(index, { id: event.target.value })
                }
              />
              <input
                className="admin-input"
                placeholder="平台"
                value={link.platform}
                onChange={(event) =>
                  updateSocialLink(index, { platform: event.target.value })
                }
              />
              <input
                className="admin-input"
                placeholder="URL"
                value={link.url}
                onChange={(event) =>
                  updateSocialLink(index, { url: event.target.value })
                }
              />
              <IconButton
                label="删除"
                onClick={() =>
                  onConfigChange({
                    ...config,
                    socialLinks: config.socialLinks.filter(
                      (_, linkIndex) => linkIndex !== index,
                    ),
                  })
                }
              />
            </div>
            <textarea
              className="admin-input min-h-24 resize-y font-mono text-xs"
              placeholder="SVG icon"
              value={link.icon}
              onChange={(event) =>
                updateSocialLink(index, { icon: event.target.value })
              }
            />
          </div>
        ))}
      </div>

      <EditableListHeader
        label="网站链接"
        onAdd={() =>
          onConfigChange({
            ...config,
            websiteLinks: [
              ...config.websiteLinks,
              {
                description: '',
                id: createId('link'),
                title: '',
                url: '',
              },
            ],
          })
        }
      />
      <div className="grid gap-4">
        {config.websiteLinks.map((link, index) => (
          <div
            key={link.id || index}
            className="grid gap-3 rounded-lg border border-[#121212]/10 p-4 dark:border-white/10 md:grid-cols-[1fr_1fr_2fr_2fr_auto]"
          >
            <input
              className="admin-input"
              placeholder="id"
              value={link.id}
              onChange={(event) =>
                updateWebsiteLink(index, { id: event.target.value })
              }
            />
            <input
              className="admin-input"
              placeholder="标题"
              value={link.title}
              onChange={(event) =>
                updateWebsiteLink(index, { title: event.target.value })
              }
            />
            <input
              className="admin-input"
              placeholder="URL"
              value={link.url}
              onChange={(event) =>
                updateWebsiteLink(index, { url: event.target.value })
              }
            />
            <input
              className="admin-input"
              placeholder="描述"
              value={link.description || ''}
              onChange={(event) =>
                updateWebsiteLink(index, { description: event.target.value })
              }
            />
            <IconButton
              label="删除"
              onClick={() =>
                onConfigChange({
                  ...config,
                  websiteLinks: config.websiteLinks.filter(
                    (_, linkIndex) => linkIndex !== index,
                  ),
                })
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="admin-primary-button"
          disabled={isSaving}
          type="button"
          onClick={onSave}
        >
          {isSaving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          保存配置
        </button>
      </div>
    </section>
  );
}
