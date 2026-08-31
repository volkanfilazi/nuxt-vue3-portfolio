export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);

  return await $fetch("https://api.usesignflow.com/api/auth/refresh", {
    method: "POST",
    body: {
      email: body.email,
      refreshToken: body.refreshToken,
    },
  });
});