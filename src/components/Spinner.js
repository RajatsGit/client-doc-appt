import React from "react";

const Spinner = () => {
  return (
    <>
      <div class="d-flex justify-content-center spinner">
        <button class="btn btn-primary" type="button" disabled>
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    </>
  );
};

export default Spinner;
