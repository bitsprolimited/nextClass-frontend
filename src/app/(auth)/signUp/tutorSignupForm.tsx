import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PasswordMeter from "@/components/auth/passwordMeter";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Link } from "lucide-react";

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa"];

export default function TutorSignupForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [confirmAge, setConfirmAge] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-end w-[70%] mx-auto">
      <a href="/parentSignup">
        <Button className="mb-4 bg-[#F5F4F8] text-[20px] text-[#031D95] px-4 py-3 rounded-full">
          Sign up as a parent
        </Button>
      </a>

      <section className="w-full mb-5 bg-[#F5F4F8] py-10 px-2 md:px-4 lg:px-6 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <form className="mt-8 space-y-5">
            <div className="w-[70%] mx-auto space-y-5">
              <h2 className=" text-2xl font-semibold">
                Tutors’ <span className="text-[#FFA300]">Registration</span>
              </h2>
              <Input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              <Select
                value={form.country}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, country: val }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <div className="space-y-5">
                  {/* Phone Input with Country Code */}
                  <div className="flex gap-2">
                    <div className="w-[80px]">
                      <Input
                        type="text"
                        value="+234"
                        disabled
                        className="text-center"
                      />
                    </div>
                    <Input
                      type="tel"
                      placeholder="0xxxxxxxxx00"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Fields + Floating Meter */}

                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                {/* Floating password meter to the right */}
                <div className="absolute top-[-5] left-full ml-4 w-[320px]">
                  <PasswordMeter password={form.password} />
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="accent-orange-500 mt-1"
                />
                <span>
                  By clicking Create Account or Sign Up with Google or Apple,
                  you agree to our{" "}
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
                  checked={confirmAge}
                  onChange={() => setConfirmAge(!confirmAge)}
                  className="accent-orange-500"
                />
                I confirm that I'm 18 years of age or older
              </label>
            </div>

            {/* Submit Button */}
            <div className="w-[70%] mx-auto flex justify-center">
              <Button
                type="submit"
                className="w-full bg-[#FFA300] hover:bg-gray-800 rounded-full py-6 text-white text-base"
              >
                Create An Account
              </Button>
            </div>

            <p className="text-sm text-center text-gray-500">
              You can also sign up with:
            </p>

            {/* Google/Apple Buttons */}
            <div className="flex gap-4 justify-center mt-4">
              <Button className="g-blue-900 text-white rounded-full px-6 py-4 flex items-center gap-2 shadow border">
                <FaGoogle className="w-5 h-5" />
                Sign Up With Google
              </Button>
              <Button className="bg-blue-900 text-white rounded-full px-6 py-4 flex items-center gap-2 shadow">
                <FaApple className="w-5 h-5" />
                Sign Up With Apple
              </Button>
            </div>
          </form>
          <div className="my-6 border-t border-gray-800 w-[60%] mx-auto" />
          <p className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline">
              Login
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
