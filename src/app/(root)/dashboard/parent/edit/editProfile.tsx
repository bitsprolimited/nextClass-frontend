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

// Define schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(1, "Select a country"),
  state: z.string().min(1, "Select a state"),
  city: z.string().min(1, "Select a city"),
  address: z.string().min(5, "Enter a valid address"),
});

type ProfileFormSchema = z.infer<typeof profileSchema>;

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa"];
const nigerianStates = ["Lagos", "Abuja", "Kano", "Rivers", "Ogun"];
const cities = {
  Lagos: ["Ikeja", "Victoria Island", "Lekki", "Surulere"],
  Abuja: ["Garki", "Wuse", "Asokoro", "Maitama"],
};

export default function EditProfileForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      address: "",
    },
  });

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const onSubmit = (data: ProfileFormSchema) => {
    console.log("Form submitted:", data);
  };

  const availableCities =
    selectedState && cities[selectedState as keyof typeof cities]
      ? cities[selectedState as keyof typeof cities]
      : [];

  return (
    <section className="w-full flex justify-center items-center my-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[420px] space-y-5 font-Montserrat text-[15px] text-[#757575]"
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
          name="country"
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
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}

        {/* State and City */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Controller
              name="state"
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
                    {selectedCountry === "Nigeria" &&
                      nigerianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div className="flex-1">
            <Controller
              name="city"
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
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <Input
          placeholder="Address"
          className="py-4 pl-5 h-auto"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}

        {/* Submit Button */}
        <div className="w-full mx-auto pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary hover:bg-primary rounded-full py-6 text-white text-base disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </section>
  );
}
