"use client";

import React from "react";
import zxcvbn from "zxcvbn";

interface PasswordMeterProps {
  password: string;
}

const rules = {
  minLength: /.{6,}/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[#?!@$%^&*-]/,
  hasLowercase: /[a-z]/,
  hasUppercase: /[A-Z]/,
};

const PasswordMeter: React.FC<PasswordMeterProps> = ({ password }) => {
  const { score } = zxcvbn(password);

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return {
          label: "Poor Strength",
          color: "text-red-500",
          bar: "bg-red-400",
          border: "border-red-400",
        };
      case 2:
        return {
          label: "Fair Strength",
          color: "text-yellow-500",
          bar: "bg-yellow-400",
          border: "border-yellow-400",
        };
      case 3:
        return {
          label: "Good Strength",
          color: "text-blue-500",
          bar: "bg-blue-500",
          border: "border-blue-500",
        };
      case 4:
        return {
          label: "Strong Password",
          color: "text-green-600",
          bar: "bg-green-500",
          border: "border-green-500",
        };
      default:
        return {
          label: "Poor Strength",
          color: "text-red-500",
          bar: "bg-red-400",
          border: "border-red-400",
        };
    }
  };

  const level = getStrengthLabel(score);

  return (
    <div className="rounded-xl shadow-sm p-4 bg-white border border-gray-200 max-w-md w-full">
      <p className="text-sm font-medium text-gray-800 mb-1">
        Password Strength
      </p>

      <div
        className={`w-[60%] h-[4px] bg-[#FFD4D4] border ${level.border} rounded overflow-hidden mb-1`}
      >
        <div
          className={`${level.bar} h-full transition-all duration-300`}
          style={{ width: `${(score / 4) * 100}%` }}
        />
      </div>

      <p className={`text-xs font-medium ${level.color} mb-3`}>{level.label}</p>

      <div className="grid grid-cols-2 gap-y-1 gap-x-1 text-xs">
        <Rule
          label="6 or more characters"
          isValid={rules.minLength.test(password)}
          hint=""
        />
        <Rule
          label="At least one lowercase"
          isValid={rules.hasLowercase.test(password)}
          hint="- abcde"
        />
        <Rule
          label="A Numeric digit"
          isValid={rules.hasNumber.test(password)}
          hint="- 12345"
        />
        <Rule
          label="At least one uppercase"
          isValid={rules.hasUppercase.test(password)}
          hint="- ABC"
        />
        <Rule
          label="At least one special character"
          isValid={rules.hasSpecialChar.test(password)}
          hint="- #$%^&*!"
        />
      </div>
    </div>
  );
};

export default PasswordMeter;

interface RuleProps {
  label: string;
  isValid: boolean;
  hint?: string;
}

const Rule: React.FC<RuleProps> = ({ label, isValid, hint = "" }) => (
  <div className="flex items-center gap-1.5 w-full">
    <span
      className={`text-lg ${
        isValid ? "text-green-600" : "text-gray-800"
      }`}
    >
      •
    </span>
    <span>
      <span className={`${isValid ? "text-green-600 font-semibold" : ""}`}>
        {label}
      </span>{" "}
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
    </span>
  </div>
);
