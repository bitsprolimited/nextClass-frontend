import HeroSection from "@/components/landing/hero-section";
import Testimonial from "@/components/landing/testimonials";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, test, vi } from "vitest";
import Page from "../app/(root)/page";

vi.mock("@/components/landing/hero-section");
vi.mock("@/components/landing/testimonials");

describe("Page", () => {
  const queryClient = new QueryClient();

  test("Page renders hero section and testimonial components", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
    expect(HeroSection).toHaveBeenCalled();
    expect(Testimonial).toHaveBeenCalled();
  });

  test("Page uses correct wrapper class", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
    const firstChild = container.firstChild;
    const className =
      firstChild instanceof Element ? firstChild.getAttribute("class") : null;
    expect(className).toBe("flex flex-col items-center");
  });
});
