import HeroSection from "@/components/landing/hero-section";
import Testimonial from "@/components/landing/testimonials";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Page from "../app/(root)/page";

vi.mock("@/components/landing/hero-section");
vi.mock("@/components/landing/testimonials");

describe("Page", () => {
  test("Page renders hero section and testimonial components", () => {
    render(<Page />);

    expect(HeroSection).toHaveBeenCalled();
    expect(Testimonial).toHaveBeenCalled();
  });

  test("Page uses correct wrapper class", () => {
    const { container } = render(<Page />);
    const firstChild = container.firstChild;
    const className =
      firstChild instanceof Element ? firstChild.getAttribute("class") : null;
    expect(className).toBe("flex flex-col items-center");
  });
});
