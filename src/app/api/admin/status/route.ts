import { getConfig } from '@/lib/config';
import { getAdminStatus } from '@/lib/admin/content';

export const runtime = 'nodejs';

export function GET() {
  return Response.json({
    config: getConfig(),
    status: getAdminStatus(),
  });
}
