/**
 * Starts Next.js dev on a fixed port (3000) and frees the port first on Windows/macOS/Linux.
 * Reduces EADDRINUSE when a stale `next dev` process is still running after edits.
 */
import { spawn } from "node:child_process";
import { execSync } from "node:child_process";

const PORT = Number(process.env.PORT || 3000);

function freePort(port) {
  try {
    if (process.platform === "win32") {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] });
      const pids = new Set();
      for (const line of out.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed.includes("LISTENING")) continue;
        const parts = trimmed.split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && /^\d+$/.test(pid) && pid !== "0") pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        } catch {
          /* already gone */
        }
      }
      return;
    }

    execSync(`lsof -ti tcp:${port} | xargs kill -9 2>/dev/null`, {
      shell: true,
      stdio: "ignore",
    });
  } catch {
    /* port already free */
  }
}

freePort(PORT);
console.log(`Starting dev server at http://localhost:${PORT}`);

const child = spawn("npx", ["next", "dev", "-p", String(PORT)], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, PORT: String(PORT) },
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
