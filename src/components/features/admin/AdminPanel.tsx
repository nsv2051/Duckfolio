'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  BarChart3,
  Check,
  EyeOff,
  Globe2,
  List,
  Settings2,
} from 'lucide-react';
import type { ProfileConfig } from '@/types/platform-config';
import { AdminNoticeStack } from './AdminNoticeStack';
import { NavButton } from './AdminShared';
import { readAdminResponse } from './admin-api';
import { ConfigPanel } from './ConfigPanel';
import { DashboardPanel } from './DashboardPanel';
import { PostEditorPanel } from './PostEditorPanel';
import { PostsPanel } from './PostsPanel';
import type {
  AdminPostSummary,
  AdminStatus,
  ApiPostResponse,
  ApiPostsResponse,
  ApiStatusResponse,
  PostFormState,
  Tab,
} from './types';
import {
  createEmptyPostForm,
  emptyConfig,
  parseDateTime,
  toDatetimeLocal,
} from './utils';

export function AdminPanel() {
  const [tab, setTab] = useState<Tab>('home');
  const [adminToken, setAdminToken] = useState('');
  const [status, setStatus] = useState<AdminStatus | null>(null);
  const [config, setConfig] = useState<ProfileConfig>(emptyConfig);
  const [message, setMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<AdminPostSummary[]>([]);
  const [post, setPost] = useState(createEmptyPostForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [mutatingPostSlug, setMutatingPostSlug] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('duckfolio-admin-token');

    if (storedToken) {
      setAdminToken(storedToken);
    }

    fetch('/api/admin/status')
      .then((response) =>
        readAdminResponse<ApiStatusResponse>(response, '后台状态读取失败。'),
      )
      .then((data) => {
        setStatus(data.status);
        setConfig(data.config);
      })
      .catch((error) => {
        setMessage(
          error instanceof Error ? error.message : '后台状态读取失败。',
        );
      });
  }, []);

  useEffect(() => {
    window.localStorage.setItem('duckfolio-admin-token', adminToken);
  }, [adminToken]);

  const targetText = useMemo(() => {
    if (!status) {
      return '正在读取发布目标';
    }

    if (status.mode === 'github') {
      return `${status.repo} / ${status.branch}`;
    }

    return '本地配置编辑模式';
  }, [status]);

  const notices = useMemo<ReactNode[]>(() => {
    const nextNotices: ReactNode[] = [];

    if (!status?.hasAdminPassword) {
      nextNotices.push(
        '未检测到 ADMIN_PASSWORD，写入接口会拒绝请求。请在部署平台的环境变量里配置，不要写入仓库。',
      );
    }

    if (!status?.hasGitHubConfig) {
      nextNotices.push(
        '未检测到 GitHub 写入配置，文章发布不会在本地 main 工作区创建 posts 目录。GITHUB_BRANCH 未配置时默认使用 deploy。',
      );
    }

    return nextNotices;
  }, [status?.hasAdminPassword, status?.hasGitHubConfig]);

  const updatePost = (patch: Partial<typeof post>) => {
    setPost((current) => ({
      ...current,
      ...patch,
    }));
  };

  const resetPostForm = useCallback(() => {
    setPost(createEmptyPostForm());
    setEditingSlug(null);
    setEditorKey((current) => current + 1);
    setTab('post');
  }, []);

  const cancelPostEditing = useCallback(() => {
    setPost(createEmptyPostForm());
    setEditingSlug(null);
    setEditorKey((current) => current + 1);
    setTab('posts');
  }, []);

  const loadPosts = useCallback(
    async (options?: { keepMessage?: boolean }) => {
      if (!adminToken) {
        setPosts([]);
        return;
      }

      setIsLoadingPosts(true);
      if (!options?.keepMessage) {
        setMessage('');
      }

      try {
        const response = await fetch('/api/admin/posts', {
          headers: {
            'x-admin-token': adminToken,
          },
        });
        const data = await readAdminResponse<ApiPostsResponse>(
          response,
          '文章列表读取失败。',
        );

        setPosts(data.posts || []);
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : '文章列表读取失败。',
        );
      } finally {
        setIsLoadingPosts(false);
      }
    },
    [adminToken],
  );

  const editPost = async (slug: string) => {
    if (!adminToken) {
      setMessage('请先输入管理员口令。');
      return;
    }

    setMutatingPostSlug(slug);
    setMessage('');

    try {
      const response = await fetch(
        `/api/admin/posts?slug=${encodeURIComponent(slug)}`,
        {
          headers: {
            'x-admin-token': adminToken,
          },
        },
      );
      const data = await readAdminResponse<ApiPostResponse>(
        response,
        '文章读取失败。',
      );

      const detail = data.post;
      const date = parseDateTime(detail.date) ?? new Date();

      setPost({
        content: detail.content,
        date: toDatetimeLocal(date),
        description: detail.description,
        draft: detail.draft,
        slug: detail.slug,
        tags: detail.tags.join(', '),
        title: detail.title,
      });
      setEditingSlug(detail.slug);
      setEditorKey((current) => current + 1);
      setTab('post');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '文章读取失败。');
    } finally {
      setMutatingPostSlug(null);
    }
  };

  const togglePostVisibility = async (targetPost: AdminPostSummary) => {
    if (!adminToken) {
      setMessage('请先输入管理员口令。');
      return;
    }

    const nextDraft = !targetPost.draft;
    setMutatingPostSlug(targetPost.slug);
    setMessage('');

    try {
      const response = await fetch('/api/admin/posts', {
        body: JSON.stringify({
          draft: nextDraft,
          operation: 'visibility',
          slug: targetPost.slug,
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        method: 'PATCH',
      });
      const data = await readAdminResponse<{ message?: string }>(
        response,
        '文章状态更新失败。',
      );

      setPosts((current) =>
        current.map((item) =>
          item.slug === targetPost.slug ? { ...item, draft: nextDraft } : item,
        ),
      );

      if (editingSlug === targetPost.slug) {
        updatePost({ draft: nextDraft });
      }

      setMessage(data.message || '文章状态已更新。');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '文章状态更新失败。');
    } finally {
      setMutatingPostSlug(null);
    }
  };

  const deletePost = async (slug: string) => {
    if (!adminToken) {
      setMessage('请先输入管理员口令。');
      return;
    }

    if (
      !window.confirm(`确认删除 posts/${slug}.md？此操作会提交到目标分支。`)
    ) {
      return;
    }

    setMutatingPostSlug(slug);
    setMessage('');

    try {
      const response = await fetch(
        `/api/admin/posts?slug=${encodeURIComponent(slug)}`,
        {
          headers: {
            'x-admin-token': adminToken,
          },
          method: 'DELETE',
        },
      );
      const data = await readAdminResponse<{ message?: string }>(
        response,
        '文章删除失败。',
      );

      setPosts((current) => current.filter((item) => item.slug !== slug));

      if (editingSlug === slug) {
        resetPostForm();
      }

      setMessage(data.message || '文章已删除。');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '文章删除失败。');
    } finally {
      setMutatingPostSlug(null);
    }
  };

  useEffect(() => {
    if (tab === 'home' || tab === 'posts') {
      void loadPosts();
    }
  }, [loadPosts, tab]);

  const publishPost = async () => {
    setIsPublishing(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/posts', {
        body: JSON.stringify({
          content: post.content,
          date: new Date(post.date || Date.now()).toISOString(),
          description: post.description,
          draft: post.draft,
          originalSlug: editingSlug,
          slug: post.slug,
          tags: post.tags
            .split(/[,，]/)
            .map((tag) => tag.trim())
            .filter(Boolean),
          title: post.title,
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        method: 'POST',
      });
      const data = await readAdminResponse<{
        message?: string;
        result?: {
          mode?: string;
          path?: string;
          repo?: string;
        };
        slug?: string;
      }>(response, '文章发布失败。');

      const targetMessage = data.result
        ? data.result.mode === 'github'
          ? `已推送到 ${data.result.repo}/${data.result.path}`
          : `已写入 ${data.result.path}`
        : '文章已保存。';

      const successMessage = data.message
        ? `${data.message} ${targetMessage}`
        : targetMessage;

      setEditingSlug(data.slug || post.slug);
      updatePost({ slug: data.slug || post.slug });
      setTab('posts');
      setMessage(successMessage);
      await loadPosts({ keepMessage: true });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '文章发布失败。');
    } finally {
      setIsPublishing(false);
    }
  };

  const saveConfig = async () => {
    setIsSavingConfig(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/config', {
        body: JSON.stringify(config),
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        method: 'POST',
      });
      const data = await readAdminResponse<{
        result?: {
          mode?: string;
          path?: string;
          repo?: string;
        };
      }>(response, '配置保存失败。');

      setMessage(
        data.result
          ? data.result.mode === 'github'
            ? `配置已推送到 ${data.result.repo}/${data.result.path}`
            : `配置已写入 ${data.result.path}`
          : '配置已保存。',
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '配置保存失败。');
    } finally {
      setIsSavingConfig(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#121212] dark:bg-black dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-16 pt-6 md:px-8 md:pt-8">
        <header className="flex flex-col gap-4 border-b border-[#121212]/10 pb-6 dark:border-white/10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider text-[#121212]/40 dark:text-white/40">
              Duckfolio Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold">内容管理</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 rounded border border-[#121212]/10 px-3 py-2 text-sm text-[#121212]/60 dark:border-white/10 dark:text-white/60">
              <Globe2 size={16} />
              {targetText}
            </div>
            <label className="flex min-w-0 items-center gap-2 rounded border border-[#121212]/10 px-3 py-2 dark:border-white/10">
              <EyeOff
                size={16}
                className="shrink-0 text-[#121212]/40 dark:text-white/40"
              />
              <input
                className="w-48 bg-transparent text-sm outline-none placeholder:text-[#121212]/30 dark:placeholder:text-white/30"
                placeholder="管理员口令"
                type="password"
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
              />
            </label>
          </div>
        </header>

        <AdminNoticeStack notices={notices} />

        {message && (
          <div className="flex items-center gap-2 rounded-lg border border-[#121212]/10 px-4 py-3 text-sm text-[#121212]/70 dark:border-white/10 dark:text-white/70">
            <Check size={16} />
            {message}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="flex gap-2 lg:flex-col">
            <NavButton
              active={tab === 'home'}
              icon={<BarChart3 size={18} />}
              label="首页"
              onClick={() => setTab('home')}
            />
            <NavButton
              active={tab === 'posts'}
              icon={<List size={18} />}
              label="文章列表"
              onClick={() => setTab('posts')}
            />
            <NavButton
              active={tab === 'config'}
              icon={<Settings2 size={18} />}
              label="站点配置"
              onClick={() => setTab('config')}
            />
          </aside>

          {tab === 'home' ? (
            <DashboardPanel isLoading={isLoadingPosts} posts={posts} />
          ) : tab === 'post' ? (
            <PostEditorPanel
              editorKey={editorKey}
              editingSlug={editingSlug}
              isPublishing={isPublishing}
              post={post}
              onCancel={cancelPostEditing}
              onNewPost={resetPostForm}
              onPostChange={updatePost}
              onPublish={publishPost}
            />
          ) : tab === 'posts' ? (
            <PostsPanel
              isLoading={isLoadingPosts}
              mutatingSlug={mutatingPostSlug}
              posts={posts}
              onDeletePost={deletePost}
              onEditPost={editPost}
              onNewPost={resetPostForm}
              onRefresh={loadPosts}
              onToggleVisibility={togglePostVisibility}
            />
          ) : (
            <ConfigPanel
              config={config}
              isSaving={isSavingConfig}
              onConfigChange={setConfig}
              onSave={saveConfig}
            />
          )}
        </div>
      </div>
    </main>
  );
}
