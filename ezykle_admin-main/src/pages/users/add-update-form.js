import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { createUpdateAction } from "../../network/store/action/UserResponseAction";
import "./add-update-form.css"

const AddUpdateForm = (props) => {
  // TO get Callbacks
  const dispatch = useDispatch();
 // const [itemInfo, setItemInfo] = useState(props.itemInfo);

  // Page Form
  const [dataForm, setDataForm] = useState({
    displayname: "",
    mobilenumber: "", 
    // sharing: "",  
    email:"",
  });

  //Loading
  const [isAlertView, setIsAlertView] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isStoring, setIsStoring] = useState(false);


  const handleInputChanges = (e) => {
    if (e.target.name === "mobilenumber") {
      const numericValue = e.target.value.replace(/\D/g, '');
      const truncatedValue = numericValue.slice(0, 10);

      setDataForm({
        ...dataForm,
        [e.target.name]: truncatedValue,
      });
    } else {
      setDataForm({
        ...dataForm,
        [e.target.name]: e.target.value,
      });
    }
  };



  const onSubmtClick = async () => {
    let requestBody = {
      name: dataForm.displayname,
      phone: dataForm.mobilenumber,
      password:dataForm.mobilenumber,
      // email:dataForm.mobilenumber+'@mail.com',
      email: dataForm.email,
      status:"ACTIVE",
      role_id:props.roleId
    };

    await dispatch(createUpdateAction(requestBody)).then((response) => {
      setIsStoring(false);
      console.log(response.status);
      console.log(response.message);
      if (response.status === true) {
        // showAlert(response.message);
        if (props.onClose) props.onClose();
      } else {
        showAlert(response.result);
      }
    });
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertView(true);
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="row mt-5" style={{padding:'20px'}}>
            <div className="col-md-5 card-1 p-5 m-0">
              <h5 className="text-center dashboard-title">Add {props.pageName}</h5>

              <div className="col-md-12">
                <div className="form-group">
                  <label className="label-style"> Name</label>
                  <input
                    type="text"
                    name="displayname"
                    className="form-control"
                    value={dataForm.displayname}
                    onChange={(e) => handleInputChanges(e)}
                  />
                  {/* <label>Display Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={dataForm.name}
                    onChange={(e) => handleInputChanges(e)}
                  /> */}

                  {/* New input field for mobilenumber */}
                  <label className="label-style">Mobile Number</label>
                  <input
                    type="text"
                    name="mobilenumber"
                    className="form-control"
                    value={dataForm.mobilenumber}
                    onChange={(e) => handleInputChanges(e)}
                  />

                  {/* New input field for sharing */}
                  <label className="label-style">Email-Id</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={dataForm.email}
                    onChange={(e) => handleInputChanges(e)}
                   
                  />
                 

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      style={{ display: "flex", justifyContent: "center" }}
                      type="button"
                      className="s-button"
                      onClick={() => onSubmtClick()}
                    >
                      Submit
                    </button>
                    <button
                      className="c-button"
                      onClick={() => {
                        if (props.onClose) props.onClose();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdateForm;
