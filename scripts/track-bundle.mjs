/**
 * 번들 사이즈 추적 스크립트
 * ============================
 * - 1. 목적: 번들 사이즈 추적 및 기록
 * - 매 커밋마다 번들 사이즈를 계산하여 기록합니다.
 * - 번들 사이즈의 변화 추이를 시각적으로 확인할 수 있도록 도와줍니다.
 *
 * - 2. 정책: 번들 사이즈 기록
 * - 아래 3가지 항목을 측정하여 기록합니다.
 *   - webChunksDisk : .next/static/chunks 물리 용량 (du -sh)
 *   - webChunksGzip : .next/static/chunks gzip 전송 용량 (size-limit)
 *   - uiDistGzip    : daenggle-ui dist ESM 전체 gzip 합계
 * - 기록은 프로젝트 루트의 `.bundle/bundle-history.json` 파일에 저장됩니다.
 *
 *  - 3. 실행 시점: 수동 실행
 * - `pnpm size` 명령어로 호출합니다.
 * - next build 결과(.next/static/chunks)가 있어야 정확한 값을 기록합니다.
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import zlib from "zlib";

const HISTORY_FILE = ".bundle/bundle-history.json";
const BUNDLE_PATH = "apps/web/.next/static/chunks";
const UI_DIST = "packages/daenggle-ui/dist";

// webChunksDisk: 웹앱 청크 물리 용량
function getWebChunksDisk() {
  const output = execSync(`du -sh ${BUNDLE_PATH}`).toString();
  return output.split("\t")[0].trim();
}

// webChunksGzip: 웹앱 청크 gzip 전송 용량
function getWebChunksGzip() {
  try {
    const jsonOutput = execSync(
      `node_modules/.bin/size-limit --json --config ../../.bundle/.size-limit.json`,
      { cwd: "apps/web", stdio: ["pipe", "pipe", "pipe"] }
    ).toString();
    const data = JSON.parse(jsonOutput);
    const sizeInBytes = data[0].size;
    return `${(sizeInBytes / 1024).toFixed(2)}KB`;
  } catch (e) {
    const stdout = e.stdout?.toString();
    if (stdout) {
      try {
        const data = JSON.parse(stdout);
        const sizeInBytes = data[0].size;
        return `${(sizeInBytes / 1024).toFixed(2)}KB`;
      } catch {}
    }
    return "Error";
  }
}

// uiDistGzip: daenggle-ui dist ESM gzip 합계
// package.json이 ./src/index.ts를 가리키므로 Next.js가 소스를 직접 컴파일함.
// → 빌트 청크에 "daenggle-ui" 문자열이 없어서 grep 방식은 항상 N/A.
// 대신 dist/의 ESM(.mjs) 파일들을 gzip 압축한 총 바이트를 측정함.
function getUiDistGzip() {
  if (!fs.existsSync(UI_DIST)) return "not built";

  const mjsFiles = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".mjs")) mjsFiles.push(full);
    }
  }
  walk(UI_DIST);

  if (!mjsFiles.length) return "not built";

  let totalGzip = 0;
  for (const f of mjsFiles) {
    const buf = fs.readFileSync(f);
    totalGzip += zlib.gzipSync(buf).length;
  }
  return `${(totalGzip / 1024).toFixed(2)}KB`;
}

function getCommitMsg() {
  return execSync("git log -1 --pretty=%B").toString().trim();
}

const currentStats = {
  date: new Date().toISOString(),
  webChunksDisk: getWebChunksDisk(),
  webChunksGzip: getWebChunksGzip(),
  uiDistGzip: getUiDistGzip(),
  commit: getCommitMsg(),
};

let history = [];
if (fs.existsSync(HISTORY_FILE)) {
  const content = fs.readFileSync(HISTORY_FILE, "utf-8").trim();
  if (content) history = JSON.parse(content);
}

history.push(currentStats);
if (history.length > 30) history.shift();

fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

console.log(
  `✅ 기록 완료 | webChunksDisk: ${currentStats.webChunksDisk} | webChunksGzip: ${currentStats.webChunksGzip} | uiDistGzip: ${currentStats.uiDistGzip}`
);
