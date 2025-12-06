# 🦡 Hufflepuff Todo List - Backend

> RESTful API for the Hufflepuff Todo List Application

![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)

## 🌐 배포 URL

- **API Base URL**: https://todolist-back-fohi.onrender.com
- **Health Check**: https://todolist-back-fohi.onrender.com/health

## ✨ 주요 기능

- 📝 **Todo CRUD** - 할 일 생성, 조회, 수정, 삭제
- 📋 **Subtask 관리** - 서브태스크 CRUD
- 🔀 **순서 변경** - 드래그 앤 드롭 위치 저장
- ✅ **완료 토글** - 할 일/서브태스크 완료 상태 변경
- 🔒 **CORS 설정** - 프론트엔드 도메인 허용

## 🛠️ 기술 스택

- **Runtime**: Node.js
- **Framework**: Express.js 4.18
- **ORM**: Prisma 6.19
- **Database**: PostgreSQL
- **Validation**: Express Validator
- **Logging**: Morgan

## 📁 프로젝트 구조

```
back/
├── prisma/
│   ├── migrations/          # DB 마이그레이션
│   ├── schema.prisma        # Prisma 스키마
│   └── seed.js              # 시드 데이터
├── src/
│   ├── config/
│   │   └── prisma.js        # Prisma 클라이언트
│   ├── controllers/
│   │   ├── subtaskController.js
│   │   └── todoController.js
│   ├── middleware/
│   │   ├── errorHandler.js  # 에러 핸들러
│   │   └── validator.js     # 입력 검증
│   ├── routes/
│   │   ├── subtaskRoutes.js
│   │   └── todoRoutes.js
│   └── server.js            # 서버 엔트리포인트
└── package.json
```

## 📡 API 엔드포인트

### Base URL
```
https://todolist-back-fohi.onrender.com
```

### Todos

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | 모든 할 일 조회 (서브태스크 포함) |
| `GET` | `/api/todos/:id` | 특정 할 일 조회 |
| `POST` | `/api/todos` | 할 일 생성 |
| `PUT` | `/api/todos/:id` | 할 일 수정 |
| `DELETE` | `/api/todos/:id` | 할 일 삭제 |
| `PATCH` | `/api/todos/:id/toggle` | 완료 상태 토글 |
| `PATCH` | `/api/todos/reorder/positions` | 순서 변경 |

### Subtasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/subtasks` | 서브태스크 생성 |
| `PATCH` | `/api/subtasks/:id/toggle` | 완료 상태 토글 |
| `DELETE` | `/api/subtasks/:id` | 서브태스크 삭제 |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | 서버 & DB 상태 확인 |

## 📋 API 사용 예시

### Todo 생성
```bash
curl -X POST https://todolist-back-fohi.onrender.com/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Study for exams", "date": "2025-12-10"}'
```

### 응답
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Study for exams",
    "date": "2025-12-10T00:00:00.000Z",
    "completed": false,
    "position": 0,
    "subtasks": []
  }
}
```

### Todo 완료 토글
```bash
curl -X PATCH https://todolist-back-fohi.onrender.com/api/todos/1/toggle
```

### Subtask 추가
```bash
curl -X POST https://todolist-back-fohi.onrender.com/api/subtasks \
  -H "Content-Type: application/json" \
  -d '{"todoId": 1, "title": "Review chapter 1"}'
```

## 🗄️ 데이터베이스 스키마

```prisma
model todos {
  id         Int        @id @default(autoincrement())
  title      String
  date       DateTime
  completed  Boolean?   @default(false)
  position   Int?       @default(0)
  created_at DateTime?  @default(now())
  updated_at DateTime?  @default(now())
  subtasks   subtasks[]
}

model subtasks {
  id         Int       @id @default(autoincrement())
  todo_id    Int
  title      String
  completed  Boolean?  @default(false)
  position   Int?      @default(0)
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())
  todos      todos     @relation(fields: [todo_id], references: [id])
}
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- PostgreSQL 14.x 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일 수정

# 데이터베이스 마이그레이션
npm run prisma:migrate

# (선택) 시드 데이터 삽입
npm run prisma:seed

# 개발 서버 실행
npm run dev

# 프로덕션 서버 실행
npm run start
```

### 환경 변수

`.env` 파일:

```env
# 데이터베이스 연결
DATABASE_URL="postgresql://username:password@localhost:5432/hufflepuff_todo?schema=public"

# 서버 설정
PORT=5000
NODE_ENV=development

# CORS 설정 (선택, 기본값: 모든 origin 허용)
CORS_ORIGIN=http://localhost:3000,https://your-frontend.vercel.app
```

## 📜 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (nodemon) |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run prisma:studio` | Prisma Studio 실행 |
| `npm run prisma:migrate` | DB 마이그레이션 |
| `npm run prisma:seed` | 시드 데이터 삽입 |
| `npm run prisma:reset` | DB 리셋 |

## 🚀 Render 배포 가이드

1. [Render](https://render.com) 가입/로그인
2. **New +** → **Web Service**
3. GitHub 저장소 연결
4. 설정:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **Environment Variables** 추가:
   - `DATABASE_URL`: PostgreSQL 연결 문자열
   - `NODE_ENV`: `production`
6. **Create Web Service**

## 🔗 관련 저장소

- **Frontend**: [front](https://github.com/ShinYeoJin/front)

## 📄 라이선스

ISC License

---

<div align="center">
  <p>🦡 Made with ❤️ and hard work</p>
  <p><i>"Hard work and dedication"</i></p>
</div>

