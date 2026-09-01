export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  return await $fetch(`${config.signflowApiBaseUrl}/api/auth/login`, {
    method: "POST",
    body: {
      email: body.email,
      password: body.password,
    },
  });
});
