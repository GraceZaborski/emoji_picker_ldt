import axios from "axios";
import { Input } from "baseui/input";
import { StatefulPopover } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { useEffect, useState } from "react";
import { transformEmojiData } from "./transformers/tranformEmojiData";

function FancyInput({ placeholder }) {
  const [emojis, setEmojis] = useState([]);
  const [error, setError] = useState(false);

  const getEmojis = () => {
    try {
      axios
        .get(
          "https://emoji-api.com/emojis?access_key=a9a622e3fe06b4a9baf78876300e42f7bbfa3d74"
        )
        .then(({ data }) => {
          console.log(data);
          const transformedData = transformEmojiData(data);
          setEmojis(transformedData);
        });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    getEmojis();
  }, []);

  return (
    <StatefulPopover
      placement="top"
      isOpen={true}
      content={
        error ? (
          <p>Error loading data</p>
        ) : (
          <StatefulMenu
            items={emojis}
            overrides={{
              List: {
                style: {
                  maxHeight: "250px",
                  width: "250px",
                },
              },
            }}
          />
        )
      }
    >
      <span>
        <Input placeholder={placeholder} />
      </span>
    </StatefulPopover>
  );
}

export { FancyInput };
