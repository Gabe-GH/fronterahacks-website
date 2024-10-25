"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createHacker } from "@/app/db/controllers";

import { useUser } from "@auth0/nextjs-auth0/client";

import {
  AgeInput,
  DietaryRestrictionInput,
  FirstNameInput,
  FormHeader,
  GenderInput,
  LastNameInput,
  ListInput,
  MajorInput,
  MLHCheckboxes,
  OrientationInput,
  PhoneInput,
  PronounsInput,
  RaceInput,
  StudyLevelInput,
  TeeSizeInput,
  UnderrepresentedInput,
} from "../views/FormField/FormField";

export default function Page() {
  const router = useRouter();
  const session = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    studyLevel: "",
    school: "n/a",
    country: "",
    diet: "",
    teeSize: "",
    underrepresentedInTech: "",
    gender: "",
    major: "",
    orientation: "",
    pronouns: "",
    race: "",
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [isValidForm, setValidForm] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      let updatedStudentStatus = false;

      if (
        newFormData.studyLevel.toLowerCase().includes("university") ||
        newFormData.studyLevel.toLowerCase().includes("doctorate")
      ) {
        setIsStudent(true);
        updatedStudentStatus = true;
      } else {
        newFormData.school = "n/a";
        setIsStudent(false);
        updatedStudentStatus = false;
      }

      const allCheckboxStatus =
        newFormData.checkbox1 && newFormData.checkbox2 && newFormData.checkbox3;

      const needSchoolData = updatedStudentStatus ? true : false;

      const areAllFieldsFilled =
        Object.values(newFormData).every((value) => value !== "") &&
        allCheckboxStatus;

      const isSchoolDataMissing =
        needSchoolData && newFormData.school === "n/a" ? true : false;
      // Update the validForm state based on the newly calculated status
      setValidForm(areAllFieldsFilled && !isSchoolDataMissing);

      return newFormData;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = session.user;

      if (!user) throw new Error("Not logged in");

      const email = user.email as string;

      const hacker = {
        ...formData,
        email,
      };

      await createHacker(hacker);
      router.push("/me");
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
      if (
        error.message !== "User already exists" &&
        error.message !== "Please properly fill out all fields"
      )
        setError("Server Error");
      else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mx-auto flex w-full max-w-sm flex-col gap-6"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* Form Header */}
      <FormHeader header_text={`Register for Frontera Hacks`} />

      <div className="form-group">
        {/* First Name */}
        <FirstNameInput
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        {/* Last Name */}
        <LastNameInput
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        {/* Age */}
        {/* <AgeInput name="age" value={formData.age} onChange={handleChange} /> */}
        <AgeInput name="age" value={formData.age} onChange={handleChange} />

        {/* Phone Number */}
        <PhoneInput
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        {/* Level of Study */}
        <StudyLevelInput
          name="studyLevel"
          value={formData.studyLevel}
          onChange={handleChange}
        />

        {/* School */}
        {isStudent && (
          <ListInput
            name="school"
            value={formData.school}
            onChange={handleChange}
          />
        )}

        {/* Country of Residence */}
        <ListInput
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

        {/* Diet */}
        <DietaryRestrictionInput
          name="diet"
          value={formData.diet}
          onChange={handleChange}
        />

        {/* T-shirt Sizes */}
        <TeeSizeInput
          name="teeSize"
          value={formData.teeSize}
          onChange={handleChange}
        />

        {/* Underrepresented Group in Tech */}
        <UnderrepresentedInput
          name="underrepresentedInTech"
          value={formData.underrepresentedInTech}
          onChange={handleChange}
        />

        {/* Gender */}
        <GenderInput
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />

        {/* Major / Field of Study */}
        <MajorInput
          name="major"
          value={formData.major}
          onChange={handleChange}
        />

        {/* Orientation */}
        <OrientationInput
          name="orientation"
          value={formData.orientation}
          onChange={handleChange}
        />

        {/* Pronouns */}
        <PronounsInput
          name="pronouns"
          value={formData.pronouns}
          onChange={handleChange}
        />

        {/* Race */}
        <RaceInput name="race" value={formData.race} onChange={handleChange} />

        {/* MLH Required Checkboxes w/ disclaimer */}
        <MLHCheckboxes
          name={["checkbox1", "checkbox2", "checkbox3"]}
          value={[formData.checkbox1, formData.checkbox2, formData.checkbox3]}
          onChange={handleChange}
        />

        {/* Register btn */}
        <div className="form-field pt-5 mb-16">
          <div className="form-control justify-between">
            <button
              type="submit"
              className={`btn btn-primary w-full disabled:opacity-85 disabled:bg-zinc-800 disabled:text-gray-500`}
              disabled={!isValidForm}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          {error && (
            <p className="text-center  text-red-500 bg-gray-900 m-auto">
              Error registering for event: {error}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
