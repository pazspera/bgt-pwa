import { it, describe, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import PlayerCard from "./PlayerCard.vue";
import { mockSinglePlayer } from "../../mocks/data/playersApi";
import { VCard, VCardActions, VCardText, VBtn, VCardItem, VAvatar } from "vuetify/components";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { nextTick } from "vue";
import { findInitials } from "../../utils/generalUtils";

const vuetify = createVuetifyForTest({ VCard, VCardActions, VCardText, VBtn, VCardItem, VAvatar });
const faTrashText = faTrash.iconName;
const faPenToSquareText = faPenToSquare.iconName;

const mountPlayerCard = ()=> {
  return mount(PlayerCard, {
    props: {
      player: mockSinglePlayer,
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
    expect(playerName.text()).toBe(mockSinglePlayer.name);
  });

  it("renders delete icon", ()=> {
    expect(wrapper.html()).toContain(faTrashText);
  });
  
  it("renders edit icon", ()=> {
    expect(wrapper.html()).toContain(faPenToSquareText);
  });

  it("renders avatar", ()=> {
    const avatar = wrapper.findComponent({ name: "VAvatar" });
    expect(avatar.exists()).toBe(true);
  })

  it("renders player initial on avatar", ()=> {
    const playerInitial = findInitials(mockSinglePlayer.name);
    const avatar = wrapper.findComponent({ name: "VAvatar" });

    expect(avatar.text()).toEqual(playerInitial);
  })
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

    const emittedEvents = wrapper.emitted("edit-player");

    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents).toHaveLength(1);
  });

  it("emits player on editPlayer", async ()=> {
    await btnEdit.trigger("click");
    await nextTick();

    const emittedEvents = wrapper.emitted("edit-player");
    expect(emittedEvents).toBeTruthy();
    // emittedEvents returns an array of arrays
    // have to access the index twice to get to the value to compare
    expect(emittedEvents[0][0]).toEqual(mockSinglePlayer);
  });

  it("emits deletePlayer event when delete button clicked", async ()=> {
    await btnDelete.trigger("click");
    await nextTick();

    const emittedEvents = wrapper.emitted("delete-player");

    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents).toHaveLength(1);
  });
  
  it("emits player on deletePlayer", async ()=> {
    await btnDelete.trigger("click");
    await nextTick();

    const emittedEvents = wrapper.emitted("delete-player");

    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents[0][0]).toEqual(mockSinglePlayer);
  });
})