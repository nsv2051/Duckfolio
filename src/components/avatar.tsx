'use client';

import { useProfileStore } from '@/lib/store';
import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from '@/packages/ui/avatar';

export function Avatar() {
  const { avatar, name } = useProfileStore();

  return (
    <UIAvatar className="h-24 w-24">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </UIAvatar>
  );
}