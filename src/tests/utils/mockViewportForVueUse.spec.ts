import { describe, it, expect } from "vitest";
import { mockViewportForVueUse } from "./mockViewportForVueUse";

// Breakpoints taken from NavBar.vue
// mobile: 0, tablet: 768, desktop: 1024 

describe("mockViewportForVueUse util", ()=> {
  it("(min-width: 1024px): returns true when width >= 1024 and false when width < 1024", ()=> {
    mockViewportForVueUse(1200);
    const w1200 = window.matchMedia("(min-width: 1024px)").matches;
    expect(w1200).toBe(true);

    mockViewportForVueUse(1024);
    const w1024 = window.matchMedia("(min-width: 1024px)").matches;
    expect(w1024).toBe(true);

    mockViewportForVueUse(1023);
    const w1023 = window.matchMedia("(min-width: 1024px)").matches;
    expect(w1023).toBe(false);
  });

  it("(max-width: 768px): returns true when width <= 768 and false when width > 768 ", ()=> {
    mockViewportForVueUse(500);
    const w500 = window.matchMedia("(max-width: 768px)").matches;
    expect(w500).toBe(true);

    mockViewportForVueUse(768);
    const w768 = window.matchMedia("(max-width: 768px)").matches;
    expect(w768).toBe(true);
    
    mockViewportForVueUse(769);
    const w769 = window.matchMedia("(max-width: 768px)").matches;
    expect(w769).toBe(false);
  });

  it("(min-width: 768px) and (max-width: 1024px): returns true when both conditions are met", ()=> {
    mockViewportForVueUse(900);
    const w900 = 
      window.matchMedia("(min-width: 768px)").matches && 
      window.matchMedia("(max-width: 1024px)").matches;
    expect(w900).toBe(true);
  });

  it("(min-width: 1024px) and (max-width: 768px): returns false when min-width fails", ()=> {
    mockViewportForVueUse(700);
    const w700 = 
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(max-width: 768px)").matches;
    expect(w700).toBe(false);
  });

  it("(min-width: 1024px) and (max-width: 768px): returns false when max-width fails", ()=> {
    mockViewportForVueUse(1200);
    const w1200 = 
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(max-width: 768px)").matches;
    expect(w1200).toBe(false);
  });
})