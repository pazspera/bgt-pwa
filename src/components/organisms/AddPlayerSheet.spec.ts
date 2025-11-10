import { it, describe, expect } from "vitest";

describe("Rendering", ()=> {
  it.todo("renders input v-text-field", ()=> {});
  it.todo("renders 'add' button", ()=> {});
  it.todo("renders 'cancel' button", ()=> {});
  it.todo("shows a message error with the correct value when errorMessage is received", ()=> {});
});

describe("Logic & Events", ()=> {
  it.todo("emits 'player-added' event on valid submit", ()=> {});
  it.todo("the emitted event matches with the string entered by the user", ()=> {});
  it.todo("emits cancellation event that closes AppPlayerSheet", ()=> {});
  it.todo("remains open after submitting 'player-added' event (awaits confirmation from parent if the player already exists or not)", ()=> {});
});

describe("Validations", ()=> {
  it.todo("doesn't allow submission on empty input", ()=> {});
  it.todo("the input value doesn't have empty spaces at the beginning or the end", ()=> {});
});