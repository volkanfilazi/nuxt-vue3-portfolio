<script setup lang="ts">
import type { JwtPayload, WormholeLog } from "./models/terminal";

const props = defineProps<{
  wormholeLogs: WormholeLog[];
  isAuthenticated: boolean;
  decodeTokenLogs: JwtPayload | null;
  focusIndex: number;
}>();

const email = defineModel<string>("email");
const password = defineModel<string>("password");

const emailInput = ref<HTMLInputElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);

const decodedClaims = computed(() => {
  if (!props.decodeTokenLogs) {
    return [];
  }

  return [
    {
      key: "subject",
      value: props.decodeTokenLogs.sub,
    },
    {
      key: "email",
      value: props.decodeTokenLogs.email,
    },
    {
      key: "name",
      value: props.decodeTokenLogs.name,
    },
    {
      key: "issuer",
      value: props.decodeTokenLogs.iss,
    },
    {
      key: "audience",
      value: props.decodeTokenLogs.aud,
    },
    {
      key: "expires",
      value: formatUnixDate(props.decodeTokenLogs.exp),
    },
  ].filter((claim) => claim.value);
});

function focusInput(index: number) {
  if (index === 0) {
    emailInput.value?.focus();
    return;
  }

  if (index === 1) {
    passwordInput.value?.focus();
  }
}

function blurInputs() {
  emailInput.value?.blur();
  passwordInput.value?.blur();
}

defineExpose({
  blurInputs,
  focusInput,
});

onMounted(async () => {
  await nextTick();

  if (!props.isAuthenticated) {
    emailInput.value?.focus();
  }
});

const maskToken = (token: string) => {
  if (!token) return "";

  return `${token.slice(0, 20)}...${token.slice(-6)}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

function formatUnixDate(value?: number) {
  if (!value) {
    return "";
  }

  return new Date(value * 1000).toLocaleString();
}
</script>

<template>
  <div class="wormhole-terminal">
    <div class="wormhole-title">
      SIGNFLOW WORMHOLE
    </div>

    <div class="form w-100">

      <!-- LOGIN FORM -->
      <div v-if="!isAuthenticated">

        <!-- EMAIL -->
        <div
          class="form-row"
          :class="{ active: focusIndex === 0 }"
        >
          <label>EMAIL</label>

          <input
            ref="emailInput"
            id="email"
            v-model="email"
            type="email"
            placeholder="enter email..."
            autocomplete="username"
          />
        </div>

        <!-- PASSWORD -->
        <div
          class="form-row"
          :class="{ active: focusIndex === 1 }"
        >
          <label>PASSWORD</label>

          <input
            ref="passwordInput"
            v-model="password"
            type="password"
            placeholder="enter password..."
            autocomplete="current-password"
          />
        </div>

      </div>

      <!-- AUTH LOGS -->
      <div
        v-for="(log, index) in wormholeLogs"
        :key="index"
        class="auth-result"
      >

        <!-- SUCCESS -->
        <div v-if="log.type === 'success'">
          ✓ {{ log.message }}

          <div v-if="log.data">

            <!-- ACCESS TOKEN -->
            <div class="section">
              <div class="label">
                ACCESS TOKEN
              </div>

              <div
                class="d-flex flex-row align-items-center gap-2"
              >
                <span>Access</span>

                <code>
                  {{ maskToken(log.data.token) }}
                </code>
              </div>

              <div
                class="d-flex flex-row align-items-center gap-2"
              >
                <span>User</span>

                <strong>
                  {{ log.data.fullName || log.data.email }}
                </strong>
              </div>

              <div
                class="d-flex flex-row align-items-center gap-2"
              >
                <span>Expires</span>

                <strong>
                  {{ formatDate(log.data.tokenExpiresAtUtc) }}
                </strong>
              </div>
            </div>

            <!-- REFRESH TOKEN -->
            <div class="section">
              <div class="label">
                REFRESH
              </div>

              <div
                class="d-flex flex-row align-items-center gap-2"
              >
                <span>Token</span>

                <code>
                  {{ maskToken(log.data.refreshToken) }}
                </code>
              </div>

              <div
                class="d-flex flex-row align-items-center gap-2"
              >
                <span>Expires</span>

                <strong>
                  {{
                    formatDate(
                      log.data.refreshTokenExpiresAtUtc
                    )
                  }}
                </strong>
              </div>
            </div>

            <!-- DECODED TOKEN -->
            <div v-if="decodeTokenLogs">
              <div class="section">
                <div class="label">
                  DECODED CLAIMS
                </div>

                <div class="claims">
                  <div
                    v-for="claim in decodedClaims"
                    :key="claim.key"
                    class="claim"
                  >
                    <span>{{ claim.key }}</span>
                    <code>{{ claim.value }}</code>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- ERROR -->
        <div v-else>
          ✕ {{ log.message }}

          <pre>{{ log.error }}</pre>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
.form {
  margin-top: 30px;
  width: 420px;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 2px 10px;
}

.form-row label {
  width: 100px;
  color: var(--terminal-muted);
}

.form-row.active {
  background: rgba(140, 255, 176, 0.04);
}

.form-row.active label {
  color: var(--terminal-accent);
}

.form-row input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--terminal-text);
  font-family: inherit;
  font-size: 14px;
}

.form-row input::placeholder {
  color: #3f464c;
}

.auth-result {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #2a3035;
}

.status {
  margin-bottom: 20px;
}

.status span {
  margin-right: 8px;
}

.section {
  margin-bottom: 20px;
}

.label {
  margin-bottom: 8px;
  color: var(--terminal-muted);
  font-size: 12px;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: red;
}

.row span {
  color: var(--terminal-muted);
}

.row strong,
.row code {
  color: var(--terminal-text);
}

.claims {
  display: grid;
  gap: 8px;
}

.claim {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 12px;
  align-items: baseline;
}

.claim span {
  color: var(--terminal-muted);
  font-size: 12px;
}

.claim code {
  overflow-wrap: anywhere;
  color: var(--terminal-text);
  font-size: 12px;
}
</style>
