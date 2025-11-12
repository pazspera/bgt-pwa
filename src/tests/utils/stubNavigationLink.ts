export const NavigationLinkStub = {
  props: ["to"],
  template: `
    <a data-testid="navigation-link">
      <slot/>
    </a>`
}