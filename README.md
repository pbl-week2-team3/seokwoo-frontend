<h3 align="center"><b>항해99 주특기 2주차 React 프로젝트, Magazine</b></h3>

<h4 align="center">📆 2022.02.18 ~ 2022.02.23</h4>
<br>
<br>

## 📌 소개

|장석우|
|:----:|
|![Photo_JANG_SUKWOO](https://user-images.githubusercontent.com/55970155/154599100-0bf2e188-84ec-4f11-ab23-e061b533964a.jpg) |

<br>

---

<h3><b>🎫 프로젝트 소개 🎫</b></h3>
- "리액트, 팀프로젝트 매거진" <br>
- React, Redux, Firebase를 이용하여 매거진을 만들어보자!!
<br><br> 

---

<br>
<h3 align="center"><b>🛠 Tech Stack 🛠</b></h3>
<p align="center">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/materialui-232F3E?style=for-the-badge&logo=materialui&logoColor=white">
</br>
<img src="https://img.shields.io/badge/react-375BD2?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/redux-3CBDB1?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCC33?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/recoil-945DD6?style=for-the-badge&logo=recoil&logoColor=white">
</br>
<img src="https://img.shields.io/badge/reactrouterdom-375BD2?style=for-the-badge&logo=reactrouterdom&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-181717?style=for-the-badge&logo=styledcomponents&logoColor=white">


<br><br>
<h3 align="center"><b>🎬 Getting Started 🎬</b></h3>
<pre>
<code>
~$ cd react_project_01_with_firebase_and_redux
~$ yarn add react-router-dom
~$ yarn add react-redux
~$ yarn add styled-components
~$ yarn start
</code>
</pre>

<br>
<h3 align="center"><b>📂 Project Directory Structure 📁</b></h3>
<pre>
<code>
src/
┣ addWord/
┃ ┗ AddWord.js
┣ redux/
┃ ┣ modules/
┃ ┃ ┗ word.js
┃ ┗ configStore.js
┣ singleBox/
┃ ┣ readSingle/
┃ ┃ ┣ ReadSingle.js
┃ ┃ ┗ ReadSingle.jsx
┃ ┣ SingleBox.js
┃ ┗ UpdateSingle.js
┣ App.css
┣ App.js
┣ App.test.js
┣ firebase.js
┣ index.css
┣ index.js
┣ logo.svg
┣ reportWebVitals.js
┣ setupTests.js
┗ WordBoxList.js
</code>
</pre>
<br>
<br>


---


<br>
<h3 align="center"><b>📢 Main function 📢</b></h3>
<br>


---


<br>
<h4><b>📰 Main Page 📰</b></h4>

<table width="100%">
    <tr>
        <td width="50%">
            <h5>메인 화면</h5>
            <ul>
                <li>리덕스를 이용하여 Firebase FireStore에 저장된 값 로드하기</li>
                <li>리액트 라우터 돔을 이용하여 각 페이지 라우팅</li>
                <li>스타일드 컴포넌트를 이용한 디자인구현</li>
            </ul>
        </td>
    </tr>
</table>


---

<br>
<h4><b>📰 SingleBox Page 📰</b></h4>

<table width="100%">
    <tr>
        <td width="50%">
            <h5>상세 화면</h5>
            <ul>
                <li>조건문과 state를 이용한 글 삭제/수정 분기 구현</li>
                <li>styled-components와 데이터 처리부 분리 구현</li>
                <li>리덕스 툴킷 적용한 데이터 생성/읽기/삭제/수정 구현</li>
            </ul>
        </td>
    </tr>
</table>

<br><br>

---

<br><br>

<h3 align="center"><b>🏷 Firebase  🏷</b></h3>

#### Word

|Actions|Params - to|Params - from|Role|
|:--:|:--:|:--:|:--:|
|word/CREATE| {text, explain, example} |{id}|생성|
|word/LOAD| - | list[...{text, explain, example}] |읽기|
|word/UPDATE|{id, text, explain, example}| - |수정|
|word/DELETE|{id}| - |삭제|


<br><br>


---


<h3 align="center"><b>✏ Trouble Shooting ✏</b></h3>
<br>
<details>
    <summary>
        <b>리덕스 적용시 복잡한 구조 개선 필요성을 느꼈다.</b>
    </summary>
    <br>해결 : 리덕스 툴킷을 적용하여 Action Creator를 생략하고 Reducer에 통합적용으로 해결
</details>
<details>
    <summary>
        <b>타입 스크립트 적용시, userSelector의 인자 state의 타입 적용</b>
    </summary>
    <br>해결 : combineReducers를 이용하여 rootReducer를 생성 후, 타입을 export하여 해결
</details>
