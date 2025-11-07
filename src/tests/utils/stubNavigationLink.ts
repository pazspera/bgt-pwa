export const NavigationLinkStub = {
  props: ["to"],
  template: `
    <a data-test="navigation-link"
      :data-to="typeof to === 'string' ? to : to?.name || to?.path "
      @click="$router.push(to)">
      <slot/>
    </a>`
}