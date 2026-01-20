import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export function ChannelCard({ item, isJoined, onJoin }) {
  const router = useRouter();

  return (
    <View style={{ marginBottom: 16 }}>
      {/* CARD */}
      <Pressable
        disabled={!isJoined}
        onPress={() =>
          router.push({
            pathname: `/channels/${item._id}`,
            params: { name: item.name },
          })
        }
        android_ripple={isJoined ? { color: "#ddd" } : null}
      >
        <View style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            <Text style={styles.members}>
              👥 {item.members.length} members
            </Text>

            {/* JOIN / JOINED */}
            {!isJoined ? (
              <Pressable onPress={() => onJoin(item._id)}>
                <Text style={styles.join}>Join</Text>
              </Pressable>
            ) : (
              <Text style={styles.joined}>Joined</Text>
            )}
          </View>

          <View
            style={[
              styles.iconWrap,
              { backgroundColor: item.color },
            ]}
          >
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  desc: {
    fontSize: 15,
    color: "#444",
    marginVertical: 6,
  },
  activeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  userIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  active: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  iconWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 30,
  },
  join: {
    marginTop: 8,
    color: "#7860E3",
    fontWeight: "800",
  },

  joined: {
    marginTop: 8,
    color: "green",
    fontWeight: "800",
  },
});
