import { it, describe, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import PlayerCard from "./PlayerCard.vue";
import { VCard, VCardActions, VCardText, VBtn } from "vuetify/components";
import type { Player } from "../../types/domain/player";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { nextTick } from "vue";

const vuetify = createVuetifyForTest({ VCard, VCardActions, VCardText, VBtn });
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

  it("displays player name", ()=> {
    const playerName = wrapper.find('[data-testid="player-card-name"]');

    expect(playerName.exists()).toBe(true);
    expect(playerName.text()).toBe(mockPlayer.name);
  });

  it("renders delete icon", ()=> {
    expect(wrapper.html()).toContain(faTrashText);
  });
  
  it("renders edit icon", ()=> {
    expect(wrapper.html()).toContain(faPenToSquareText);
  });
})

describe("component logic",()=> {
  let wrapper;
  let btnEdit;
  let btnDelete;

  beforeEach(()=> {
    wrapper = mountPlayerCard();
    btnEdit = wrapper.find('[data-testid="player-card-edit-btn"]');
    btnDelete = wrapper.find('[data-testid="player-card-delete-btn"]')
  })


  it("emits editPlayer event when edit button clicked", async ()=> {
    await btnEdit.trigger("click");
    await nextTick();

    const emittedEvents = wrapper.emitted("editPlayer");

    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents).toHaveLength(1);
  });

  it("emits playerId on editPlayer", async ()=> {
    await btnEdit.trigger("click");
    await nextTick();

    const emittedEvents = wrapper.emitted("editPlayer");
    expect(emittedEvents).toBeTruthy();
    // emittedEvents returns an array of arrays
    // have to access the index twice to get to the value to compare
    expect(emittedEvents[0][0]).toEqual(mockPlayer.id);
  });

  it.todo("emits deletePlayer event when delete button clicked", ()=> {});
  it.todo("emits playerId on deletePlayer", ()=> {});
})