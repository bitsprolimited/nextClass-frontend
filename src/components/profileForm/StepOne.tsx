import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormStore } from "@/store/useProfileSetupForm";
import { useSubmitBioData } from "@/hooks/useProfileFormSubmission";
import { BioDataFormData, bioDataSchema } from "@/lib/schema";

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
            <div className="flex-[0.4] relative">
              <input
                type="text"
                value="+234"
                disabled
                className="h-12 w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 text-sm outline-none"
              />
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-orange-500 text-xs pointer-events-none">
                <ChevronDown size={20} className="text-secondary" />
              </div>
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="0xxxxxxxxx00"
                      className="h-12 bg-white border border-gray-300 rounded-lg px-4 text-gray-700 text-sm"
                      {...field}
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
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                    <SelectItem value="Ghana">Ghana</SelectItem>
                    <SelectItem value="Kenya">Kenya</SelectItem>
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
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Lagos">Lagos</SelectItem>
                      <SelectItem value="Abuja">Abuja</SelectItem>
                      <SelectItem value="Rivers">Rivers</SelectItem>
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
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ikeja">Ikeja</SelectItem>
                      <SelectItem value="Victoria Island">
                        Victoria Island
                      </SelectItem>
                      <SelectItem value="Lekki">Lekki</SelectItem>
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
                    className="min-h-[80px] border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white resize-none"
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
