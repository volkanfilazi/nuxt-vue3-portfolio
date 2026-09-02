import { jwtDecode } from "jwt-decode";
import { ref, type Ref } from "vue";
import type {
  AuthResponse,
  JwtPayload,
  WormholeLog,
} from "../models/terminal";

type UseWormholeAuthOptions = {
  email: Ref<string>;
  password: Ref<string>;
  onOutput?: () => Promise<void> | void;
};

export function useWormholeAuth({
  email,
  password,
  onOutput,
}: UseWormholeAuthOptions) {
  const isAuthenticated = ref(false);
  const isConnecting = ref(false);
  const wormholeLogs = ref<WormholeLog[]>([]);
  const decodeTokenLogs = ref<JwtPayload | null>(null);
  const lastDecodedToken = ref<string | null>(null);

  async function notifyOutput() {
    await onOutput?.();
  }

  function clearAuthInfos() {
    isAuthenticated.value = false;
    wormholeLogs.value = [];
    decodeTokenLogs.value = null;
    lastDecodedToken.value = null;
  }

  async function connectToSignFlow() {
    clearAuthInfos();
    isConnecting.value = true;

    try {
      const response: AuthResponse = await $fetch("/api/wormhole/login", {
        method: "POST",
        body: {
          email: email.value,
          password: password.value,
        },
      });

      wormholeLogs.value.push({
        type: "success",
        message: "AUTHENTICATION SUCCESSFUL",
        data: response,
      });

      isAuthenticated.value = true;
    } catch (error: any) {
      const message =
        error?.data?.data?.message ??
        error?.data?.message ??
        "AUTHENTICATION FAILED";

      wormholeLogs.value.push({
        type: "error",
        message,
      });

      isAuthenticated.value = false;
    } finally {
      isConnecting.value = false;
      await notifyOutput();
    }
  }

  function decodeToken() {
    const token = wormholeLogs.value.find(
      (log) => log.type === "success" && log.data?.token,
    )?.data?.token;

    if (!token || lastDecodedToken.value === token) {
      return;
    }

    decodeTokenLogs.value = jwtDecode<JwtPayload | null>(token);
    lastDecodedToken.value = token;

    void notifyOutput();
  }

  async function refreshToken() {
    const authLog = [...wormholeLogs.value]
      .reverse()
      .find((log) => log.type === "success" && log.data);

    const authData = authLog?.data;

    if (!authData) {
      return;
    }

    try {
      const response: AuthResponse = await $fetch("/api/wormhole/refresh", {
        method: "POST",
        body: {
          email: authData.email || email.value,
          refreshToken: authData.refreshToken,
        },
      });

      const updatedAuthData: AuthResponse = {
        ...authData,
        ...response,
        email: response.email || authData.email,
        fullName: response.fullName || authData.fullName,
      };

      const index = wormholeLogs.value.findIndex(
        (log) => log.type === "success" && log.data,
      );

      if (index !== -1) {
        wormholeLogs.value[index] = {
          type: "success",
          message: "ACCESS TOKEN REFRESHED",
          data: updatedAuthData,
        };
      }

      decodeTokenLogs.value = null;
      lastDecodedToken.value = null;
    } catch (error) {
      console.log("REFRESH FAILED:", error);
    } finally {
      await notifyOutput();
    }
  }

  return {
    isAuthenticated,
    isConnecting,
    wormholeLogs,
    decodeTokenLogs,
    connectToSignFlow,
    decodeToken,
    refreshToken,
    clearAuthInfos,
  };
}
