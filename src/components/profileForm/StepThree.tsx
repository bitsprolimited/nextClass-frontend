import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFileUpload } from "@/hooks/use-file-upload";
import {
  useSubmitIdentityDocument,
  useUploadIdentityDocument,
} from "@/hooks/useProfileFormSubmission";
import { IdentityDocumentFormData, identityDocumentSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/store/useProfileSetupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FileUploader from "../FileUploader";
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

  const maxSize = 8 * 1024 * 1024; // 8MB

  // Create initial files array from documentUrl if it exists
  const getInitialFiles = () => {
    if (identityDocument.documentUrl) {
      return [
        {
          name:
            identityDocument.documentUrl.split("/").pop() ||
            "identity-document",
          size: 0, // We don't know the size from URL
          type: "application/pdf",
          url: identityDocument.documentUrl,
          id: `id-doc-${Date.now()}`,
        },
      ];
    }
    return [];
  };

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
    initialFiles: getInitialFiles(),
    accept: "image/png,image/jpeg,image/jpg",
  });

  const form = useForm<IdentityDocumentFormData>({
    resolver: zodResolver(identityDocumentSchema),
    defaultValues: {
      idType: identityDocument.idType || "",
      issuingAuthority: identityDocument.issuingAuthority || "",
      issueDate: identityDocument.issueDate,
      expiryDate: identityDocument.expiryDate,
    },
  });

  const onSubmit = async (data: IdentityDocumentFormData) => {
    const formData = {
      ...data,
      issueDate,
      expiryDate,
    };

    try {
      // Upload file first if selected
      let documentUrl = identityDocument.documentUrl || "";
      if (files.length > 0 && files[0].file && files[0].file.size > 0) {
        const result = await uploadIdentityDoc.mutateAsync(files[0].file);
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

          {/* Issuance Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between focus:ring-0 focus:outline-none hover:bg-transparent",
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

            <PopoverContent
              align="start"
              sideOffset={6}
              className="w-[360px] p-0"
            >
              <Calendar
                mode="single"
                selected={issueDate}
                onSelect={setIssueDate}
                captionLayout="dropdown"
                fromYear={1970}
                toYear={new Date().getFullYear() + 10}
                className="rounded-md border shadow-sm p-7 w-full"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between focus:ring-0 focus:outline-none hover:bg-transparent",
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
            <PopoverContent
              align="start"
              sideOffset={6}
              className="w-[360px] p-0"
            >
              <Calendar
                mode="single"
                selected={expiryDate}
                onSelect={setExpiryDate}
                captionLayout="dropdown"
                fromYear={1970}
                toYear={new Date().getFullYear() + 10}
                className="rounded-md border shadow-sm p-7 w-full"
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

            <FileUploader
              files={files}
              isDragging={isDragging}
              errors={errors}
              handleDragEnter={handleDragEnter}
              handleDragLeave={handleDragLeave}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              openFileDialog={openFileDialog}
              removeFile={removeFile}
              getInputProps={getInputProps}
              maxSize={maxSize}
            />
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
