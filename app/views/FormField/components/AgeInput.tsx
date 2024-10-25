import { memo, useState, useRef, useEffect } from "react";
import Image from "next/image";

import { GeneralFormType } from "@/app/types/FormTypes";

import styles from "@/app/views/FormField/FormField.module.css";

const AgeInput = memo(function AgeInput(props: GeneralFormType) {
  // age is for input value
  // isValidAge is for error message
  // intervalRef is for allowing change through held mouseClick
  const [age, setAge] = useState<number>(0);
  const [isValidAge, setIsValidAge] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // updates age value
  // included math floor because couldn't figure out how to disable / disallow user pressing '.'
  // isNaN statments included because empty input returns NaN
  //    NaN is NOT a valid age but did this to avoid error message staying displayed when input is filled then removed
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputString: string = event.target.value;

    // Remove all non-digit characters
    inputString = inputString.replace(/[^\d]/g, "");

    // If the input string is empty, set the age to -1 to indicate no input
    if (inputString === "") {
      setAge(0);
      setIsValidAge(true);
      props.onChange({
        ...event,
        target: {
          ...event.target,
          name: props.name,
          value: "",
        },
      });
      return;
    }

    // Parse the cleaned string as an integer
    let input = parseInt(inputString);

    if (input < 0 || input > 99) {
      setAge((prevAge) => prevAge);
      setIsValidAge(true);
      return;
    }

    // Handle NaN case
    if (isNaN(input)) {
      input = 0;
      setIsValidAge(true);
    } else {
      input = Math.floor(input);
      setAge(input);
      setIsValidAge(input >= 0 && input <= 99);
      props.onChange({
        ...event,
        target: {
          ...event.target,
          name: props.name,
          value: input.toString(),
        },
      });
    }
  };

  const disableKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    // Prevent entering `-` and `.` characters
    if (key === "." || key === "-") {
      event.preventDefault();
    }
  };

  /*
    // handleArrowClick(), handleMouseDown(), handleMouseUp(), useEffect()
    // These 4 allow changing age input through
    // holding mouse click
    // for Accessibilty support, 
    // not sure if best method or if necessary
    */

  // depending on which arrow is clicked, increments / decrements age
  const handleArrowClick = (direction: "up" | "down") => {
    setIsValidAge(true);
    setAge((prevAge) => {
      if (direction === "up" && prevAge < 99) {
        return prevAge + 1;
      } else if (direction === "down" && prevAge > 0) {
        return prevAge - 1;
      }

      return prevAge;
    });
  };

  // when mouse is clicked it'll call the function that updates age,
  // and keeping it clicked down will keep inc or dec age value
  const handleMouseDown = (direction: "up" | "down") => {
    handleArrowClick(direction);

    intervalRef.current = setInterval(() => {
      handleArrowClick(direction);
    }, 100);
  };

  // when mouse click is let go it stops inc / dec age value
  const handleMouseUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Clean up the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="form-field">
      <label className="form-label capitalize">age</label>
      <div className="form-control">
        <input
          placeholder="Enter age"
          name={props.name}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`${styles.ageInputField} ${
            isValidAge || age > 18 ? "" : "input-error"
          } input max-w-full`}
          value={isNaN(age) || age <= 0 ? "" : age}
          onChange={handleAgeChange}
          step={1}
          max={99}
          min={0}
          onKeyDown={disableKeys}
        />

        <span className="absolute inset-y-0 right-4 inline-flex items-center flex-col">
          <button
            onMouseDown={() => handleMouseDown("up")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            aria-label="Increase age"
            type="button"
          >
            <Image
              src={"angle-up-solid.svg"}
              width={5}
              height={5}
              alt="up arrow for age increment"
              className={`${styles.iconArrows} h-5 w-5 pt-1`}
            />
          </button>
          <button
            onMouseDown={() => handleMouseDown("down")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            aria-label="Decrease age"
            type="button"
          >
            <Image
              src={"angle-down-solid.svg"}
              width={5}
              height={5}
              alt=""
              className={`${styles.iconArrows} h-5 w-5 pb-1`}
            />
          </button>
        </span>
      </div>
      {isValidAge || age === -1 ? null : (
        <label className="form-label justify-start">
          <Image
            src={"error-triangle.svg"}
            width={5}
            height={5}
            alt=""
            className={`h-5 w-5 pb-1`}
          />
          <span
            className={`${styles.errorMessage} form-label-alt first-letter:capitalize`}
          >
            Please input a valid age.
          </span>
        </label>
      )}
    </div>
  );
});

export default AgeInput;
