/**
 * 번들 사이즈 추적 스크립트
 * ============================
 * - 1. 목적: 번들 사이즈 추적 및 기록
 * - 매 커밋마다 번들 사이즈를 계산하여 기록합니다.
 * - 번들 사이즈의 변화 추이를 시각적으로 확인할 수 있도록 도와줍니다.  
 * 
 * - 2. 정책: 번들 사이즈 기록
 * - 번들 사이즈는 gzip 기준으로 계산됩니다.
 * - 기록에는 날짜, 사이즈, 커밋 메시지가 포함됩니다.
 * - 기록은 JSON 파일로 저장되며, 최근 20개까지만 보관합니다.
 * 
 *  - 3. 실행 시점: Git Post-commit Hook    
 * - Husky를 통해 커밋 직후에 실행됩니다.
 * - 스타일 교정(Biome) 이후에 실행되어 최종 커밋본의 번들 사이즈를 기록합니다. 
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const HISTORY_FILE = 'bundle-history.json';
const BUNDLE_PATH = 'apps/web/.next/static/chunks';

// 1. 현재 전체 번들 사이즈 계산 (gzip 기준)
function getBundleSize() {
  const output = execSync(`du -sh ${BUNDLE_PATH}`).toString();
  return output.split('\t')[0];
}

// 2. 현재 Git 커밋 메시지 가져오기 (무엇 때문에 변했는지 알기 위해)
function getCommitMsg() {
  return execSync('git log -1 --pretty=%B').toString().trim();
}

// 3. 기록 업데이트
const currentStats = {
  date: new Date().toISOString(),
  size: getBundleSize(),
  commit: getCommitMsg(),
};

let history = [];
if (fs.existsSync(HISTORY_FILE)) {
  history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
}

history.push(currentStats);

// 최근 30개까지만 보관
if (history.length > 30) history.shift();

fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

console.log(`✅ 번들 기록 완료: ${currentStats.size} (${currentStats.commit})`);