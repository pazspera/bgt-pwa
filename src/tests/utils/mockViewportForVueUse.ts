/* 
The function uses window.matchMedia which is what
VueUse needs to function when useBreakpoints() or
useMediaQuery() are used. 
It's not for testing of the layout, just to make
sure the reactive logic of VueUse works. 
*/

export function mockViewportForVueUse(width: number): void {
  window.innerWidth = width;
  console.log(`width: ${width}`)

  window.matchMedia = (query: string) : MediaQueryList => {
    // variable needed to evaluate and accumulate multiple media queries
    let matches = true;

    console.log(`query ${query}`)

    if(query.includes("min-width")) {
      const min = +(query.split("min-width:")[1].split("px")[0]);
      console.log(`min: ${min}`)
      matches = matches && width >= min;
    }
    
    if(query.includes("max-width")) {
      const max = +(query.split("max-width:")[1].split("px")[0]);
      matches = matches && width <= max;
    }

    // returns full MediaQueryList{} to make sure VueUse works properly
    return { 
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }
  }

  // VueUse needs a resize event to update reactive values
  window.dispatchEvent(new Event("resize"));
}
