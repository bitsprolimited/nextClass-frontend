import { Label } from "@/components/ui/label"
import MultipleSelector, { Option } from "@/components/ui/multiselect"

const subjects: Option[] = [
  {
    value: "mathematics",
    label: "Mathematics",
  },
  {
    value: "english",
    label: "English Language",
  },
  {
    value: "physics",
    label: "Physics",
  },
  {
    value: "chemistry",
    label: "Chemistry",
  },
  {
    value: "biology",
    label: "Biology",
  },
  {
    value: "literature",
    label: "Literature in English",
  },
  {
    value: "government",
    label: "Government",
  },
  {
    value: "economics",
    label: "Economics",
  },
  {
    value: "geography",
    label: "Geography",
  },
  {
    value: "history",
    label: "History",
  },
  {
    value: "french",
    label: "French",
  },
  {
    value: "computer_science",
    label: "Computer Science",
  },
  {
    value: "agriculture",
    label: "Agricultural Science",
  },
  {
    value: "civic",
    label: "Civic Education",
  },
  {
    value: "commerce",
    label: "Commerce",
  },
  {
    value: "accounting",
    label: "Accounting",
  },
];

export default function Component() {
  // const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label>Multiselect</Label>
      <MultipleSelector
        commandProps={{
          label: "Select frameworks",
        }}
        value={subjects.slice(0, 2)}
        defaultOptions={subjects}
        placeholder="Select frameworks"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  )
}
