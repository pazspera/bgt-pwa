import { it, describe, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import PlayerCard from "./PlayerCard.vue";
import { VCard } from "vuetify/components";
import type { Player } from "../../types/domain/player";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const vuetify = createVuetifyForTest({ VCard });
const faTrashText = faTrash.iconName;
const faPenToSquareText = faPenToSquare.iconName;

const mockPlayer: Player = {
  id: 333,
  name: "Zeuchi, the Great",
  createdAt: "createdAt"
}

const mountPlayerCard = ()=> {
  return mount(PlayerCard, {
    props: {
      player: mockPlayer,
    },
    global: {
      plugins: [vuetify],
      stubs: {
        "vCard": {
          template: `
            <div v-bind="$attrs">
              <slot/>
            </div>
          `
        }
      }
    }
  })
}

describe("rendering",()=> {
  let wrapper;

  beforeEach(()=> {
    wrapper = mountPlayerCard();
  })

  it.only("displays player name", ()=> {
    const playerName = wrapper.find('[data-testid="player-card-name"]');

    expect(playerName.exists()).toBe(true);
    expect(playerName.text()).toBe(mockPlayer.name);
  });

  it.only("renders delete icon", ()=> {
    expect(wrapper.html()).toContain(faTrashText);
  });
  
  it.only("renders edit icon", ()=> {
    expect(wrapper.html()).toContain(faPenToSquareText);
  });
})

describe("component logic",()=> {
  it.todo("emits editPlayer event when edit button clicked", ()=> {});
  it.todo("emits playerId on editPlayer", ()=> {});
  it.todo("emits deletePlayer event when delete button clicked", ()=> {});
  it.todo("emits playerId on deletePlayer", ()=> {});
})