import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Upload, ChevronLeft, CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/store/useProfileSetupForm";
import {
  useSubmitIdentityDocument,
  useUploadIdentityDocument,
} from "@/hooks/useProfileFormSubmission";
import { IdentityDocumentFormData, identityDocumentSchema } from "@/lib/schema";
import { Calendar } from "../ui/calendar";

const idType = [
  { title: "National ID", value: "national_id" },
  { title: "Passport", value: "passport" },
  { title: "Driver's License", value: "drivers_license" },
  { title: "Voter's Card", value: "voters_card" },
];

interface StepThreeProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepThree({ onNext, onBack }: StepThreeProps) {
  const { identityDocument, updateIdentityDocument } = useFormStore();
  const submitIdentityDocument = useSubmitIdentityDocument();
  const uploadIdentityDoc = useUploadIdentityDocument();

  const [issueDate, setIssueDate] = useState<Date | undefined>(
    identityDocument.issueDate
  );
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    identityDocument.expiryDate
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<IdentityDocumentFormData>({
    resolver: zodResolver(identityDocumentSchema),
    defaultValues: {
      idType: identityDocument.idType || "",
      issuingAuthority: identityDocument.issuingAuthority || "",
      issueDate: identityDocument.issueDate,
      expiryDate: identityDocument.expiryDate,
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  console.log(form.formState.errors)
  const onSubmit = async (data: IdentityDocumentFormData) => {
    const formData = {
      ...data,
      issueDate,
      expiryDate,
    };

    try {
      // Upload file first if selected
      let documentUrl = "";
      if (selectedFile) {
        const result = await uploadIdentityDoc.mutateAsync(selectedFile);
        documentUrl = result.fileUrl;
      }

      updateIdentityDocument(formData);

      // Submit form data with file URL
      await submitIdentityDocument.mutateAsync({
        ...formData,
        documentUrl,
      });

      onNext();
    } catch (error) {
      console.error("Failed to submit identity document:", error);
    }
  };


  return (
    <div className="space-y-6 max-w-[418px] mx-auto">
      <div className="space-y-2">
        <button
          type="button"
          onClick={onBack}
          className="text-[#001E62] hover:text-[#fbbd35] flex items-center gap-2 text-sm"
        >
          <ChevronLeft size={20} className="text-[#fbbd35]" />
          Back to Career Experience
        </button>
        <h2 className="text-2xl font-semibold">
          <span className="text-[#001E62]">Identity</span>{" "}
          <span className="text-[#fbbd35]">Verification</span>
        </h2>
      </div>

      <Form {...form}>
        <div className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="idType"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                      <SelectValue placeholder="Select Means of Valid ID" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {idType.map((id) => (
                      <SelectItem key={id.title} value={id.value}>
                        {id.title}
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
            name="issuingAuthority"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                      <SelectValue placeholder="Select Issuing Authority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["NIMC", "FRSC", "NIS", "INEC"].map((auth) => (
                      <SelectItem key={auth} value={auth.toLowerCase()}>
                        {auth}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between focus:ring-0 focus:outline-none",
                  !issueDate && "text-muted-foreground"
                )}
                style={{ boxShadow: "none" }}
              >
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-secondary" />
                  {issueDate ? (
                    format(issueDate, "PPP")
                  ) : (
                    <span className="text-gray-400 font-normal">
                      Issuance Date{" "}
                      <span className="italic">(If available)</span>
                    </span>
                  )}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={issueDate}
                onSelect={(date) => {
                  setIssueDate(date);
                  form.setValue("issueDate", date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between focus:ring-0 focus:outline-none",
                  !expiryDate && "text-muted-foreground"
                )}
                style={{ boxShadow: "none" }}
              >
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-[#fbbd35]" />
                  {expiryDate ? (
                    format(
                      typeof expiryDate === "string"
                        ? parseISO(expiryDate)
                        : expiryDate,
                      "PPP"
                    )
                  ) : (
                    <span className="text-gray-400 font-normal">
                      Expiry Date <span className="italic">(If available)</span>
                    </span>
                  )}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={expiryDate}
                onSelect={(date) => {
                  setExpiryDate(date);
                  form.setValue("expiryDate", date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="space-y-4">
            <Label className="text-sm text-gray-700 block">
              Upload a copy of your valid ID
            </Label>

            <div className="flex justify-center gap-2 mb-2">
              <span className="text-xs text-gray-500">
                File formats allowed:
              </span>
              <span className="bg-[#E6F9E6] text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                JPG
              </span>
              <span className="bg-[#E6F0FF] text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                PNG
              </span>
              <span className="bg-[#F3F6FF] text-[#0395B7] px-2 py-0.5 rounded text-xs font-medium">
                PDF
              </span>
            </div>

            <div className="border border-dashed border-gray-300 p-4 rounded-xl text-center bg-[#F9F7F5]">
              <Upload
                className="mx-auto text-[#7C3AED] mb-2 cursor-pointer"
                size={32}
                onClick={handleUploadClick}
              />
              <Label
                className="block text-base text-gray-600 mb-1 font-medium cursor-pointer"
                onClick={handleUploadClick}
              >
                Select files here
              </Label>
              <span className="block text-xs text-gray-400 mb-2">
                (Max file size: 8mb)
              </span>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div className="mt-2 text-sm text-gray-700">
                  Selected: {selectedFile.name}
                </div>
              )}
            </div>

            {/* <FormField
              control={form.control}
              name="documentFile"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={
                submitIdentityDocument.isPending || uploadIdentityDoc.isPending
              }
              className="bg-secondary h-12 px-10 text-white rounded-full font-semibold"
            >
              {submitIdentityDocument.isPending || uploadIdentityDoc.isPending
                ? "Saving..."
                : "Continue To Introduction Video"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
