# API 명세서

## 게시물 (Posts)

### 게시물 목록 조회

- **URL:** `/api/posts`
- **Method:** `GET`
- **Description:** 모든 게시물 목록을 조회합니다.
- **Response:**
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "summary": "string",
      "slug": "string",
      "created_at": "string",
      "updated_at": "string",
      "user_id": "string"
    }
  ]
  ```
- **Error Response:**
  - Status: 500
  ```json
  {
    "error": "게시물 목록을 불러오는데 실패했습니다."
  }
  ```

### 게시물 생성

- **URL:** `/api/posts`
- **Method:** `POST`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "summary": "string",
    "slug": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "summary": "string",
    "slug": "string",
    "created_at": "string",
    "user_id": "string"
  }
  ```
- **Error Response:**
  - Status: 401
  ```json
  {
    "error": "로그인이 필요합니다."
  }
  ```
  - Status: 500
  ```json
  {
    "error": "게시물 생성에 실패했습니다."
  }
  ```

### 특정 게시물 조회

- **URL:** `/api/posts/[slug]`
- **Method:** `GET`
- **Parameters:**
  - `slug`: 게시물의 고유 식별자
- **Response:**
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "summary": "string",
    "slug": "string",
    "created_at": "string",
    "updated_at": "string",
    "user_id": "string"
  }
  ```
- **Error Response:**
  - Status: 404
  ```json
  {
    "error": "게시물을 찾을 수 없습니다."
  }
  ```

### 게시물 수정

- **URL:** `/api/posts/[slug]`
- **Method:** `PUT`
- **Parameters:**
  - `slug`: 게시물의 고유 식별자
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "summary": "string",
    "slug": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "summary": "string",
    "slug": "string",
    "updated_at": "string"
  }
  ```
- **Error Response:**
  - Status: 500
  ```json
  {
    "error": "게시물 수정에 실패했습니다."
  }
  ```

### 게시물 삭제

- **URL:** `/api/posts/[slug]`
- **Method:** `DELETE`
- **Parameters:**
  - `slug`: 게시물의 고유 식별자
- **Response:**
  ```json
  {
    "success": true
  }
  ```
- **Error Response:**
  - Status: 404
  ```json
  {
    "error": "게시물을 찾을 수 없습니다."
  }
  ```
  - Status: 500
  ```json
  {
    "error": "게시물 삭제에 실패했습니다."
  }
  ```

## 카테고리 (Categories)

### 카테고리 목록 조회

- **URL:** `/api/categories`
- **Method:** `GET`
- **Description:** 모든 카테고리 목록을 조회합니다.
- **Response:**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "created_at": "string"
    }
  ]
  ```
- **Error Response:**
  - Status: 500
  ```json
  {
    "error": "카테고리 목록을 가져오는데 실패했습니다."
  }
  ```

### 카테고리 생성

- **URL:** `/api/categories`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "name": "string",
    "created_at": "string"
  }
  ```
- **Error Response:**
  - Status: 400
  ```json
  {
    "error": "이름과 slug는 필수 입력 항목입니다."
  }
  ```
  ```json
  {
    "error": "이미 존재하는 이름입니다."
  }
  ```
  - Status: 500
  ```json
  {
    "error": "카테고리 생성에 실패했습니다."
  }
  ```

### 카테고리 삭제

- **URL:** `/api/categories/[id]`
- **Method:** `DELETE`
- **Parameters:**
  - `id`: 카테고리의 고유 식별자
- **Response:**
  ```json
  {
    "success": true
  }
  ```
- **Error Response:**
  - Status: 404
  ```json
  {
    "error": "카테고리를 찾을 수 없습니다."
  }
  ```
  - Status: 400
  ```json
  {
    "error": "이 카테고리에 속한 게시물이 있어 삭제할 수 없습니다."
  }
  ```
