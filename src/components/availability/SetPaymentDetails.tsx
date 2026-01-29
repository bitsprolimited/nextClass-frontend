import { PaymentDetailsFormData, paymentDetailsSchema } from "@/lib/schema";
import { useAvailabilityStore } from "@/store/useAvailabilityStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Coins, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

// Mock banks array - replace with your actual data
const banks = [
  { id: 1, name: "First Bank", code: "011" },
  { id: 2, name: "Guaranty Trust Bank", code: "058" },
  { id: 3, name: "United Bank for Africa", code: "033" },
  { id: 4, name: "Zenith Bank", code: "057" },
  { id: 5, name: "Access Bank", code: "044" },
];

interface PaymentDetailsFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

function PaymentDetailsForm({ onNext }: PaymentDetailsFormProps) {
  const { formData, updateBankDetails, updatePricing } = useAvailabilityStore();

  const form = useForm<PaymentDetailsFormData>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: {
      ratePerSession: formData.pricing.ratePerSession || 0,
      bankDetails: {
        bankName: formData.bankDetails.bankName || "",
        accountNumber: formData.bankDetails.accountNumber || "",
        accountName: formData.bankDetails.accountName || "",
      },
    },
  });

  const onSubmit = (data: PaymentDetailsFormData) => {
    updatePricing({ ratePerSession: data.ratePerSession });
    updateBankDetails(data.bankDetails);
    onNext();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 px-5 py-6 bg-[#f5f5f5] rounded-xl"
      >
        <div className="flex flex-col items-start gap-1 flex-[0_0_auto]">
          <p className="font-semibold text-primary text-xl font-montserrat">
            Set Payment Details
          </p>
          <div className="flex items-start gap-1.5">
            <Separator className="bg-secondary w-5 h-1 rounded-full" />
            <Separator className="bg-secondary w-[7px] h-1 rounded-full" />
            <Separator className="bg-secondary w-[11px] h-1 rounded-full" />
          </div>
        </div>

        <Alert className="w-full px-[18px] py-3 bg-[#dae4fc] rounded-xl">
          <Info className="text-primary size-4" />
          <AlertDescription className="text-primary text-sm">
            This figure is how much gets to you for each session that you attend
            and teach students. You will not be paid for classes you did not
            attend
          </AlertDescription>
        </Alert>

        <div className="w-full flex flex-col gap-2">
          <div className="py-4 flex gap-4 flex-col p-6 border border-[#0A4D3C33] bg-white rounded-xl">
            <p className="flex items-center gap-2">
              <Coins className="text-secondary" />
              <span className="text-primary font-semibold">
                How much do you charge?
              </span>
            </p>

            <div className="flex items-center gap-5">
              <FormField
                control={form.control}
                name="ratePerSession"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="peer ps-6 pe-12 bg-[#dfddff66]"
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                        <span className="text-[#757575] pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          €
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-primary">
                Per Session <span className="text-secondary">*</span>
              </p>
            </div>
            <p className="text-sm text-secondary">Minimum: $10</p>
          </div>
          <p className="text-sm text-secondary text-right">
            A session is 1 hour
          </p>
        </div>

        <div className="py-4 flex gap-4 flex-col p-6 border border-[#0A4D3C33] bg-white rounded-xl">
          <p className="flex items-center gap-2">
            <Building2 className="text-secondary" />
            <span className="text-primary font-semibold">
              Enter Bank Details
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="bankDetails.bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Bank Name</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {banks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.name}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankDetails.accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Account Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#dfddff66] border-transparent shadow-none"
                      placeholder="Enter Account Number"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankDetails.accountName"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="sr-only">Account Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#dfddff66] border-transparent shadow-none"
                      placeholder="Enter Account Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between">
          <Button
            className="max-w-[300px] w-full h-[50px] bg-[#ffa300] rounded-full hover:bg-[#e89400] mx-auto"
            type="submit"
          >
            Proceed
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PaymentDetailsForm;
