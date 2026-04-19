import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, test, vi } from "vitest";

// mock the hook used inside the modal so that it doesn't make real requests
const mockMutate = vi.fn();
vi.mock("@/hooks/useTutors", () => ({
  useUpdateTeacherVerification: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

import { TutorVerificationModal } from "@/components/admin/TutorVerificationModal";
import type { TutorVerificationViewModel } from "@/components/admin/TutorVerificationModal";

const queryClient = new QueryClient();

const sampleTutor: TutorVerificationViewModel = {
  id: "abc123",
  name: "Jane Doe",
  email: "jane@example.com",
  phoneNumber: "123456",
  status: "pending",
};

describe("TutorVerificationModal", () => {
  test("opens reason dialog when decline button clicked and submits reason", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TutorVerificationModal
          open={true}
          onClose={vi.fn()}
          tutor={sampleTutor}
        />
      </QueryClientProvider>
    );

    const declineBtn = screen.getByText(/decline tutor/i);
    expect(declineBtn).toBeTruthy();

    fireEvent.click(declineBtn);
    const textarea = screen.getByPlaceholderText(/type reason here/i);
    expect(textarea).toBeTruthy();

    const submitBtn = screen.getByText(/^submit$/i);
    expect(submitBtn.getAttribute("disabled")).not.toBeNull();

    fireEvent.change(textarea, { target: { value: "Not suitable" } });
    expect(submitBtn.getAttribute("disabled")).toBeNull();

    fireEvent.click(submitBtn);
    expect(mockMutate).toHaveBeenCalledWith({
      id: "abc123",
      isAdminVerified: false,
      reason: "Not suitable",
    });
  });
});
