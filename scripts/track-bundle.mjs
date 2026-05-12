/**
 * 번들 사이즈 추적 스크립트
 * ============================
 * - 1. 목적: 번들 사이즈 추적 및 기록
 * - 매 커밋마다 번들 사이즈를 계산하여 기록합니다.
 * - 번들 사이즈의 변화 추이를 시각적으로 확인할 수 있도록 도와줍니다.  
 * 
 * - 2. 정책: 번들 사이즈 기록
 * - 번들 사이즈는 disk, gzip 2가지 모두 계산됩니다.
 * - 기록은 프로젝트 루트의 `.bundle/bundle-history.json` 파일에 저장됩니다.
 * - 기록에는 날짜, 사이즈, 커밋 메시지가 포함됩니다.
 * 
 *  - 3. 실행 시점: Git Post-commit Hook    
 * - Husky를 통해 커밋 직후에 실행됩니다.
 * - 스타일 교정(Biome) 이후에 실행되어 최종 커밋본의 번들 사이즈를 기록합니다. 
 */

import fs from 'fs';
import { execSync } from 'child_process';

const HISTORY_FILE = '.bundle/bundle-history.json';
const BUNDLE_PATH = 'apps/web/.next/static/chunks';
const CONFIG_PATH = '.bundle/.size-limit.json';

// 1. 물리적 디스크 용량 (Raw Size)
function getDiskSize() {
  const output = execSync(`du -sh ${BUNDLE_PATH}`).toString();
  return output.split('\t')[0].trim();
}

// 2. 실제 전송 용량 (Gzip Size) - size-limit의 JSON 출력 활용
function getGzipSize() {
  try {
    const jsonOutput = execSync(`pnpm size-limit --json --config ${CONFIG_PATH}`).toString();
    const data = JSON.parse(jsonOutput);
    // bytes 단위를 KB로 변환 (소수점 2자리)
    const sizeInBytes = data[0].size;
    return `${(sizeInBytes / 1024).toFixed(2)}KB`;
  } catch (e) {
    return 'Error';
  }
}

function getCommitMsg() {
  return execSync('git log -1 --pretty=%B').toString().trim();
}

// 두 가지 사이즈 모두 기록
const currentStats = {
  date: new Date().toISOString(),
  diskSize: getDiskSize(),    // 예: 1.4M
  transferSize: getGzipSize(), // 예: 385.21KB (Gzip)
  commit: getCommitMsg(),
};

let history = [];
if (fs.existsSync(HISTORY_FILE)) {
  const content = fs.readFileSync(HISTORY_FILE, 'utf-8').trim();
  if (content) history = JSON.parse(content);
}

history.push(currentStats);
if (history.length > 30) history.shift();

fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

console.log(`✅ 기록 완료 | Disk: ${currentStats.diskSize} | Transfer: ${currentStats.transferSize}`);