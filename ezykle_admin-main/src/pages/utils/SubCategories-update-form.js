import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateAction } from "../../network/store/action/SubCategoriesResponseAction";
import "./App-update.css"
import { listAction } from "../../network/store/action/SubCategoriesResponseAction";

const SubCategoriesUpdateForm = (props) => {
  // TO get Callbacks
  const dispatch = useDispatch();
  // const [itemInfo, setItemInfo] = useState(props.itemInfo);

  // Page Form
  const [dataForm, setDataForm] = useState({
    displayname: "",
    // mobilenumber: "",
    // sharing: "",
  });

  //Loading
  const [isAlertView, setIsAlertView] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isStoring, setIsStoring] = useState(false);
  const [itemInfo, setItemInfo] = useState(props.itemInfo);
  const [resultList, setResultList] = useState([]);


  useEffect(() => {
    if (itemInfo) {
      let updateValues = {
        displayname: itemInfo.name,
      };
      setDataForm(updateValues);
    }
    getList();
  }, []);
  const getList = async () => {
    await dispatch(
      listAction(
        {
          limit: 100,
          offset: 0,
          roleId: "2",
        },
        dispatch
      )
    ).then((reponse) => {
      if (reponse.result) {
        setResultList(reponse.result);
       
      }
    });
  };
  const handleChanges = (e) => {
    console.log('SDebug > handleChanges', e);
    if (e.target.name === 'sectionId') {
      //const sectionIdex = resultList.findIndex(obj => obj.id === e.target.value);
      setDataForm({ ...dataForm, "sectionId": e.target.value })
    }
  }
  const handleInputChanges = (e) => {
    if (e.target.name === "mobilenumber") {
      const numericValue = e.target.value.replace(/\D/g, "");
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
    };
    if (itemInfo.hasOwnProperty("id")) {
        requestBody.id = itemInfo.id;
      }else{

        requestBody.sectionId = dataForm.sectionId;
      }


    await dispatch(updateAction(requestBody)).then((response) => {
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
          <div className="row mt-5" style={{ padding: "20px" }}>
            <div className="col-md-5 card-1 p-5 m-0">
              <h5 className="text-center dashboard-title">
                {/* Add {props.pageName} */}
                Add Option
              </h5>

              <div className="col-md-12">
                <div className="form-group">

                  { props.pageOption ==="add"  && (
                    <>
                     <label>Section</label>
                <select name="sectionId" className="form-select" onChange={(e) => handleChanges(e)} value={dataForm.sectionId}>
                <option value={''}>{'--Select Section--'}</option>
                {resultList && resultList.length > 0 && resultList.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>{item.name}</option>
                  )
                })}
              </select>
                    </>
                  )}
               
                  <label className="label-style"> Name</label>
                  <input
                    type="text"
                    name="displayname"
                    className="form-control"
                    value={dataForm.displayname}
                    onChange={(e) => handleInputChanges(e)}
                  />
                  

                  {/* New input field for mobilenumber */}
                  {/* <label className="label-style">Mobile Number</label>
                  <input
                    type="text"
                    name="mobilenumber"
                    className="form-control"
                    value={dataForm.mobilenumber}
                    onChange={(e) => handleInputChanges(e)}
                  /> */}

                  {/* New input field for sharing
                  <label className="label-style">Sharing(%)</label>
                  <input
                    type="text"
                    name="sharing"
                    className="form-control"
                    value={dataForm.sharing}
                    onChange={(e) => handleInputChanges1(e)}
                  />
                  <label className="label-style">Remaining Sharing(%)</label>
                  <input
                    type="text"
                    name="remainingSharing"
                    className="form-control"
                    value={dataForm.remainingSharing}
                    readOnly
                  /> */}

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

export default SubCategoriesUpdateForm;
