"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// Define schema to match the API format
const profileSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().optional(), // Optional since we might not always update password
  address: z.object({
    street: z.string().min(5, "Enter a valid address"),
    city: z.string().min(1, "Select a city"),
    state: z.string().min(1, "Select a state"),
    country: z.string().min(1, "Select a country"),
  }),
  // Keep other fields if needed
  fullName: z.string().min(2, "Full name is required").optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
});

type ProfileFormSchema = z.infer<typeof profileSchema>;

const countries = ["USA", "Nigeria", "Ghana", "Kenya", "South Africa"];
const states = ["NY", "CA", "TX", "Lagos", "Abuja", "Kano", "Rivers", "Ogun"];
const cities = {
  NY: ["New York", "Buffalo", "Rochester", "Albany"],
  CA: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
  Lagos: ["Ikeja", "Victoria Island", "Lekki", "Surulere"],
  Abuja: ["Garki", "Wuse", "Asokoro", "Maitama"],
};

// Define props interface
interface EditProfileFormProps {
  userId: string;
  userDetails: any;
}

// Update user profile - modified to match API format
const updateUserProfile = async ({
  userId,
  data,
}: {
  userId: string;
  data: ProfileFormSchema;
}) => {
  // Prepare the data in the correct format
  const requestData = {
    email: data.email,
    password: data.password || undefined, // Only include if provided
    address: {
      street: data.address.street,
      city: data.address.city,
      state: data.address.state,
      country: data.address.country,
    },
    // Include other fields if your API expects them
    fullName: data.fullName,
    phone: data.phone,
  };

  const response = await fetch(`/v1/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};

export default function EditProfileForm({
  userId,
  userDetails,
}: EditProfileFormProps) {
  const queryClient = useQueryClient();

  // Update user mutation
  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: userDetails?.email || "",
      password: "", // Empty by default for security
      fullName: userDetails?.fullName || "",
      phone: userDetails?.phone || "",
      address: {
        street: userDetails?.address?.street || "",
        city: userDetails?.address?.city || "",
        state: userDetails?.address?.state || "",
        country: userDetails?.address?.country || "",
      },
    },
  });

  // Reset form when user details change
  useEffect(() => {
    if (userDetails) {
      reset({
        email: userDetails.email || "",
        password: "", // Don't pre-fill password for security
        fullName: userDetails.fullName || "",
        phone: userDetails.phone || "",
        address: {
          street: userDetails.address?.street || "",
          city: userDetails.address?.city || "",
          state: userDetails.address?.state || "",
          country: userDetails.address?.country || "",
        },
      });
    }
  }, [userDetails, reset]);

  const selectedCountry = watch("address.country");
  const selectedState = watch("address.state");

  const onSubmit = (data: ProfileFormSchema) => {
    mutation.mutate({ userId, data });
  };

  const availableCities =
    selectedState && cities[selectedState as keyof typeof cities]
      ? cities[selectedState as keyof typeof cities]
      : [];

  return (
    <section className="w-full flex justify-center items-center my-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[420px] space-y-5 font-montserrat text-[15px] text-[#757575]"
      >
        {/* Full Name */}
        <Input
          placeholder="Full Name"
          className="py-4 pl-5 h-auto"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}

        {/* Email */}
        <Input
          type="email"
          placeholder="Email Address"
          className="py-4 pl-5 h-auto"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password (optional) */}
        <Input
          type="password"
          placeholder="New Password (leave blank to keep current)"
          className="py-4 pl-5 h-auto"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Phone */}
        <div className="flex gap-2">
          <div className="w-[80px]">
            <Input
              className="py-4 text-center h-auto"
              type="text"
              value="+234"
              disabled
            />
          </div>
          <Input
            className="py-4 pl-5 h-auto"
            type="tel"
            placeholder="0xxxxxxxxx00"
            {...register("phone")}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}

        {/* Country */}
        <Controller
          name="address.country"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full bg-white py-4 pl-5 h-auto">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.address?.country && (
          <p className="text-red-500 text-sm">
            {errors.address.country.message}
          </p>
        )}

        {/* State and City */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Controller
              name="address.state"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger className="w-full bg-white py-4 pl-5 h-auto">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.address?.state && (
              <p className="text-red-500 text-sm">
                {errors.address.state.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!selectedState}
                >
                  <SelectTrigger className="w-full bg-white py-4 pl-5 h-auto">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.address?.city && (
              <p className="text-red-500 text-sm">
                {errors.address.city.message}
              </p>
            )}
          </div>
        </div>

        {/* Address Street */}
        <Input
          placeholder="Street Address"
          className="py-4 pl-5 h-auto"
          {...register("address.street")}
        />
        {errors.address?.street && (
          <p className="text-red-500 text-sm">
            {errors.address.street.message}
          </p>
        )}

        {/* Mutation status messages */}
        {mutation.isError && (
          <p className="text-red-500 text-sm">
            Error: {mutation.error.message}
          </p>
        )}

        {mutation.isSuccess && (
          <p className="text-green-500 text-sm">
            Profile updated successfully!
          </p>
        )}

        {/* Submit Button */}
        <div className="w-full mx-auto pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || mutation.isPending}
            className="w-full bg-secondary hover:bg-primary rounded-full py-6 text-white text-base disabled:opacity-50"
          >
            {mutation.isPending ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </section>
  );
}
