import React from "react";

const ApplyForm = ({
  name,
  email,
  mobile,
  resume,
  sop,
  setName,
  setEmail,
  setMobile,
  setResume,
  setSop,
  handleApply,
}) => {
  return (
    <div>
      <form onSubmit={handleApply}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile No
          </label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="resume" className="form-label">
            Resume Link{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="resume"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            SOP
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            value={sop}
            onChange={(e) => setSop(e.target.value)}
          />
        </div>
        <button  class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
