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
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const icons: { [key: string]: string } = {
  Clouds: "cloudy",
  Clear: "sun",
  Rain: "rain",
  Snow: "snow",
  Drizzle: "rain",
  Thunderstorm: "rain",
  Mist: "cloudy",
};

interface WeatherData {
  list: Array<{
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
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
        {days === null || !days.list ? (
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "90%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {Math.round(day.main.temp - 273.15)}°
                </Text>
                <Fontisto name={icons[day.weather[0].main]} size={68} />
              </View>
              <Text style={styles.weatherName}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
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
    fontSize: 40,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    fontWeight: "500",
  },
  weatherName: {
    marginTop: -20,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "500",
  },
  tinyText: {
    marginLeft: 20,
    fontSize: 20,
  },
});
