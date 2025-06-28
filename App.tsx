import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "2ce5f9b07ad8d4623d3501cd8b827e5f";

interface WeatherData {
  list: Array<{
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
    }>;
    dt_txt: string;
  }>;
}

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState<WeatherData | null>(null);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: 5,
    });
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    setCity(location[0].city || "Unknown");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const json = await response.json();
    setDays(json);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days === null ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.list.slice(0, 5).map((day, index) => (
            <View style={styles.day} key={index}>
              <Text style={styles.temp}>
                {Math.round(day.main.temp - 273.15)}°
              </Text>
              <Text style={styles.weatherName}>{day.weather[0].main}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {},
  day: {
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
    fontWeight: "500",
  },
  weatherName: {
    marginTop: -30,
    fontSize: 60,
  },
});
