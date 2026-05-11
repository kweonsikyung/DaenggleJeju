#!/bin/bash

echo "🚀 web 릴리즈 시작"

# 현재 버전 확인
CURRENT_VERSION=$(cat apps/web/package.json | grep '"version"' | head -1 | awk -F'"' '{print $4}')
echo "현재 버전: $CURRENT_VERSION"

# 버전 타입 선택
echo "버전 타입을 선택하세요:"
echo "1) patch (0.0.x)"
echo "2) minor (0.x.0)"
echo "3) major (x.0.0)"
read -p "선택 (1/2/3): " VERSION_TYPE

case $VERSION_TYPE in
  1) BUMP="patch" ;;
  2) BUMP="minor" ;;
  3) BUMP="major" ;;
  *) echo "잘못된 선택입니다." && exit 1 ;;
esac

# 버전 자동 증가
NEW_VERSION=$(node -e "
  const v = '$CURRENT_VERSION'.split('.');
  if ('$BUMP' === 'patch') v[2] = parseInt(v[2]) + 1;
  if ('$BUMP' === 'minor') { v[1] = parseInt(v[1]) + 1; v[2] = 0; }
  if ('$BUMP' === 'major') { v[0] = parseInt(v[0]) + 1; v[1] = 0; v[2] = 0; }
  console.log(v.join('.'));
")
echo "새 버전: $NEW_VERSION"

# package.json 버전 업데이트
sed -i '' "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" apps/web/package.json
echo "✅ package.json 버전 업데이트 완료"

# CHANGELOG 업데이트 확인
read -p "CHANGELOG.md 업데이트 했나요? (y/n): " CHANGELOG_CHECK
if [ "$CHANGELOG_CHECK" != "y" ]; then
  echo "CHANGELOG.md를 먼저 업데이트해주세요."
  sed -i '' "s/\"version\": \"$NEW_VERSION\"/\"version\": \"$CURRENT_VERSION\"/" apps/web/package.json
  exit 1
fi

# lint 검사
echo "🔍 lint 검사 중..."
pnpm lint
if [ $? -ne 0 ]; then
  echo "❌ lint 실패"
  sed -i '' "s/\"version\": \"$NEW_VERSION\"/\"version\": \"$CURRENT_VERSION\"/" apps/web/package.json
  exit 1
fi
echo "✅ lint 완료"

# 타입 검사
echo "🔍 타입 검사 중..."
pnpm typecheck
if [ $? -ne 0 ]; then
  echo "❌ 타입 검사 실패"
  sed -i '' "s/\"version\": \"$NEW_VERSION\"/\"version\": \"$CURRENT_VERSION\"/" apps/web/package.json
  exit 1
fi
echo "✅ 타입 검사 완료"

# 빌드
echo "📦 빌드 시작..."
pnpm build
if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패"
  sed -i '' "s/\"version\": \"$NEW_VERSION\"/\"version\": \"$CURRENT_VERSION\"/" apps/web/package.json
  exit 1
fi
echo "✅ 빌드 완료"

# git 커밋
git add apps/web/package.json CHANGELOG.md
git commit -m "release: web@$NEW_VERSION"
git push origin develop

# 태그 추가
git tag "web@$NEW_VERSION"
git push origin "web@$NEW_VERSION"

echo "✅ git 푸시 완료"

echo "🎉 릴리즈 완료: web@$NEW_VERSION"
