export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await $fetch("https://api.usesignflow.com/api/auth/login", {
    method: "POST",
    body: {
      email: body.email,
      password: body.password,
    },
  });
});