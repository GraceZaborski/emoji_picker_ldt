import axios from "axios";
import { Input } from "baseui/input";
import { Popover } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { useEffect, useState } from "react";
import { transformEmojiData } from "./transformers/tranformEmojiData";

function FancyInput({ placeholder }) {
  const [emojis, setEmojis] = useState([]);
  const [error, setError] = useState(false);
  const [inputValue, setInpuValue] = useState("");
  const [openPopover, setOpenPopover] = useState(false);

  const getEmojis = () => {
    try {
      axios
        .get(
          "https://emoji-api.com/emojis?access_key=a9a622e3fe06b4a9baf78876300e42f7bbfa3d74"
        )
        .then(({ data }) => {
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

  useEffect(() => {
    if (inputValue.slice(inputValue.length - 1 === "")) {
      setOpenPopover(false);
    }
    // check whether should open popover
    const regex = new RegExp(/:../);
    const latestInput = inputValue.slice(inputValue.length - 3);
    const shouldOpenPopover = latestInput.match(regex);
    if (shouldOpenPopover) {
      setOpenPopover(true);
    }
  }, [inputValue]);

  return (
    <Popover
      placement="top"
      isOpen={openPopover}
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
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInpuValue(e.target.value)}
        />
      </span>
    </Popover>
  );
}

export { FancyInput };
