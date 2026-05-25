#!/bin/bash

echo "🚀 daenggle-ui 릴리즈 시작"

PKG="packages/daenggle-ui/package.json"

# 현재 버전 확인
CURRENT_VERSION=$(cat $PKG | grep '"version"' | head -1 | awk -F'"' '{print $4}')
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
sed -i '' "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" $PKG
echo "✅ package.json 버전 업데이트 완료"

# CHANGELOG 업데이트 확인
read -p "packages/daenggle-ui/CHANGELOG.md 업데이트 했나요? (y/n): " CHANGELOG_CHECK
if [ "$CHANGELOG_CHECK" != "y" ]; then
  echo "CHANGELOG.md를 먼저 업데이트해주세요."
  sed -i '' "s/\"version\": \"$NEW_VERSION\"/\"version\": \"$CURRENT_VERSION\"/" $PKG
  exit 1
fi

# 빌드
echo "📦 빌드 시작..."
cd packages/daenggle-ui && pnpm build
if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패"
  cd ../..
  sed -i '' "s/\"version\": \"$NEW_VERSION\"/\"version\": \"$CURRENT_VERSION\"/" $PKG
  exit 1
fi
cd ../..
echo "✅ 빌드 완료"

# git 커밋
git add packages/daenggle-ui/package.json packages/daenggle-ui/CHANGELOG.md packages/daenggle-ui/README.md
git commit -m "release: daenggle-ui@$NEW_VERSION"
git push origin develop

echo "✅ develop 푸시 완료"
echo ""
echo "👉 다음 단계: develop → main PR을 생성하세요."
echo "   main에 merge되면 GitHub Actions가 자동으로:"
echo "   - npm publish"
echo "   - git tag daenggle-ui@$NEW_VERSION"
echo "   을 실행합니다."
