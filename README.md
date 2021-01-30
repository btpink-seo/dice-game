# 다이스맵(2020/12/06~2021/1/30)
http://dice-map.com

네이버 웹툰 자작보드게임 동아리 - 다이스맵 편을 보고 제작했습니다.

### 사용기술
Angular 11, Express JS, MongoDB, WebSocket, Nginx, Docker, Typescript


### 구조
1. Production
```
Reverse Proxy(Nginx) <-> Web Server(Nginx + Builded Angular)
Reverse Proxy(Nginx) <-> Api Server(express.js) <-> MongoDB
Reverse Proxy(Nginx) <-> WebSocket Server(express.js)
```

2. Development
```
Web Server(Angular) <-> Api Server(express.js) <-> MongoDB
Web Server(Angular) <-> WebSocket Server(express.js)
```
