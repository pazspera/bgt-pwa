// Verifies that the correct routes and text are being rendered on the navigation links
// Throws errors if check fails
import { expect } from "vitest";
import { NavigationLinkStub } from "./stubNavigationLink";

export const expectNavigationLinks = (sectionWrapper, expectedTo, expectedText) => {
  const navLinks = sectionWrapper.findAllComponents(NavigationLinkStub);

  try {
    // amount of link founds matches amount of expected links
    expect(navLinks).toHaveLength(expectedTo.length);
  
    navLinks.forEach((link, i)=> {
      const linkTo = link.props("to");
      const linkText = link.text().trim(); 
  
      expect(linkTo).toEqual(expectedTo[i]);
      expect(linkText).toContain(expectedText[i]);
    })
  } catch (error) {
    console.error("verifyNavigationLinks failed. Links found:");
    navLinks.forEach((link, i)=> {
      console.warn(`Link ${i}: to="${link.props("to")}" text="${link.text().trim()}"`)
    });
    throw error;
  }

}