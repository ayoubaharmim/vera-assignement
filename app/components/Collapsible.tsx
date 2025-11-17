import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Markdown from "react-native-markdown-display";

type Props = {
  title: string;
  content: string;
};

export default function CollapsibleCard({ title, content }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <View style={{ 
      backgroundColor: "#fff",
      borderRadius: 12,
      marginVertical: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "#dfe3e6"
    }}>
      <TouchableOpacity 
        onPress={() => setOpen(o => !o)} 
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
        <Text style={{ fontSize: 16 }}>{open ? "▾" : "▸"}</Text>
      </TouchableOpacity>

      {open && (
        <View style={{ marginTop: 8 }}>
          <Markdown>{content}</Markdown>
        </View>
      )}
    </View>
  );
}
