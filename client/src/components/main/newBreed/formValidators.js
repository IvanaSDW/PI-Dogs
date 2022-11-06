export const validateName = (value, setErr) => {
  if (value.trim().length < 2) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        name: {
          touched: true,
          error: true,
          message:
            value.trim() === ""
              ? "This field is required"
              : "Name should have at least 2 chars",
        },
      };
    });
  } else {
    setErr((prevErr) => {
      return {
        ...prevErr,
        name: { touched: true, error: false, message: "" },
      };
    });
  }
};

const validateNumericField = (value) => {
  if (typeof value !== "number") {
    return {
      touched: true,
      error: true,
      message: "This field is required",
    };
  }

  if (value < 0) {
    return {
      touched: true,
      error: true,
      message: "Only non negative numbers allowed",
    };
  }

  return {
    touched: true,
    error: false,
    message: "",
  };
};

export const validateHeight = (
  minVal,
  maxVal,
  setErr,
  minTouched,
  maxTouched
) => {
  const minHeightErr = validateNumericField(minVal);
  const maxHeightErr = validateNumericField(maxVal);
  if (!minHeightErr.error && !maxHeightErr.error) {
    if (maxVal < minVal) {
      setErr((prevErr) => {
        return {
          ...prevErr,
          min_height: minHeightErr,
          max_height: {
            touched: true,
            error: true,
            message: "Max height should be higher than min height.",
          },
        };
      });
      return;
    }
  }
  if (minTouched) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        min_height: minHeightErr,
      };
    });
  }
  if (maxTouched) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        max_height: maxHeightErr,
      };
    });
  }
};

export const validateWeight = (
  minVal,
  maxVal,
  setErr,
  minTouched,
  maxTouched
) => {
  const minWeightErr = validateNumericField(minVal);
  const maxWeightErr = validateNumericField(maxVal);
  if (!minWeightErr.error && !maxWeightErr.error) {
    if (maxVal < minVal) {
      setErr((prevErr) => {
        return {
          ...prevErr,
          min_weight: minWeightErr,
          max_weight: {
            touched: true,
            error: true,
            message: "Max weight should be higher than min weight.",
          },
        };
      });
      return;
    }
  }
  if (minTouched) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        min_weight: minWeightErr,
      };
    });
  }
  if (maxTouched) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        max_weight: maxWeightErr,
      };
    });
  }
};

export const validateYears = (
  minVal,
  maxVal,
  setErr,
  minTouched,
  maxTouched
) => {
  const minYearsErr = validateNumericField(minVal);
  const maxYearsErr = validateNumericField(maxVal);
  if (!minYearsErr.error && !maxYearsErr.error) {
    if (maxVal < minVal) {
      setErr((prevErr) => {
        return {
          ...prevErr,
          min_years: minYearsErr,
          max_years: {
            touched: true,
            error: true,
            message: "Max years should be higher than min years.",
          },
        };
      });
      return;
    }
  }
  if (minTouched) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        min_years: minYearsErr,
      };
    });
  }
  if (maxTouched) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        max_years: maxYearsErr,
      };
    });
  }
};

export const validateTemperaments = (value, setErr) => {
  if (!Array.isArray(value)) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        temperaments: {
          ...prevErr.temperaments,
          error: true,
          message: "This is not an array",
        },
      };
    });
    return;
  }

  if (value.length < 1) {
    setErr((prevErr) => {
      return {
        ...prevErr,
        temperaments: {
          ...prevErr.temperaments,
          error: true,
          message: "Please add at least one temperament",
        },
      };
    });
    console.log('validated temperamentes when lenght was: ', value.length)
    return;
  }

  setErr((prevErr) => {
    return {
      ...prevErr,
      temperaments: {
        ...prevErr.temperaments,
        error: false,
        message: "",
      },
    };
  });
};

export const validateAll = (formState, fieldErrors, setErr) => {
  if (fieldErrors.name.touched) validateName(formState.name, setErr);
  validateHeight(
    formState.min_height,
    formState.max_height,
    setErr,
    fieldErrors.min_height.touched,
    fieldErrors.max_height.touched
  );
  validateWeight(
    formState.min_weight,
    formState.max_weight,
    setErr,
    fieldErrors.min_weight.touched,
    fieldErrors.max_weight.touched
  );
  validateYears(
    formState.min_years,
    formState.max_years,
    setErr,
    fieldErrors.min_years.touched,
    fieldErrors.max_years.touched
  );

  if (fieldErrors.temperaments.touched)
    validateTemperaments(formState.temperaments, setErr);
};
