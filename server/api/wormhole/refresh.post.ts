export default defineEventHandler(async (event: any) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  return await $fetch(`${config.signflowApiBaseUrl}/api/auth/refresh`, {
    method: "POST",
    body: {
      email: body.email,
      refreshToken: body.refreshToken,
    },
  });
});
