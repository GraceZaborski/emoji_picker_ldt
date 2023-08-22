# Hello :)

Run the app using `yarn && yarn start` and open http://localhost:3000 in your browser to view instructions.

Note: Please make sure to use Node v18. If you have nvm installed, this will be picked for you automatically.

Todo:

- create renderWithProvider wrapper for unit tests
- fix axios mock
- use api as suggested
- write tests to avoid act errors
- keep focus on input
- accessibility audit
- stress test
- lazy loading
- edge cases:
  - when editing string with : not at end of input
  - ensure emoji replaces string when there are more than one occurrence of trigger emoji string
- fulfil requirements not coverered:
  - The user types a character sequence that doesn't match an emoji
  - The user moves the cursor to another part of the input
