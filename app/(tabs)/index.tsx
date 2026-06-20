import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";

const RESET_VALUE = 100;
const HOLD_DELAY = 400;
const HOLD_INTERVAL = 80;

type CounterDisplayProps = {
  count: number;
  onAdd: () => void;
  onMinus: () => void;
  onReset: () => void;
  onAddHoldStart: () => void;
  onAddHoldEnd: () => void;
  onMinusHoldStart: () => void;
  onMinusHoldEnd: () => void;
};

function CounterDisplay({
  count,
  onAdd,
  onMinus,
  onReset,
  onAddHoldStart,
  onAddHoldEnd,
  onMinusHoldStart,
  onMinusHoldEnd,
}: CounterDisplayProps) {
  return (
    <View style={styles.childCard}>

      <View style={styles.propsTag} />

      <Text style={styles.countLabel}>CURRENT COUNT</Text>
      <Text style={styles.countNumber}>{count}</Text>

      <View style={styles.divider} />

      <View style={styles.addMinusRow}>
        <Pressable
          style={({ pressed }) => [styles.oblongBtn, styles.btnMinus, pressed && styles.btnPressed]}
          onPress={onMinus}
          onLongPress={onMinusHoldStart}
          onPressOut={onMinusHoldEnd}
          delayLongPress={HOLD_DELAY}
        >
          <Text style={styles.oblongBtnTextOutline}>− Minus</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.oblongBtn, styles.btnAdd, pressed && styles.btnPressed]}
          onPress={onAdd}
          onLongPress={onAddHoldStart}
          onPressOut={onAddHoldEnd}
          delayLongPress={HOLD_DELAY}
        >
          <Text style={styles.oblongBtnTextSolid}>+ Add</Text>
        </Pressable>
      </View>

      <View style={styles.propsTag} />

      <Pressable
        style={({ pressed }) => [styles.resetBtn, pressed && styles.btnPressed]}
        onPress={onReset}
      >
        <Text style={styles.resetBtnText}>↺  Reset to {RESET_VALUE}</Text>
      </Pressable>
    </View>
  );
}

export default function ParentScreen() {
  const [count, setCount] = useState(RESET_VALUE);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearHold = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startHold = (delta: number) => {
    clearHold();
    intervalRef.current = setInterval(() => {
      setCount((c) => c + delta);
    }, HOLD_INTERVAL);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.parentCard}>
        <Text style={styles.parentLabel}>COUNT DISPLAY</Text>

        <CounterDisplay
          count={count}
          onAdd={() => setCount((c) => c + 1)}
          onMinus={() => setCount((c) => c - 1)}
          onReset={() => setCount(RESET_VALUE)}
          onAddHoldStart={() => startHold(1)}
          onAddHoldEnd={clearHold}
          onMinusHoldStart={() => startHold(-1)}
          onMinusHoldEnd={clearHold}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#556b2f",
    justifyContent: "center",
    alignItems: "center",
  },
  parentCard: {
    width: "88%",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
    padding: 28,
    alignItems: "center",
  },
  parentLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 4,
    color: "#FFFFFF",
    textTransform: "uppercase",
    marginBottom: 24,
  },
  childCard: {
    width: "100%",
    alignItems: "center",
  },
  propsTag: {
    height: 0,
  },
  countLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 3,
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  countNumber: {
    fontSize: 110,
    fontWeight: "200",
    color: "#FFFFFF",
    letterSpacing: -6,
    lineHeight: 120,
    includeFontPadding: false,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 28,
  },
  addMinusRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
    width: "100%",
  },
  oblongBtn: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnAdd: {
    backgroundColor: "#006400",
  },
  btnMinus: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
  },
  btnPressed: {
    opacity: 0.6,
  },
  oblongBtnTextSolid: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  oblongBtnTextOutline: {
    fontSize: 17,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    letterSpacing: 0.5,
  },
  resetBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 0.3,
  },
});