# 📱 React Native 날씨 앱

현재 위치를 기반으로 5일간의 날씨 예보를 보여주는 React Native 앱입니다.

## 🌟 주요 기능

- **위치 기반 날씨**: GPS를 통해 현재 위치의 날씨 정보를 자동으로 가져옵니다
- **5일 예보**: 향후 5일간의 날씨 예보를 확인할 수 있습니다
- **직관적인 UI**: 좌우 스크롤로 간편하게 날씨 정보를 탐색할 수 있습니다
- **실시간 데이터**: OpenWeatherMap API를 통해 실시간 날씨 데이터를 제공합니다

## 🛠 기술 스택

- **React Native** - 크로스 플랫폼 모바일 앱 개발
- **Expo** - 개발 및 빌드 플랫폼
- **TypeScript** - 타입 안정성
- **expo-location** - 위치 정보 접근
- **OpenWeatherMap API** - 날씨 데이터

## 📋 필요 조건

- Node.js (v14 이상)
- npm 또는 yarn
- Expo CLI
- iOS Simulator 또는 Android Emulator (또는 실제 기기)

## 🚀 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone <repository-url>
   cd rn_study
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **Expo CLI 설치** (전역)

   ```bash
   npm install -g @expo/cli
   ```

4. **API 키 설정**

   - [OpenWeatherMap](https://openweathermap.org/api)에서 무료 API 키 발급
   - `App.tsx` 파일의 `API_KEY` 상수에 발급받은 키 입력

5. **앱 실행**

   ```bash
   npx expo start
   ```

6. **기기에서 실행**
   - iOS: `i` 키를 눌러 iOS 시뮬레이터에서 실행
   - Android: `a` 키를 눌러 Android 에뮬레이터에서 실행
   - 실제 기기: Expo Go 앱으로 QR 코드 스캔

## 📱 사용법

1. 앱을 실행하면 위치 권한을 요청합니다
2. 권한을 허용하면 현재 위치의 도시 이름이 표시됩니다
3. 화면을 좌우로 스와이프하여 5일간의 날씨 예보를 확인할 수 있습니다
4. 각 날씨 카드에는 온도와 날씨 상태가 표시됩니다

## 🔧 주요 컴포넌트

### App.tsx

- 메인 컴포넌트
- 위치 정보 획득 및 날씨 API 호출
- UI 렌더링 및 상태 관리

### 주요 함수

- `getWeather()`: 위치 권한 요청 및 날씨 데이터 가져오기
- `Location.requestForegroundPermissionsAsync()`: 위치 권한 요청
- `Location.getCurrentPositionAsync()`: 현재 위치 좌표 획득
- `Location.reverseGeocodeAsync()`: 좌표를 도시 이름으로 변환

## 🎨 UI 구성

- **상단**: 현재 도시 이름 표시
- **하단**: 수평 스크롤 가능한 날씨 카드들
  - 각 카드: 온도(°C) + 날씨 상태

## 📦 의존성

```json
{
  "expo": "~53.0.12",
  "expo-location": "latest",
  "expo-status-bar": "~2.2.3",
  "react": "19.0.0",
  "react-native": "0.79.4"
}
```
