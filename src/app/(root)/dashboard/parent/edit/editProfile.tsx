"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormSchema } from "@/lib/schema";
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
import { updateParentProfile } from "@/services/profile.service";
import { useEffect, useMemo } from "react";
import { Country, State, City } from "country-state-city";
import { toast } from "sonner";

// Dynamic country, state, city lists
const countryList = Country.getAllCountries();

// Define props interface
interface EditProfileFormProps {
  userId: string;
  userDetails: ProfileFormSchema;
}

export default function EditProfileForm({
  userId,
  userDetails,
}: EditProfileFormProps) {
  const queryClient = useQueryClient();

  // Update user mutation
  const mutation = useMutation({
    mutationFn: (payload: { userId: string; data: ProfileFormSchema }) =>
      updateParentProfile(payload.userId, {
        fullName: payload.data.fullName ?? "",
        phoneNumber: payload.data.phone ?? "",
        address: {
          street: payload.data.address.street,
          city: payload.data.address.city,
          state: payload.data.address.state,
          country: payload.data.address.country,
        },
      }),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
    onError: (error) => {
      toast.error("Failed to update profile");
      console.error("Update error:", error);
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

  useEffect(() => {
    if (userDetails) {
      reset({
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

  // Get states for selected country
  const stateList = useMemo(() => {
    if (!selectedCountry) return [];
    const countryObj = countryList.find(
      (c) => c.name === selectedCountry || c.isoCode === selectedCountry
    );
    return countryObj ? State.getStatesOfCountry(countryObj.isoCode) : [];
  }, [selectedCountry]);

  // Get cities for selected state
  const cityList = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];
    const countryObj = countryList.find(
      (c) => c.name === selectedCountry || c.isoCode === selectedCountry
    );
    const stateObj = stateList.find(
      (s) => s.name === selectedState || s.isoCode === selectedState
    );
    return countryObj && stateObj
      ? City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode)
      : [];
  }, [selectedCountry, selectedState, stateList]);

  const onSubmit = (data: ProfileFormSchema) => {
    mutation.mutate({ userId, data });
  };

  const availableCities = cityList;

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
          disabled
        />
        {/* {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )} */}

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
                {countryList.map((country) => (
                  <SelectItem key={country.isoCode} value={country.name}>
                    {country.name}
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
                    {stateList.map((state) => (
                      <SelectItem key={state.isoCode} value={state.name}>
                        {state.name}
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
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
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
