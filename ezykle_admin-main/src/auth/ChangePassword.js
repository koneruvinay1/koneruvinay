import React from "react";
import { useState } from "react";

function ChangePassword() {
  const [changePasswordForm, setChangePasswordForm] = useState({
    oldpassword: "",
    newpassword: "",
    retypepassword: "",
  });

  const handleChanges = (e) => {
    setChangePasswordForm({...changePasswordForm,[e.target.name]:e.target.value})
    
    
  };
  const ChangePassword = () => {
    alert("sdhsdh")
    setChangePasswordForm(
        {
            oldpassword: "",
            newpassword: "",
            retypepassword: "",
          }
    );

  };
  return (
    <>
      <div className="card bg-glass">
        <div className="card-body px-md-5" style={{backgroundColor:'grey'}}>
          <div className="text-center">
            <h3 style={{fontSize:'24px',color:'#146578'}}>Change Password</h3>
          </div>

          <br />
          <div className="form-outline mb-4">
            <label className="form-label">
              Old Password
            </label>
            <input
              type="password"
              name="oldpassword"
              onChange={handleChanges}
              className="form-control"
              placeholder="old password"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              onChange={handleChanges}
              className="form-control"
              placeholder="New Password"
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">
              Retype Password
            </label>
            <input
              type="password"
              name="retypepassword"
              onChange={handleChanges}
              className="form-control"
              placeholder="Retype Password"
            />
          </div>

          <div className="text-center pt-1 mb-5 pb-1">
            <button style={{backgroundColor:'#146578',borderRadius:'6px'}}
              onClick={ ChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
