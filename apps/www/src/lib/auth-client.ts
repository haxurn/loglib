import { createAuthClient } from "better-auth/react";
import { env } from "env.mjs";

type BAClient = ReturnType<typeof createAuthClient>;

export const authClient = createAuthClient({
  baseUrl: env.BETTER_AUTH_URL,
  fetchOptions: {
    credentials: "include",
  },
})

const { useSession, signOut } = authClient;