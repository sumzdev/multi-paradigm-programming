[한국어](#멀티패러다임-프로그래밍) | [English](./README.en.md)   

<a href="book/ko/README.md"><img alt="멀티패러다임 프로그래밍" src="./img/book.jpg" height="200px"></a>&nbsp;&nbsp;&nbsp;<a href="book/en/README.md"><img alt="Multi-Paradigm Programming" src="./img/book_en.png" height="200px"></a>

---

# Multi-Paradigm Programming

객체 지향, 함수형, 명령형의 통합적 사고로 구현하는 소프트웨어 설계와 구현 ([보러가기](book/ko/README.md) 🧐)

## 📖 책의 목차

[상세 목차](book/ko/README.md) <br>
[지은이의 글](book/ko/0.1-지은이의-글.md) <br>
[추천의 글](book/ko/0.2-추천의-글.md) <br>

1. [멀티패러다임이 현대 언어를 확장하는 방법](book/ko/1.0-멀티패러다임이-현대-언어를-확장하는-방법.md)
2. [함수형 프로그래밍과 타입 시스템, 그리고 LISP](book/ko/2.0-함수형-프로그래밍과-타입-시스템,-그리고-LISP.md)
3. [코드:객체:함수 = Generator:Iterator:LISP = IP:OOP:FP](book/ko/3.0-코드%3A객체%3A함수-=-Generator%3AIterator%3ALISP-=-IP%3AOOP%3AFP.md)
4. 비동기 프로그래밍
5. 실전 함수형 프로그래밍
6. 멀티패러다임 프로그래밍
7. 객체 지향 프론트엔드 개발, 그리고 멀티패러다임적 접근과 응용

## 📖 부록: 코틀린 멀티패러다임 이터레이션 (무료 공개)

『코틀린 멀티패러다임 이터레이션』은 본서의 부록으로, 『멀티패러다임 프로그래밍』의 일부 내용을 코틀린 언어에 특화하여 풀어낸 자료입니다. 

- [코틀린 멀티패러다임 이터레이션 보러가기](https://github.com/marpple/kotlin-multi-paradigm-iteration)

## 🚀 퀵 메뉴

- [예제 환경 설치](#%EF%B8%8F-예제-환경-설치)
- [인프런 영상 강의](#-인프런-영상-강의)
- [온라인 커뮤니티 및 유튜브 채널](#-온라인-커뮤니티-및-유튜브-채널)
- [라이센스 및 저작권](#-라이센스-및-저작권)

## 🛠️ 예제 환경 설치

### Node.js with Volta

[Volta Guide](https://docs.volta.sh/guide/getting-started)

### Unix 환경

```shell
curl https://get.volta.sh | bash
volta install node@22
```

### Windows 환경

```shell
winget install Volta.Volta
volta install node@22
```

### pnpm

[pnpm Guide](https://pnpm.io/installation)

```bash
npm install -g pnpm@10
```

### 책 예제 설치하고 실행하기

```
pnpm install
pnpm -F example dev
```

1. 터미널을 열어 위 코드를 실행한 후 http://localhost:2118/ 로 접속하세요. 
2. 책의 예제 코드 위치는 [/apps/example/src/chapters](./apps/example/src/chapters) 입니다.

### 영상 강의 예제 설치하고 실행하기

```
pnpm install
pnpm -F lecture dev
```

1. 터미널을 열어 위 코드를 실행한 후 http://localhost:7000/ 로 접속하세요. 
2. 영상 강의의 예제 코드 위치는 [/apps/lecture/src/part-*](./apps/lecture/src) 입니다.

## 🎥 인프런 영상 강의 

인프런에서 본 책과 관련된 여러 영상 강의를 수강할 수 있습니다. 특히 라이브 코딩 형식으로 진행되어, 코드가 발전해 나가는 과정을 좀 더 상세하고 직관적으로 볼 수 있습니다.

- [멀티패러다임 프로그래밍 영상 강의 바로가기](https://inf.run/cWvDs) 🖥 

> 인프런에서 "멀티패러다임 프로그래밍" 관련 학습 컨텐츠 제작을 후원합니다.
> 
> <a href="https://www.inflearn.com/"><img alt="inflearn" src="./img/inflearn.png" width="140px"></a>

## 🌐 온라인 커뮤니티 및 유튜브 채널

온라인 커뮤니티에서 멀티패러다임 프로그래밍에 관한 더욱 폭넓은 학습을 진행할 수 있습니다. 추가로, 이 책과 관련된 퀴즈와 정답 풀이, 다양한 교육 자료가 공유되고 있어, 책의 내용을 더 깊이 이해하고 응용력을 키우는 데 큰 도움이 됩니다. 필요하신 분들은 꼭 방문해 참고해 보세요.

- [온라인 커뮤니티 바로가기 📢](https://ciety.xyz/@mduniv)
- [유튜브 채널 바로가기 📺](https://www.youtube.com/@mduniv)

> 마플개발대학(MDU)은 소프트웨어 대학을 콘셉트로 활동하는 커뮤니티로, 개발자들과 함께 성장하며 프로그래밍의 즐거움을 나누고, 보다 깊이 있는 소프트웨어 공학 문화를 만들어가기 위해 설립되었습니다.
>
> <a href="https://ciety.xyz/@mduniv"><img alt="MDU" src="./img/mduniv.png" width="160px"></a>

## 📝 출판

본 도서 『멀티패러다임 프로그래밍』은 [한빛미디어](https://www.hanbit.co.kr/)에서 출판되었습니다. 본 저장소에 공개된 책 내용은 집필 원고 원본입니다. 더욱 매끄럽게 편집된 글은 종이책 혹은 전자책으로 만나보실 수 있습니다.

- [교보문고](https://product.kyobobook.co.kr/detail/S000216318962)
- [yes24](https://www.yes24.com/product/goods/145367977)
- [알라딘](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=362548794)

> <a href="https://www.hanbit.co.kr/"><img alt="hanbit" src="./img/hanbit_plus.png" width="140px"></a>

## 📜 라이센스 및 저작권

이 저장소의 예제 코드는 모두 MIT 라이선스로 배포됩니다. 다만, 책의 원문과 이 저장소에 공개된 모든 텍스트는 [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) 라이선스를 적용받습니다.

> 본 문서의 모든 자료는 © 2025 [마플코퍼레이션](https://www.marpplecorp.com/)의 저작권이 적용됩니다.
> 
> <a href="https://www.marpplecorp.com/"><img alt="Marpple Corporation" src="./img/MCO.png" width="200px"></a>