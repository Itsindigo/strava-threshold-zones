import React from "react";

interface Emojis {
  [key: string]: { character: string; label: string };
}

const emojis: Emojis = {
  plane: { character: "✈️", label: "plane" },
  boulder: { character: "🧗‍♂️", label: "boulder" },
  joy: { character: "😂", label: "joy" },
  rocket: { character: "🚀", label: "rocket" },
  bolt: { character: "⚡", label: "bolt" },
};

interface IProps {
  name: string;
}

const Emoji = (props: IProps) => (
  <span role="img" aria-label={emojis[props.name].label}>
    {emojis[props.name].character}
  </span>
);

export default Emoji;
