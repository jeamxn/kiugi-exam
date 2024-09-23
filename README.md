<p align="center">
  <img src="./public/logo.svg" height="50px">
  <p align="center"><b><i>모의고사 키우기 :: 모의고사를 한 곳에서 모아보자!</i></b></p>
</p>

# 1. 모의고사 키우기

[EBSi 기출문제](https://www.ebsi.co.kr/ebs/xip/xipc/previousPaperList.ebs?targetCd=D300)에서 로그인 후 다운로드해야 하는 모의고사 기출문제를 로그인 없이 한 곳에서 모아볼 수 있는 플랫폼입니다.

개발에 참여하고 싶다면 PR을 보내주세요! (Issue도 환영합니다.)

# 2. 설정

이 프로그램은 Next.JS로 작성되었습니다.

## 1) 환경 설정

### ① Node.js
`node v20.13.1`으로 개발되었습니다.
> [`nvm`](https://github.com/nvm-sh/nvm) 사용을 권장합니다.

### ② Bun
[`bun`](https://bun.sh)을 사용합니다. `v1.1.9`


# 3. 개발

## 1) 개발 서버 실행

개발을 시작하기 전에 아래의 명령어를 입력하여 개발 서버를 실행해주세요.

```bash
bun dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

`src/` 폴더 안의 소스코드를 수정하여 페이지를 수정할 수 있습니다. 파일을 수정할 때마다 페이지가 자동으로 업데이트됩니다.

## 2) 빌드

아래의 명령어를 입력하여 프로젝트를 빌드할 수 있습니다.

```bash
bun build
```

## 3) 배포

Github의 `Main` 브랜치에 `Merge`하면 `Vercel`을 통해 자동으로 배포됩니다.

여러분들은 권한이 없기 때문에 `Main` 브랜치에 `Push` 및 배포를 직접 할 수 없습니다.

또한 `Main` 브랜치에 직접 `Push`하지 않고 `Github Pull Request`를 통해 `Merge`를 요청해주세요.



<!-- 배포를 위해서는 아래와 같은 명령어를 입력하여 빌드를 진행해주세요.

```bash
bun run build
``` -->
