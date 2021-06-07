## ✨ 프로젝트 셋업 (해당 프로젝트에서 사용하는 모듈 일괄 설치) ✨
```
npm install
```

## ✨ server 실행 ✨
```
npm run dev
```

## ✨ database 설정 ✨

```
> 최상위폴더 하위 경로에 .env 파일 생성후 아래형식과 같이 환경변수 설정.
```
```
DB_USERNAME = { your_database_username }
DB_PASSWORD = { your_database_password }
DB_DATEBASE = { your_database_name }
DB_HOST = { your_database_host }
SECRET = { your_jwt_token_key }
```

##  깃 커밋 (Commit) 규칙 🧨

 </br>

> "[이모지] <무슨 작업을 했는지 간단명료하게 서술>"

🎨 => 폴더 파일 구조 개선, 코드 포맷 양식 개선 </br>
⚡️ => 성능 향상 </br>
🔥 => 코드나 파일 삭제 </br>
🐛 => 코드 버그 수정 </br>
🚑️ => 위급하게 고쳐야 할 때 </br>
✨ => 새로운 특성 도입 </br>
📝 => (README.md 파일 수정, 추가) </br>
🔀 => 브랜치(branch merge)병합시 </br>
⏪️ => 커밋 되돌리기 </br>
💄 => API desgin, Model design </br>
➕ => 새로운 모듈 도입 </br>
➖ => 모듈 삭제 </br>
🚚 => 파일, 경로 이름 수정시 </br>
🔧 => 구성 파일 수정삭제 </br>
🔨 => 개발 스크립트 수정시(package.json) </br>
🚀 => 프로젝트 배포 </br>
✏️ => 오타 수정 </br>
💬 => 단순 텍스트 입력, 추가 </br>
🍱 => assets 추가나 업데이트시 </br>
 </br>
* 사이트 참조 https://gitmoji.dev/ </br>

깃 푸쉬 (Commit) && 깃 브랜치 머지 (Merge) 규칙 🚀
1. 자신이 작성한 파일을 적당히 커밋한 후에 반드시 "develop-[본인이니셜]" 로 먼저 푸쉬한다.
2. 본인의 브랜치로 먼저 푸쉬하고 그 다음에 develop 브랜치로 pull requeset를 날리면 된다.