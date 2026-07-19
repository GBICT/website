import { json, createCookieSessionStorage } from '@remix-run/cloudflare';

export async function action({ request, context }) {
  const formData = await request.formData();
  const locale = formData.get('locale') === 'en' ? 'en' : 'nl';

  const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [context.cloudflare.env.SESSION_SECRET || ' '],
      secure: true,
    },
  });

  const session = await getSession(request.headers.get('Cookie'));
  session.set('locale', locale);

  return json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
