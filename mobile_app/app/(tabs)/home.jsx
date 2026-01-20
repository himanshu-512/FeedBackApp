import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ChannelCard } from "../../components/channelCard";
import { useEffect, useState } from "react";
import { getChannels } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ip} from "../../services/ip";

/* 🔓 SIMPLE JWT PAYLOAD DECODE (NO LIB) */
const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default function Home() {
  const [channels, setChannels] = useState([]);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔑 LOAD USER FROM JWT (SOURCE OF TRUTH) */
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const decoded = decodeJWT(token);
      if (decoded?.userId) {
        setUserId(decoded.userId);
        setUsername(decoded.username);
      }
    };

    loadUser();
  }, []);

  /* 📡 LOAD CHANNELS FROM BACKEND */
  useEffect(() => {
    getChannels()
      .then((data) => setChannels(data))
      .catch((err) =>
        console.log("CHANNEL ERROR:", err.message)
      )
      .finally(() => setLoading(false));
  }, []);

  /* ➕ JOIN CHANNEL (DB + UI SYNC) */
  const joinChannel = async (channelId) => {
    console.log(channelId)
    try {
      await fetch(`http://${ip}:3000/channels/${channelId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });

      // 🔥 OPTIMISTIC UI UPDATE (SAME STRUCTURE AS DB)
      setChannels((prev) =>
        prev.map((ch) =>
          ch._id === channelId
            ? {
                ...ch,
                members: ch.members.some(
                  (m) => m.userId === userId
                )
                  ? ch.members
                  : [...ch.members, { userId, username }],
              }
            : ch
        )
      );
    } catch (err) {
      console.log("JOIN ERROR:", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🌈 HEADER */}
      <LinearGradient
        colors={["#7860E3", "#D66767"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerText}>Feedback Chat</Text>
        <Text style={styles.headerIcon}>💬</Text>
      </LinearGradient>

      {/* 🧭 TABS */}
      <View style={styles.tabs}>
        <View style={styles.activeTab}>
          <Text style={styles.activeTabText}>Trending</Text>
          <View style={styles.indicator} />
        </View>
        <Text style={styles.tab}>Official</Text>
        <Text style={styles.tab}>My Channels</Text>
      </View>

      {/* 📃 CHANNEL LIST */}
      {!loading && userId && (
        <FlatList
          data={channels}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ChannelCard
              item={item}
              onJoin={joinChannel}
              isJoined={item.members?.some(
                (m) => m.userId === userId
              )}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    margin: 16,
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },

  headerIcon: {
    fontSize: 28,
  },

  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
  },

  tab: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    marginRight: 30,
  },

  activeTab: {
    marginRight: 30,
  },

  activeTabText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#E06B78",
  },

  indicator: {
    height: 4,
    width: 40,
    borderRadius: 4,
    backgroundColor: "#7860E3",
    marginTop: 4,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
});
