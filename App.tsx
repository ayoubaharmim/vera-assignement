import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useFetchSSE } from "./app/hooks/useFetchSSE";
import CollapsibleCard from "./app/components/Collapsible";
import { ThinkingIndicator } from "./app/components/ThinkingIndicator";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const { segments, isStreaming, start, reset, stop } = useFetchSSE();

  const hasAnswer = segments.length > 0;

  const renderSegments = () =>
    segments.map((seg, i) =>
      seg.type === "text" ? (
        <Markdown key={i} style={markdownStyles}>
          {seg.content.trim()}
        </Markdown>
      ) : (
        <CollapsibleCard
          key={i}
          title={seg.tagName.toUpperCase()}
          content={seg.content}
        />
      )
    );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll}>
        {isStreaming && (
          <>
            <ThinkingIndicator />
            {renderSegments()}
          </>
        )}

        {!isStreaming && hasAnswer && <View>{renderSegments()}</View>}
      </ScrollView>

      <View style={styles.bottomBar}>
        {!isStreaming ? (
          <View style={styles.inputRow}>
            <TextInput
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Ask a clinical question..."
              style={styles.input}
            />
            <TouchableOpacity onPress={() => start(prompt)} style={styles.sendBtn}>
              <Text style={styles.sendBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              stop();
              reset();
              setPrompt("");
            }}
            style={styles.stopBtn}
          >
            <Text style={styles.stopText}>STOP</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const markdownStyles = {
  body: {
    color: "#000",
  },
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingHorizontal: 16,
    flex: 1,
  },

  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },

  inputRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    flex: 1,
    backgroundColor: "#f0f3f7",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 16,
    color: "#111",
  },

  sendBtn: {
    marginLeft: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#3b82f6",
    borderRadius: 10,
  },

  sendBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  stopBtn: {
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  stopText: {
    color: "#6b7a89",
    fontWeight: "600",
  },
});
