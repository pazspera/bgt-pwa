export const NavigationLinkStub = {
  props: ["to"],
  template: `
  <div data-test="navigation-link"
    :data-to="typeof to === 'string' ? to : to?.name || to?.path ">
    <slot/>
  </div>`
}