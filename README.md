> ## 🧪 이 레포는 데모 전용 앱이에요 (nownow-demo)
> 원본: [poohgajoah/NowNow](https://github.com/poohgajoah/NowNow) main에서 복사했어요. 원본과 다른 점은 아래 세 가지뿐이에요.
>
> | | 원래 NowNow 앱 | NowNow 데모 앱 (이 레포) |
> |---|---|---|
> | 보여 줄 것 | 갤럭시워치 → 헬스 커넥트 → **일일 리포트** | 30일 데모 데이터 → **월간 리포트 · 채팅 기억** |
> | 계정 | 실제 계정 | 데모 계정(김대리) |
> | 헬스 커넥트 동기화 | 켜짐 | **꺼짐** (데모 데이터가 덮어써지지 않게) |
> | 앱 ID / 이름 | `com.mibandtest` / NowNow | `com.mibandtest.demo` / NowNow 데모 |
>
> - 앱 ID가 달라서 한 휴대폰에 두 앱을 같이 깔 수 있어요.
> - 동기화를 끈 곳: [`src/services/health/healthSync.ts`](src/services/health/healthSync.ts)의 `DEMO_DISABLE_SYNC`
> - 백엔드는 원본과 같은 서버(같은 Supabase)를 써요. 데모 데이터 넣기/다시 넣기:
>   ```bash
>   cd backend
>   node scripts/seedDemo.js                                   # 미리 보기만
>   node scripts/seedDemo.js --reset --apply --email <데모 계정 이메일>   # 지우고 다시 넣기
>   ```
>   이야기 내용은 [`backend/scripts/demoScenario.js`](backend/scripts/demoScenario.js)에 있어요. 데모 계정 비밀번호는 레포에 적지 않아요.
> - 원본의 새 변경을 받아오기: `git pull upstream main` (upstream = 원본 NowNow)
> - 데모 앱에서도 일일 리포트 화면은 휴대폰 헬스 커넥트를 직접 읽어 보여 줘요. 일일 리포트 시연은 원래 NowNow 앱으로 해 주세요.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8e5bcaf2-8256-46fe-886d-67034465a021" width="140" alt="뿡뿡이" />
</p>

<h1 align="center">NowNow (나우나우)</h1>

<p align="center">
  스마트워치 생체 데이터로 스트레스를 측정하고,<br/>
  나를 기억하는 AI 캐릭터 <b>뿡뿡이</b>와 대화하며 관리하는 웰니스 케어 앱
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.85-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Kotlin-7F52FF?logo=kotlin&logoColor=white" />
  <img src="https://img.shields.io/badge/Health_Connect-4285F4?logo=android&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/pgvector-336791?logo=postgresql&logoColor=white" />
</p>

<p align="center">
  4인 팀 프로젝트 · 앱(React Native) · 백엔드(Node.js) · AI 서버(Cloudflare Worker)를 한 레포에서 관리해요
</p>

<!-- 📸 스크린샷: docs/ 폴더에 이미지를 넣고 경로를 바꿔 주세요
| 홈 | 채팅 | 실시간 리포트 | 주간 리포트 | 내 설정 |
|---|---|---|---|---|
| <img src="docs/home.jpg" width="160"/> | <img src="docs/chat.jpg" width="160"/> | <img src="docs/report-daily.jpg" width="160"/> | <img src="docs/report-weekly.jpg" width="160"/> | <img src="docs/mypage.jpg" width="160"/> |
-->

---

## 📑 목차

- [기획 배경](#-기획-배경)
- [주요 기능](#-주요-기능)
- [시스템 구성](#️-시스템-구성)
- [실행 방법](#-실행-방법)
- [Health Connect 연동](#-삼성헬스--health-connect-연동)
- [혈압계 연동](#-혈압계-연동)
- [폴더 구조](#-폴더-구조)
- [팀 구성](#-팀-구성)
- [앞으로 해볼 것](#-앞으로-해볼-것)

## 💡 기획 배경

- 스트레스를 받아도 **38.1%는 별다른 대처 없이 혼자 참는다**고 답했어요. (서울대 보건대학원 조사, 1,500명 대상)
- 국내 우울증 환자는 2024년 약 110만 명으로 5년 새 33% 늘었지만, 스트레스 인지율은 오히려 줄었어요. 스트레스를 **알아차리지 못하고 방치**하는 경우가 많다는 뜻이에요.
- 삼성헬스, Welltory 같은 기존 서비스는 측정값을 보여주는 데서 끝나요.

NowNow는 **항상 차고 있는 스마트워치**로 스트레스를 꾸준히 측정하고, 그 데이터를 아는 **AI 캐릭터와의 대화**로 정서적 케어까지 이어지게 만든 앱이에요.

## ✨ 주요 기능

### 🏠 홈 — 뿡뿡이 돌보기
- 캐릭터 방 위쪽의 **밥주기 · 놀이 · 음악 · 휴식** 아이콘을 누르면, 아이콘 바로 아래에 오늘의 선택지 3개가 떠요. 선택지는 날마다 바뀌어요.
- 고르면 뿡뿡이가 기뻐하고, 고른 결과는 **취향으로 저장**돼 챗봇 답변에 쓰여요. 오늘 아직 안 한 행동에는 `!` 표시가 떠요.
- **음악**은 오늘의 장르마다 대표곡을 **앨범 자켓**으로 보여 줘요. 누르면 그 곡이 바로 재생 대기 상태로 열리고, 유튜브 뮤직으로도 열 수 있어요.
- **밥주기**를 고르면 배달앱(배민·쿠팡이츠)으로 바로 갈 수 있어요.

### 💬 채팅 — 나를 기억하는 뿡뿡이
- 건강 기록, 과거 대화 요약(임베딩 의미 검색), 취향·별명을 합쳐 다정한 반말로 답해요.
- 대화에 맞춰 **할 일을 버튼으로 제안**해요. 명상·스트레칭 영상, 음식·배달앱, 음악, 영화(CGV·메가박스) 등이에요.
- **오늘의 건강기록♡** 버튼으로 내 건강 데이터를 바탕으로 상담받을 수 있어요.
- 하루를 정리하면 스트레스 원인 **키워드**를 자동으로 분류해요. 키워드는 직접 추가할 수도 있어요.
- 위험한 수치나 표현을 감지하면 전문 도움을 안내하는 **안전 가드레일**이 있어요. ([`shared/careSafety.js`](shared/careSafety.js))

### 📊 리포트
- **실시간 리포트**: 오늘의 걸음 수, 심박수, 수면, 혈압, 혈중산소와 시간대별 스트레스(최고·최저 시간과 점수)
- **주간 리포트**: 7일간 건강·대화 데이터로 본 스트레스 변화와 원인 키워드 집계
- 최근 기록과 원인 키워드를 바탕으로 **AI 추천**을 보여 줘요. 서버에 연결할 수 없으면 기본 추천을 보여 줘요.
- 혈압은 직접 입력하거나, 오므론 혈압계 기록을 가져올 수 있어요. ([혈압계 연동](#-혈압계-연동))

### 📈 스트레스 지수
- 심박수와 pseudo-HRV로 시간대별 스트레스를 계산하고, 수면·걸음 수·혈압·혈중산소를 반영해 **100점 만점 일일 스트레스 지수**를 내요.
- 서버가 **매일 새벽 3시(KST)** 전날 점수를 계산해 저장해요. 서버가 꺼져 있던 날은 켜질 때 채워 넣어요. ([`dailyStressScheduler.js`](backend/jobs/dailyStressScheduler.js))
- 내 설정에서 **스트레스 감지 기준**을 나에게 맞게 바꿀 수 있어요.

### ⚙️ 내 설정
- 계정(별명·성별·나이), MBTI와 활동·음식·음악 취향
- 알림: 하루 마무리 · 날씨 · 놀자(평일/주말/매일) · 안부 알림. 폰에서 직접 예약해요.
- 라이트/다크 모드, 건강 데이터 권한·앱 권한 관리, 혈압계 연결

## 🏗️ 시스템 구성

```
 Galaxy Watch      오므론 혈압계
     │                 │
     ▼                 ▼
 Samsung Health    OMRON connect
     └──────┬──────────┘
            ▼
     Health Connect ──▶ HealthConnectModule.kt (Kotlin, RN Bridge)
                                   │
                     ┌─────────────▼──────────────┐
                     │     React Native 앱 (src/)   │
                     └─────────────┬──────────────┘
                                   │ Supabase 로그인 토큰
                                   ▼
                     Node.js / Express 백엔드 (backend/)
          (인증 · 건강 · 채팅 · 리포트 · 스트레스 · 캐릭터 · 음악 API)
              │                   │                    │
              │ AI_RELAY          │ 임베딩              │
              ▼                   ▼                    ▼
   AI 서버 (chatbot-server/)   OpenAI Embeddings     Supabase PostgreSQL
   Cloudflare Worker ──▶       (text-embedding-      + pgvector
   OpenAI gpt-4o-mini          3-small, 1536차원)    (사용자 · 건강 기록 · 채팅
   (챗봇 답변 · 리포트 추천)                           요약 · 리포트 · 임베딩)
```

- 앱은 LLM이나 DB를 직접 부르지 않아요. 모든 요청은 로그인 토큰과 함께 **백엔드**로 가고, 서버가 토큰으로 사용자를 확인해요.
- **챗봇 답변 · 리포트 AI 추천**: 백엔드가 건강 기록 · 대화 기억 · 취향을 모아 AI 서버의 `/chat`으로 중계하고, AI 서버가 OpenAI를 호출해요. ([`chatRelayService.js`](backend/services/chatRelayService.js), [`chatbot-server/worker.mjs`](chatbot-server/worker.mjs))
- **대화 기억 검색**: 최근 30일 채팅 요약을 벡터로 만들어 `memory_embeddings`에 저장하고, 질문과 가까운 요약 3개를 찾아 챗봇에 넘겨요. ([`chatMemorySearch.js`](backend/services/chatMemorySearch.js)) `OPENAI_API_KEY`가 없으면 이 단계는 건너뛰어요.
- **음악 추천**: 백엔드가 YouTube Data API v3로 장르별 곡을 찾아요.
- AI 서버 주소 · 토큰, OpenAI · YouTube 키는 백엔드 `.env`에만 두고 앱에는 넣지 않아요.


## 🧩 백엔드

Node.js 22 + Express 5 서버예요. Supabase(PostgreSQL · Auth)를 DB로 쓰고, AI 답변은 AI 서버(Cloudflare Worker)로 중계해요.

### 핵심 동작
- **인증**: `Authorization: Bearer <Supabase access_token>`을 [`requireUser`](backend/middleware/requireUser.js)가 확인해요. 요청 body나 query에 담긴 `user_id`는 믿지 않고 토큰의 사용자만 써요. (`/api/auth`의 로그인·회원가입만 토큰 없이 열려 있어요.)
- **채팅 답변 흐름**: 건강 기록 조회 → 대화 기억 검색 → 취향·대화 이력 정리 → AI 서버 중계 순서로 처리해요. 위험한 수치나 표현은 안전 가드레일([`shared/careSafety.js`](shared/careSafety.js))이 먼저 걸러요. ([`chatController.js`](backend/controllers/chatController.js))
- **대화 기억**: 하루 요약을 저장하면 바로 임베딩(`text-embedding-3-small`, 1536차원)해서 `memory_embeddings`에 넣고, 질문과 가까운 요약 최대 3개를 찾아 챗봇에 넘겨요. `OPENAI_API_KEY`가 없으면 이 단계는 건너뛰어요. ([`chatMemorySearch.js`](backend/services/chatMemorySearch.js))
- **스트레스 계산**: DB 없이 계산만 하는 순수 함수예요. ([`stressCalculator.js`](backend/services/stressCalculator.js))
  ```
  RealtimeStress        = 0.6 × HRScore + 0.4 × PHRVScore            (1시간 단위)
  DailyRealtimeStress   = 0.5 × 평균 + 0.3 × 고스트레스 비율 + 0.2 × 최댓값
  DailyStress           = 0.8 × DailyRealtimeStress + 0.1 × BPScore + 0.1 × StepScore
  FinalDailyStressScore = DailyStress × SleepFactor                   (최대 100)
  ```
  - 한 시간에 심박수 샘플이 3개 이상 있어야 계산해요. 70점 이상은 고스트레스로 세요.
  - 수면 기록이 워치와 폰에서 겹치면 겹친 구간은 한 번만 세요.
- **캐릭터 레벨**: 하루(KST)에 종류마다 한 번씩만 경험치를 줘요. 채팅 50, 밥주기 30, 음악 30, 놀이 10, 휴식 10이고, Lv.N → N+1에는 `N × 100`이 필요해요. ([`characterLevel.js`](backend/services/characterLevel.js))
- **음악 추천**: YouTube Data API v3로 공식 음원을 골라요. 하루 검색 한도 때문에 오늘 고른 곡은 메모리에 캐시해 재사용해요(서버를 다시 켜면 비워져요). ([`musicService.js`](backend/services/musicService.js))
- **오늘의 안부**: 최근 14일 점수의 평균보다 오늘(없으면 어제) 점수가 5점 이상 높으면 채팅 화면에서 안부를 건네요. ([`personalHealthCheck.js`](backend/services/personalHealthCheck.js))

### API 엔드포인트

| 경로 | 메서드 | 하는 일 |
|---|---|---|
| `/api/auth/signup` · `/login` | POST | 회원가입 · 로그인 |
| `/api/auth/me` | GET · PATCH | 내 정보 조회 · 수정 |
| `/api/me/profile` | POST | 프로필 생성 확인 |
| `/api/me/settings` | GET · PUT | 설정(스트레스 감지 기준, 알림 등) |
| `/api/me/push-tokens` | POST · DELETE `/:token` | 푸시 토큰 저장 · 삭제 |
| `/api/me` | DELETE | 계정 삭제 |
| `/api/health/records` | POST | Health Connect 기록 증분 저장 (심박수 · 혈압 · 산소 · 걸음 수 · 수면 · 삭제분) |
| `/api/health/blood-pressure` · `/today-activity` | GET | 오늘의 혈압 · 활동량 |
| `/api/chat/reply` | POST | AI 답변 중계 |
| `/api/chat/messages` | POST · GET · DELETE `/:chat_id` | 대화 저장 · 조회 · 삭제 |
| `/api/chat/summary` | POST · GET | 하루 요약 저장(키워드 포함, 최대 10개) · 조회 |
| `/api/chat/check-in` | GET | 오늘의 안부 확인 |
| `/api/reports` | POST · GET | 리포트 저장 · 목록 |
| `/api/reports/:health_record_id` | GET · DELETE | 리포트 상세 · 삭제 |
| `/api/reports/weekly` · `/weekly/:weekStart` | GET | 주간 리포트 목록 · 상세 |
| `/api/reports/monthly/:month` | GET | 월간 리포트 |
| `/api/reports/stress-causes` · `/stress-analysis` | GET | 스트레스 원인 집계 · 분석 |
| `/api/reports/recommendation` · `/ai-recommendation` | GET · POST | 추천 조회 · AI 추천 생성 |
| `/api/stress/realtime` · `/daily` | GET | 시간대별 · 일일 스트레스 점수 (`?date=`) |
| `/api/moods/:date` | GET · PUT | 하루 기분 조회 · 기록 |
| `/api/character/interactions` | POST · GET | 캐릭터 행동 저장 · 조회 |
| `/api/character/level` | GET | 레벨 · 경험치 |
| `/api/music/recommendation` | GET | 장르별 오늘의 곡 (`?choice=`) |

### 스케줄러 · 스크립트

| 파일 | 하는 일 |
|---|---|
| [`jobs/dailyStressScheduler.js`](backend/jobs/dailyStressScheduler.js) | 서버가 켜져 있는 동안 **매일 03:00(KST)** 어제 점수를 계산해 저장해요. 서버를 켤 때는 최근 3일을 한 번 보충 계산해요. 같은 날을 다시 계산해도 덮어쓰기라 안전해요. |
| `scripts/dailyStressBatch.js` | 놓친 날을 수동으로 계산해요. `node scripts/dailyStressBatch.js [YYYY-MM-DD]` (날짜를 비우면 어제) |
| `scripts/seedDemo.js` | 데모 계정에 30일치 건강 기록 · 채팅을 넣고 지워요. 이야기 내용은 `demoScenario.js`에 있어요. |

- 선택 환경변수: `STRESS_BATCH_DISABLED=true`(예약 끄기), `STRESS_BATCH_CATCHUP_DAYS`(시작 때 보충할 날 수, 기본 3, 0이면 안 함)
- 스케줄러는 `SUPABASE_SERVICE_ROLE_KEY`가 없으면 예약하지 않아요.

### DB 마이그레이션

[`backend/db/migrations/`](backend/db/migrations)의 SQL을 날짜 순서대로 Supabase SQL Editor에서 실행해요.

| 파일 | 내용 |
|---|---|
| `20261027_missing_tables.sql` | `sleep_records` · `daily_stress_scores` · `daily_moods` · `character_interactions` · `push_tokens` 등 생성, RLS 활성화 |
| `20261027_health_raw_policies.sql` | 건강 기록 raw 테이블 접근 정책 |
| `20261105_chat_summary_vector_search.sql` | 대화 요약 의미 검색 함수 `match_nownow_chat_memories` |
| `20261111_health_sync_source.sql` | 증분 동기화용 출처(`source_record_id`) 컬럼 · 인덱스 |
| `20261117_chat_messages_created_at_default.sql` | 채팅 메시지 시각 기본값 |
| `20261118_memory_search_tuning.sql` | 대화 기억 검색 조정 |

### 폴더 구조

```
backend/
├─ server.js          # 진입점 · 라우터 등록 · 스케줄러 시작
├─ config/            # Supabase 클라이언트
├─ middleware/        # requireUser (토큰 확인)
├─ routes/            # 경로 → 컨트롤러 연결
├─ controllers/       # 요청 검증 · 응답
├─ services/          # 비즈니스 로직 (스트레스 계산 · 대화 기억 · AI 중계 · 리포트 등)
├─ utils/             # KST 날짜 · 채팅 이력 · 음악 검색 · 건강 기록 파싱
├─ jobs/              # 매일 새벽 스트레스 계산 예약
├─ scripts/           # 수동 계산 · 데모 데이터
├─ db/migrations/     # Supabase SQL
└─ tests/             # node --test 자동 테스트 (17개 파일)
```

## 🚀 실행 방법

### 1. 백엔드

```sh
cd backend
cp .env.example .env   # 값 채우기 (아래 표)
npm install
npm start              # http://localhost:5000
npm test               # 자동 테스트
```

| `.env` 값 | 용도 |
|---|---|
| `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | DB · 로그인 (service role 키는 절대 커밋 금지) |
| `AI_RELAY_URL`, `AI_RELAY_TOKEN` | AI 서버 주소와 토큰 |
| `OPENAI_API_KEY` | (선택) 대화 기억 의미 검색 |
| `YOUTUBE_API_KEY` | 홈 음악 추천곡 |

### 2. 앱 (Android)

```sh
npm install
npm start              # Metro (개발 서버)
npm run android        # 다른 터미널에서 빌드 · 설치
```

- **에뮬레이터**는 PC의 `localhost:5000`을 `10.0.2.2`로 자동 접속해요. Health Connect를 못 읽으면 개발 빌드에서는 **목업 건강 데이터**가 나와요.
- **USB로 연결한 실기기**는 PC 서버에 닿도록 포트를 연결해 줘요.
  ```sh
  adb reverse tcp:8081 tcp:8081   # Metro
  adb reverse tcp:5000 tcp:5000   # 백엔드
  ```
- Windows에서 `npm run android`가 `'gradlew.bat' is not recognized`로 실패하면, `android` 폴더에서 직접 빌드해요.
  ```sh
  cd android && gradlew.bat app:installDebug
  ```
- 실제 건강 데이터는 **Android + Health Connect** 기기에서만 나와요. 설정 방법은 [실기기 연동 설정](#실기기-연동-설정-갤럭시워치-기준)을 참고하세요.

### 3. AI 서버 (Cloudflare Worker)

```sh
cd chatbot-server
node --test                              # 테스트
npx wrangler secret put OPENAI_API_KEY   # OpenAI 키
npx wrangler secret put DEMO_TOKEN       # 백엔드 AI_RELAY_TOKEN과 같은 값
npx wrangler deploy
```

배포한 주소를 백엔드 `.env`의 `AI_RELAY_URL`에 넣어요. 키와 토큰은 Cloudflare 비밀값으로만 두고 코드에는 넣지 않아요.

## ⌚ 삼성헬스 · Health Connect 연동

### 왜 Health Connect인가
- 처음에는 **삼성헬스 SDK**로 갤럭시워치 데이터를 바로 읽으려고 했어요. 그런데 삼성헬스 SDK는 **파트너 승인**이 필요했고, 프로젝트 기간 안에 승인이 나지 않았어요.
- 그래서 구글과 삼성이 함께 만든 Android 건강 데이터 플랫폼인 **Health Connect**를 쓰기로 했어요. 삼성헬스가 Health Connect로 데이터를 동기화해 주기 때문에, 앱은 **Health Connect만 읽으면** 돼요.
- 덕분에 앱이 특정 기기에 묶이지 않아요. 오므론 혈압계, Fitbit 등 Health Connect에 데이터를 쓰는 다른 기기도 같은 코드로 읽혀요.

### 데이터 흐름

```
 Galaxy Watch ──(블루투스)──▶ Samsung Health ──(동기화)──▶ Health Connect
                                                              │
                                  HealthConnectModule (Kotlin · Coroutine IO · Promise)
                                       │                              │
                           getHealthData() · 화면 표시     syncHealthData() · 증분 동기화
                                       ▼                              ▼
                              리포트 카드 · 차트          POST /api/health/records → Supabase
```

### 읽는 데이터

| 데이터 | Health Connect 레코드 | 권한 | 화면 표시 범위 |
|---|---|---|---|
| 걸음 수 | `StepsRecord` (`COUNT_TOTAL` 집계) | `READ_STEPS` | 오늘 0시 ~ 지금 |
| 심박수 | `HeartRateRecord` | `READ_HEART_RATE` | 오늘 0시 ~ 지금 |
| 산소포화도 | `OxygenSaturationRecord` | `READ_OXYGEN_SATURATION` | 오늘 0시 ~ 지금 |
| 혈압 | `BloodPressureRecord` | `READ_BLOOD_PRESSURE` | 오늘 0시 ~ 지금 |
| 수면 | `SleepSessionRecord` | `READ_SLEEP` | 최근 24시간 |

- 시간 값은 모두 ISO-8601 문자열이에요. 혈압에는 기록한 앱(`sourcePackage`)도 같이 넘겨요.
- 심박수는 레코드 하나에 샘플이 여러 개라 모두 펼친 뒤 가장 늦은 값을 최신값으로 써요.
- 수면은 자정을 넘기므로 **최근 24시간** 기준으로 읽어요.

### 저장 — 증분 동기화

앱은 [`healthSync.ts`](src/services/health/healthSync.ts)로 기록을 백엔드 `POST /api/health/records`에 보내요. 앱은 DB에 직접 쓰지 않아요.

- **언제**: 앱을 켜거나 다시 볼 때(5분 간격), 리포트의 새로고침 버튼
- **무엇을**: Health Connect **Changes API**로 마지막 동기화 뒤에 추가 · 수정 · 삭제된 기록만 읽어요. 첫 동기화는 최근 30일을 읽어요.
- **실패해도 안 빠짐**: 서버 저장이 모두 성공했을 때만 동기화 위치를 저장해요. 실패하면 다음에 같은 변경분부터 다시 보내요.
- **수정 · 삭제 반영**: Health Connect 레코드 id와 기록한 앱을 같이 저장해서, 바뀐 기록은 고치고 지워진 기록은 서버에서도 지워요.
- **걸음 수**: 폰과 워치 기록이 겹치므로 Health Connect 집계(중복 제거)를 시간별로 보내요.
- 잘못 잰 값 하나 때문에 동기화가 멈추지 않도록 이상한 행만 건너뛰어요.

| 요청 키 | 테이블 | 중복 기준 |
|---|---|---|
| `heart_rate` | `heart_rate_records` | `user_id, measured_at` |
| `blood_pressure` | `blood_pressure_records` | `user_id, measured_at` |
| `oxygen` | `oxygen_records` | `user_id, measured_at` |
| `steps` + `steps_replace` | `steps_records` (시간별) | 구간 교체 |
| `sleep` | `sleep_records` | `user_id, start_time, end_time` |
| `deleted` | 위 테이블 중 출처 컬럼이 있는 4개 | `source_record_id` |

- 혈압은 자동 동기화에서 빼고, **직접 입력 · 블루투스 수신 값만 서버에 저장**해요. Health Connect 혈압은 리포트 화면에만 합쳐서 보여 줘요.
- `user_id`는 앱이 보내지 않아요. 서버가 로그인 토큰으로 정해요.

### 네이티브 모듈 구성

| 파일 | 역할 |
|---|---|
| [`HealthConnectModule.kt`](android/app/src/main/java/com/mibandtest/HealthConnectModule.kt) | `getHealthData()` · `syncHealthData()`. IO 코루틴에서 읽고 Promise로 돌려줘요. |
| [`HealthConnectPackage.kt`](android/app/src/main/java/com/mibandtest/HealthConnectPackage.kt) | 모듈을 `ReactPackage`로 묶어 등록해요. |
| [`AndroidManifest.xml`](android/app/src/main/AndroidManifest.xml) | 건강 데이터 읽기 · 블루투스 · 알림 권한, Health Connect 권한 화면용 activity-alias |
| [`mockHealthData.ts`](src/services/health/mockHealthData.ts) | 에뮬레이터 등 개발 환경용 목업 데이터 (서버에 저장하지 않음, 릴리스 빌드에선 안 씀) |

### 실기기 연동 설정 (갤럭시워치 기준)

1. **Health Connect 확인**: Android 14 이상은 시스템에 내장돼 있어요. Android 13 이하는 Play 스토어에서 설치해요.
2. **워치 ↔ 삼성헬스 연결**: Galaxy Wearable 앱으로 페어링하고, 삼성헬스에 데이터가 들어오는지 확인해요.
3. **삼성헬스 → Health Connect 쓰기 허용**: 삼성헬스 → 설정 → Health Connect에서 걸음 수 · 심박수 · 혈중 산소 · 혈압 · 수면을 허용해요.
4. **NowNow 읽기 허용**: Health Connect → 앱 권한 → NowNow에서 5가지 읽기를 모두 허용해요.
5. 앱의 **리포트**를 열면 데이터가 표시돼요. Logcat의 `HEALTH_DATA` / `HEALTH_ERROR` 태그로 값과 오류를 볼 수 있어요.

> 갤럭시워치 혈압은 **Samsung Health Monitor 앱**에서 커프 혈압계로 보정한 뒤에 측정할 수 있어요.

### 주의할 점 · 한계
- 동기화는 앱이 켜져 있을 때만 돌아요. 기록이 빠지지는 않지만 서버에 늦게 들어가요. 백그라운드 동기화는 [설계 문서](docs/background-sync-design.md)만 있어요.
- 삼성헬스 → Health Connect 동기화는 실시간이 아니라서, 방금 잰 값이 늦게 보일 수 있어요.
- 갤럭시워치의 **ECG 원시 데이터와 HRV(RR 간격)는 Health Connect로 넘어오지 않아요.** 그래서 심박수 표준편차 기반 pseudo-HRV로 계산해요.
- Health Connect는 Android 전용이에요. iOS에서는 건강 데이터가 표시되지 않아요.

## 🩺 혈압계 연동

| 경로 | 방법 | 상태 |
|---|---|---|
| **오므론 혈압계** (HEM-7142T2) | 혈압계 → OMRON connect 앱 → Health Connect → NowNow 리포트 | ✅ S24에서 값 일치 확인 |
| **블루투스 직접 수신** | 내 설정 → 혈압계 연결 → 검색 시작. 표준 혈압 서비스(BLE `0x1810`)로 측정값을 받아 저장 | 🧪 실기기 검증 필요 |
| **갤럭시워치** | Samsung Health Monitor에서 측정 → Health Connect | ✅ |
| **직접 입력** | 리포트 혈압 카드에서 수축기 · 이완기 입력 | ✅ |

- 블루투스 직접 수신 코드: [`bloodPressureBluetooth.ts`](src/services/bloodPressureBluetooth.ts) (Android 12 이상)
- 조사 내용과 확인 순서: [`docs/omron-hem-7142t2-integration.md`](docs/omron-hem-7142t2-integration.md)

## 📁 폴더 구조

```
src/
├─ navigation/       # 로그인 분기 · 하단 탭 (홈 · 채팅 · 리포트 · 내 설정)
├─ screens/          # 화면별 폴더 (컴포넌트 · 훅 · 상수 · 타입을 화면 안에 둠)
│   ├─ Home/ Chat/ Report/ Profile/ Login/
├─ services/
│   ├─ api/          # 백엔드 API 호출
│   ├─ health/       # Health Connect 동기화 · 목업
│   ├─ notifications/# 폰에서 예약하는 알림
│   ├─ delivery/     # 배달앱 열기
│   └─ bloodPressureBluetooth.ts
├─ theme/            # 라이트/다크 테마, 색 · 간격
└─ assets/
android/app/src/main/java/com/mibandtest/
└─ HealthConnectModule.kt, HealthConnectPackage.kt
backend/             # Node.js / Express 서버 (routes · services · jobs · db/migrations · tests)
chatbot-server/      # AI 서버 (Cloudflare Worker → OpenAI)
shared/              # 앱 · 서버가 같이 쓰는 코드 (안전 가드레일, 건강 기록 검색)
docs/                # API 명세, 설계 · 연동 문서
```

## 👥 팀 구성

| 팀원 | 맡은 부분 |
|---|---|
| [@poohgajoah](https://github.com/poohgajoah) | 건강 데이터 · 백엔드 · 홈 화면 |
| [@letsggong03](https://github.com/letsggong03) | 챗봇 대화 · 리포트 · 내 설정 · 혈압계 |
| [@h2st0ry](https://github.com/h2st0ry) | ERD 설계 · 초기 화면 UI/UX · 3D 캐릭터 |
<!-- TODO: 4번째 팀원 줄 추가 → | [@아이디](https://github.com/아이디) | 맡은 부분 | -->

### [@poohgajoah](https://github.com/poohgajoah)
- **Health Connect 네이티브 모듈 (Kotlin)**: 삼성헬스 SDK 승인이 기간 안에 나지 않아 Health Connect로 바꾸고, 걸음 수 · 심박수 · 산소포화도 · 혈압 · 수면을 읽는 모듈을 만들어 React Native Bridge로 연결했어요. 갤럭시워치를 직접 차고 테스트했어요.
- **증분 동기화**: Changes API로 바뀐 기록만 서버에 보내고, 저장에 성공했을 때만 위치를 갱신해 기록이 빠지지 않게 했어요.
- **스트레스 지수**: HRV 논문을 바탕으로 점수 기준을 정하고, 심박수 표준편차 기반 pseudo-HRV와 100점 만점 `FinalDailyStressScore` 공식을 만들었어요. 매일 새벽 3시 자동 계산도 붙였어요.
- **DB 구현 (Supabase)**: ERD를 Supabase에 맞게 반영하고, 건강 기록 raw 테이블과 임베딩용 pgvector 컬럼을 설계했어요.
- **백엔드 · AI 서버**: 앱 데이터가 모두 로그인 확인을 거쳐 백엔드로 가도록 바꾸고, AI 서버(Cloudflare Worker) 중계와 대화 기억 검색을 연결했어요.
- **홈 화면 · 캐릭터**: 게임처럼 뿡뿡이를 돌보는 홈(행동 아이콘 줄, 오늘의 선택지, 음악 앨범 자켓)과 새 앱 아이콘을 만들었어요. 새 캐릭터 애니메이션도 넣었어요. 돌봐 주면 웃고, 오래 안 오거나 대화가 없거나 스트레스 · 수면이 나쁘면 시들면서 걱정하는 말풍선이 떠요. 돌봐 주거나 대화하면 다시 살아나요. 홈 우체통으로 지난달 스트레스 리포트를 뿡뿡이 말투의 편지로 받게 했어요.
- **시연용 데모 환경 구축 및 시연 준비**: 이 데모 레포를 따로 만들고 데모 계정 '김대리'의 30일 건강 기록과 대화 시나리오를 넣었어요. 데모 앱은 걸음 수 · 수면 · 심박 동기화를 막고, 시연 중 블루투스 혈압계로 잰 혈압만 서버로 보내요. 노트북 핫스팟으로 접속하는 시연용 빌드를 만들고 시연 가이드 · 영상 · 발표 캡처도 준비했어요.
- 로그인 · 회원가입과 세션 유지, 리포트 실시간 · 주간 구성(주간은 걸음 수 · 수면 지난주 비교와 목표선, 스트레스 키워드별 요일 표시), Android 빌드 오류 해결, 시스템 구성도 작성

### [@letsggong03](https://github.com/letsggong03)
- **뿡뿡이 대화**: 다정한 말투, 대화에 맞는 할 일 제안(영상 · 음식 · 배달앱 · 음악 · 영화), 오늘의 건강기록 상담
- **감정일기와 키워드**: 하루 정리에서 스트레스 원인 키워드 자동 분류 · 직접 추가, 리포트 집계 반영
- **안전 가드레일**: 위험한 수치나 표현을 감지해 도움을 안내 ([`shared/careSafety.js`](shared/careSafety.js))
- **리포트**: 걸음 수 · 수면 그래프, AI 추천과 기본 추천, 실시간 스트레스 분석, 혈압 직접 입력
- **내 설정**: 계정 · 별명 · 취향, 알림(하루 마무리 · 날씨 · 놀자 · 안부), 권한 관리
- **오므론 혈압계 연동**: Health Connect 혈압 표시, 블루투스 직접 수신 코드

### [@h2st0ry](https://github.com/h2st0ry)
- **ERD 설계**: 사용자 · 건강 · 채팅 · 리포트 데이터 구조 설계
- **3D 캐릭터**: 뿡뿡이 캐릭터 디자인 · 모델링 · 애니메이션
- **UI/UX 디자인**: 전체 화면 디자인
- **프로젝트 세팅**: React Native 프로젝트 생성, 폴더 구조(화면별 컴포넌트 · 훅 · 상수 분리) 설계
- **초기 화면 구현**
  - 홈: 캐릭터 방, 말풍선, 기분 선택, 먹이 · 놀이 · 음악 · 취미 상호작용과 취향 카드
  - 채팅: 대화 화면(아바타 · 헤더 · 말풍선 · 입력창), 대화 흐름 훅과 이야기 분석
  - 리포트: 지표 카드 · 수면 카드 · 추세 차트 · 스트레스 원인 카드 · 인사이트 카드
  - 내 설정: 프로필 헤더와 설정 메뉴
  - 하단 탭 네비게이션
- **테마**: 라이트/다크 모드 테마 시스템(색 · 간격), 화면 전체 다크 모드 색 조정

## 🧯 트러블슈팅

| 문제 | 해결 |
|---|---|
| 삼성헬스 SDK 개발 권한을 기간 내에 받지 못함 | Health Connect로 전환해 Kotlin 모듈을 직접 개발 |
| Kotlin 모듈이 앱과 따로 동작해 통합이 어려움 | React Native Bridge로 네이티브 모듈을 등록해 JS에서 호출 |
| 정밀한 HRV에 필요한 ECG 원시 데이터에 접근 불가 | 심박수 표준편차 기반 pseudo-HRV로 대체 |
| 며칠 만에 앱을 켜면 그 사이 건강 기록이 빠짐 | Changes API 기반 증분 동기화, 저장 성공 시에만 위치 갱신 |
| iOS 기준 프로젝트라 Android 빌드 실패 | 빌드 설정을 정리해 Android 실기기에서 실행 |

## 🛠️ 기술 스택

| 분야 | 사용 기술 |
|---|---|
| 앱 | React Native 0.85, React 19, TypeScript, React Navigation |
| 네이티브 | Kotlin, Health Connect 1.1.0, Kotlin Coroutines, react-native-ble-plx |
| 백엔드 | Node.js 22, Express 5 |
| DB · 인증 | Supabase PostgreSQL, pgvector, Supabase Auth |
| AI | Cloudflare Workers, OpenAI `gpt-4o-mini` (챗봇), `text-embedding-3-small` + pgvector (대화 기억 검색) |
| 외부 API | YouTube Data API v3 (음악 추천) |
| UI | react-native-svg (차트), lucide-react-native, react-native-youtube-iframe, Pretendard |

## 🔭 앞으로 해볼 것

- **유튜브 뮤직 연동**: 구글 로그인 후 내가 '좋아요' 누른 곡 중에서 장르별 대표곡 보여 주기
- 오므론 혈압계 블루투스 직접 수신 실기기 검증
- 백그라운드 건강 데이터 동기화: 기기 전용 토큰 + WorkManager ([설계](docs/background-sync-design.md))
- 백엔드 HTTPS 배포 (지금은 PC 서버 + USB 연결로 시연)
- Health Connect 설치 · 지원 여부 확인(`getSdkStatus`), iOS HealthKit 연동
