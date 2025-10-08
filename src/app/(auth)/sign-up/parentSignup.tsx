"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Country, State, City } from "country-state-city";

import PasswordMeter from "@/components/auth/passwordMeter";
import VerifyEmailAlert from "@/components/auth/verify-email-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { parentSignupFormSchema, ParentSignupFormSchema } from "@/lib/schema";
import { parentSignup } from "@/services/auth.service";
import { AuthResponse, AxioErrorResponse } from "@/types";

type ParentSignupFormWithAddress = ParentSignupFormSchema & {
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
};

export default function ParentSignupForm() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ParentSignupFormSchema>({
    resolver: zodResolver(parentSignupFormSchema),
    mode: "all",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      street: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
      confirmAge: false,
    },
  });

  const password = watch("password");
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  // Dynamic dropdowns
  const countryList = useMemo(() => Country.getAllCountries(), []);
  const stateList = useMemo(() => {
    if (!selectedCountry) return [];
    const countryObj = countryList.find(
      (c) => c.name === selectedCountry || c.isoCode === selectedCountry
    );
    return countryObj ? State.getStatesOfCountry(countryObj.isoCode) : [];
  }, [selectedCountry, countryList]);

  const cityList = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];
    const countryObj = countryList.find(
      (c) => c.name === selectedCountry || c.isoCode === selectedCountry
    );
    if (!countryObj) return [];
    const stateObj = stateList.find(
      (s) => s.name === selectedState || s.isoCode === selectedState
    );
    return countryObj && stateObj
      ? City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode)
      : [];
  }, [selectedCountry, selectedState, countryList, stateList]);

  // Reset dependent fields when country/state changes
  useEffect(() => {
    setValue("state", "");
    setValue("city", "");
  }, [selectedCountry, setValue]);

  useEffect(() => {
    setValue("city", "");
  }, [selectedState, setValue]);

  // ✅ Fix: define availableCities once only
  const availableCities = cityList.map((c) => c.name);

  const { mutate, isPending } = useMutation<
    AuthResponse,
    AxiosError<AxioErrorResponse>,
    ParentSignupFormWithAddress
  >({
    mutationKey: ["parentSignup"],
    mutationFn: parentSignup,
    onSuccess: () => {
      toast("Signup successful", {
        className: "bg-[#F5F4F8] text-[#031D95]",
        duration: 5000,
      });
      setOpen(true);
    },
    onError: (error) => {
      toast("Signup failed", {
        className: "bg-[#F5F4F8] text-[#031D95]",
        description: error.response?.data.message,
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: ParentSignupFormSchema) => {
    const transformedData = {
      ...data,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
      },
    };
    mutate(transformedData);
  };

  return (
    <div className="flex flex-col items-end w-full md:w-[70%] mx-auto">
      {/* Switch to Tutor Signup */}
      <Link href="/signup/tutor" className="my-4">
        <Button className="bg-[#F5F4F8] text-[20px] text-[#031D95] hover:text-white px-4 py-3 rounded-full font-aero-trial">
          Sign Up as Tutor
        </Button>
      </Link>

      {/* Form Section */}
      <section className="w-full mb-5 bg-[#F5F4F8] py-10 px-4 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">
                Parents&apos;{" "}
                <span className="text-[#FFA300]">Registration</span>
              </h2>

              {/* Full Name */}
              <Input
                placeholder="Full Name"
                {...register("fullName")}
                className="py-4 pl-5 h-auto w-full"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}

              {/* Email */}
              <Input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className="py-4 pl-5 h-auto w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              {/* Phone */}
              <div className="flex gap-2">
                <div className="w-[80px]">
                  <Input
                    value="+234"
                    disabled
                    className="py-4 text-center h-auto"
                  />
                </div>
                <Input
                  type="tel"
                  placeholder="0xxxxxxxxx00"
                  {...register("phone")}
                  className="py-4 pl-5 h-auto flex-1"
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
                      {countryList.map((country) => (
                        <SelectItem key={country.isoCode} value={country.name}>
                          {country.name}
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
              <div className="flex flex-col md:flex-row gap-2">
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
                        <SelectTrigger className="bg-white py-4 pl-5 h-auto">
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
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
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
                        <SelectTrigger className="bg-white py-4 pl-5 h-auto">
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
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Street */}
              <Input
                placeholder="Street Address"
                {...register("street")}
                className="py-4 pl-5 h-auto w-full"
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}

              {/* Password */}
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="py-4 pl-5 h-auto w-full"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <div className="mt-2 block md:hidden">
                  <PasswordMeter password={password || ""} />
                </div>
                <div className="hidden md:block absolute left-full ml-5 top-1/2 w-full">
                  <PasswordMeter password={password || ""} />
                </div>
              </div>

              {/* Confirm Password */}
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="py-4 pl-5 h-auto w-full"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and Age Confirmation */}
            <div className="space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register("agreeTerms")}
                  className="accent-orange-500 mt-1"
                />
                <span>
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-blue-500 underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("confirmAge")}
                  className="accent-orange-500"
                />
                I confirm that I&apos;m 18 years or older
              </label>
            </div>

            {/* Submit */}
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                className="w-full bg-[#FFA300] hover:bg-primary rounded-full py-6 text-white text-base disabled:opacity-50"
              >
                {isSubmitting || isPending
                  ? "Creating Account..."
                  : "Create An Account"}
              </Button>
            </div>

            {/* Social Signup */}
            <p className="text-sm text-center text-gray-500">
              You can also sign up with:
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
              <Button
                type="button"
                className="bg-primary hover:bg-secondary rounded-full px-6 py-4 flex items-center gap-2 shadow-sm border w-full md:w-auto"
              >
                <FaGoogle className="w-5 h-5" />
                Sign Up With Google
              </Button>
              <Button
                type="button"
                className="bg-primary hover:bg-secondary rounded-full px-6 py-4 flex items-center gap-2 shadow-sm w-full md:w-auto"
              >
                <FaApple className="w-5 h-5" />
                Sign Up With Apple
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-gray-800 w-[60%] mx-auto" />
          <p className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </div>
      </section>

      <VerifyEmailAlert open={open} onOpenChange={setOpen} />
    </div>
  );
}
