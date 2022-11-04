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
  console.log("touched min/max:", minTouched, "/", maxTouched);
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
  console.log("touched min/max:", minTouched, "/", maxTouched);
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
