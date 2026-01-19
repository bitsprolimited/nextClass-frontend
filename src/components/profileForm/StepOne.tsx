import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitBioData } from "@/hooks/useProfileFormSubmission";
import { BioDataFormData, bioDataSchema } from "@/lib/schema";
import { useFormStore } from "@/store/useProfileSetupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInputComponent from "../PhoneInput";
import { useEffect, useMemo } from "react";
import { Country, State, City } from "country-state-city";

interface StepOneProps {
  onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
  const { bioData, updateBioData } = useFormStore();
  const submitBioData = useSubmitBioData();

  const form = useForm<BioDataFormData>({
    resolver: zodResolver(bioDataSchema),
    defaultValues: {
      fullName: bioData.fullName || "",
      email: bioData.email || "",
      phoneNumber: bioData.phoneNumber || "",
      country: bioData.country || "",
      state: bioData.state || "",
      city: bioData.city || "",
      address: bioData.address || "",
      bio: bioData.bio || "",
    },
  });

  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");

  console.log(!!selectedState);
  

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

  const availableCities = cityList.map((c) => c.name);

  // Reset dependent fields when country/state changes
  useEffect(() => {
    form.setValue("state", "");
    form.setValue("city", "");
  }, [selectedCountry, form]);

  const onSubmit = async (data: BioDataFormData) => {
    updateBioData(data);

    try {
      await submitBioData.mutateAsync(data);
      onNext();
    } catch (error) {
      console.error("Failed to submit bio data:", error);
    }
  };

  return (
    <div className="space-y-6 max-w-[418px] mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">
          <span className="text-primary">Bio</span>{" "}
          <span className="text-secondary">Data</span>
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 w-full">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <PhoneInputComponent
                      className="bg-white border border-gray-300 rounded-lg text-gray-700 text-sm"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryList.map((country) => (
                      <SelectItem key={country.isoCode} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedCountry}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stateList.map((state) => (
                        <SelectItem key={state.isoCode} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedState}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Address (Optional)"
                    className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about yourself"
                    className="min-h-20 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={submitBioData.isPending}
            className="w-full bg-secondary h-12 text-white mt-6 rounded-full font-semibold"
          >
            {submitBioData.isPending
              ? "Saving..."
              : "Continue To Career Experience"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
