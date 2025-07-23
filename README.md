> <h4>2025S KAIST 몰입캠프</h4>
> <h4>Week 3 : 2025. 07. 17. ~ 2025. 07. 23.</h4>

---

## 👥 Team Members
<table>
    <tr>
      <td align="center" width="200">
        <a href="https://github.com/7lram">
          <img width="120" height="120" alt="Image" src="https://github.com/user-attachments/assets/bed619eb-5f33-4ea5-942a-3607bd4b294d" />
          <br />
        </a>
      </td>
      <td align="center" width="200">
        <a href="https://github.com/dain00519">
          <img width="120" height="120" alt="Image" src="https://github.com/user-attachments/assets/95633bc1-6add-4ca4-896c-c7934d4846f8" />
          <br />
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>박기람</b>
      </td>
      <td align="center">
        <b>이다인</b>
      </td>
    </tr>
  <tr>
    <td align="center">
      <p>한양대 정보시스템학과</p>
    </td>
    <td align="center">
      <p>한양대 컴퓨터소프트웨어학부</p>
    </td>
  </tr>
</table>

---

<br/>
<img src="https://github.com/user-attachments/assets/82efc692-e8e6-4541-b3db-1ff123049bc0" alt="Talktic Logo" width="240" height="90" />
<br/>

## ✨ 서비스 개요


**썸인지 아닌지, 대화로 알아보는 감정 분석 플랫폼**
- 사용자가 카카오톡 대화 캡처 이미지를 업로드하면
    
    → 서버에서 Clova OCR로 텍스트 추출
    
    → 발화자/메시지/시간 파싱
    
    → 파싱된 데이터로 감정/호감/친밀도/질문 비율 등 종합 분석
    
    → 썸 가능성 점수 + Gemini 기반 대화 추천까지!

---

## 🚀 Get Start


### 1. 클론 및 설치

```bash
https://github.com/mdcamp-week3.git
```

#### 클라이언트

```bash
cd client
npm install
npm run dev
```

#### 서버

```bash
cd server
npm install
node index.js
```

> 기본적으로 클라이언트는 Vite, 서버는 Express.js로 구동됩니다.

---

## 📸 Screen Shot
<table>
    <tr>
        <td>
            <img width="1780" height="892" alt="Image" src="https://github.com/user-attachments/assets/89060c40-f1df-41f3-80fd-d961d55e11ef" />
        </td>
        <td>
            <img width="1861" height="851" alt="Image" src="https://github.com/user-attachments/assets/4d338f04-9af8-459e-b335-23a1b0f94f15" />
        </td>
        <td>
            <img width="1008" height="853" alt="Image" src="https://github.com/user-attachments/assets/8ac5dbdb-dd41-4bac-869b-76ad92723c4b" />
        </td>
    </tr>
    <tr>
        <td>
            <img width="1800" height="866" alt="Image" src="https://github.com/user-attachments/assets/09d62245-a780-4daf-b878-475bb65b2fbc" />
        </td>
        <td>
            <img width="1859" height="867" alt="Image" src="https://github.com/user-attachments/assets/ac62329e-9fc7-4483-936e-fa7d5271508c" />
        </td>
        <td>
            <img width="1876" height="880" alt="Image" src="https://github.com/user-attachments/assets/62627bc4-17ef-479a-a0e2-6f0dfa1e4f96" />
        </td>
    </tr>
</table>

<br/>

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS, React Router, Axios
- **Backend:** Node.js, Express.js, JWT, Multer
- **DB:** MongoDB Atlas
- **OCR:** Naver CLOVA OCR (v2, general)
- **AI 분석 서비스:** Google Gemini API

---

### 💡 참고

- 로고 및 기타 이미지는 `client/src/assets/` 폴더에 있습니다.
- `.env` 파일에 환경변수를 설정해야 할 수 있습니다.

---
