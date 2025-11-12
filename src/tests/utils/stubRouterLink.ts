// Since the to is an object, the detailed stub
// is needed to be able to see the router-link properly 

export const routerLinkStub = {
  props: ["to"],
  template: `
    <a data-testid="router-link-stub" 
        :href="to" 
        :aria-current="$router.currentRoute.value.name === to.name ? 'page' : undefined" 
        v-bind="$attrs"
    >
      <slot />
    </a>
  `
}