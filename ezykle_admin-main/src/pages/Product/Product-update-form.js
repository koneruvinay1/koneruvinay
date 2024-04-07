import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  listAction,
  createUpdateAction,
} from "../../network/store/action/CategoriesResponseAction";
import "../Product/Product-update-form.css";
import { listAction as categoryListAction } from "../../network/store/action/CategoriesResponseAction";
import { listAction as subcategoriesListAction } from "../../network/store/action/SubCategoriesResponseAction";
const ProductUpdateForm = (props) => {
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState({
    displayname: "",
    quantity: "",
    mrp: "",
    discountPrice: "",
    description: "",
  });

  //Loading
  const [isAlertView, setIsAlertView] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isStoring, setIsStoring] = useState(false);
  const [itemInfo, setItemInfo] = useState(props.itemInfo);
  const [resultList, setResultList] = useState([]);

  const [sectionList, setSectionList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [productAddForm, setproductAddForm] = useState({
    sectionId: "",
  });

  useEffect(() => {
    getList();
    getSections1();
    getSections();
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
    console.log("SDebug > handleChanges", e);
    if (e.target.name === "sectionId") {
      //const sectionIdex = resultList.findIndex(obj => obj.id === e.target.value);
      setDataForm({ ...dataForm, sectionId: e.target.value });
    }
  };
  const handleInputChanges5 = (e) => {
    console.log('SDebug > handleChanges', e);
    if (e.target.name === 'categoryId') {
      setproductAddForm({ ...productAddForm, "categoryId": e.target.value })
    } 
  }

  const handleInputChanges = (e) => {
    if (e.target.name === "mobilenumber") {
    } else if (e.target.name === "quantity") {
      const numericValue = e.target.value.replace(/\D/g, "");
      const truncatedValue = numericValue.slice(0, 3);

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
  const handleInputChanges1 = (e) => {
    if (e.target.name === "description") {
      const descriptionValue = e.target.value;
      const truncatedDescription = descriptionValue.slice(0, 100);

      setDataForm({
        ...dataForm,
        [e.target.name]: truncatedDescription,
      });
    } else {
      setDataForm({
        ...dataForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleInputChanges2 = (e) => {
    if (e.target.name === "description") {
      const descriptionValue = e.target.value;
      const words = descriptionValue.split(/\s+/);
      const truncatedDescription = words.slice(0, 100).join(" ");

      setDataForm({
        ...dataForm,
        [e.target.name]: truncatedDescription,
      });
    } else {
      setDataForm({
        ...dataForm,
        [e.target.name]: e.target.value,
      });
    }
  };
  const getSections = async () => {
    await dispatch(
      categoryListAction({ limit: 100, offset: 0 }, dispatch)
    ).then((response) => {
      console.log("sectionList", response.result);
      if (response.result) {
        setSectionList(response.result);
      }
    });
  };
  const getSections1 = async () => {
    await dispatch(subcategoriesListAction({limit:100,offset:0}, dispatch )).then((response) => {
      console.log('sectionList1', response.result);
      if (response.result) {
        setCategoryList(response.result);
      }
    });

  }

  const onSubmtClick = async () => {
    let requestBody = {
      name: dataForm.displayname,
    };
    if (itemInfo.hasOwnProperty("id")) {
      requestBody.id = itemInfo.id;
    } else {
      requestBody.sectionId = dataForm.sectionId;
    }

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
          <div className="row mt-5" style={{ padding: "21px" }}>
            <div className="col-md-5 card-1 p-4 m-5">
              <h5>
                {/* Add {props.pageName} */}
                Add Product
              </h5>

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

                  <div className="prices-container">
                    <div className="prices">
                      <label className="label-style"> Quantity</label>
                      <input
                        type="mobilenumber"
                        name="quantity"
                        className="form-control"
                        value={dataForm.quantity}
                        onChange={(e) => handleInputChanges(e)}
                      />
                    </div>

                    <div className="prices">
                      <label className="label-style">Mrp</label>
                      <input
                        type="number"
                        name="mrp"
                        className="form-control"
                        value={dataForm.mrp}
                        onChange={(e) => handleInputChanges(e)}
                      />
                    </div>

                    <div className="prices">
                      <label className="label-style">Discount Price</label>
                      <input
                        type="number"
                        name="discountPrice"
                        className="form-control"
                        value={dataForm.discountPrice}
                        onChange={(e) => handleInputChanges(e)}
                      />
                    </div>
                  </div>
                  <label className="label-style">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={dataForm.description}
                    onChange={(e) => handleInputChanges2(e)}
                  />
                  <div className="prices-container">
                    <div className="costprice">
                      <label className="label-style">CGST</label>
                      <input
                        type="number"
                        name="cgst"
                        className="form-control"
                        value={dataForm.cost}
                        onChange={(e) => handleInputChanges(e)}
                      />
                    </div>

                    <div className="costprice">
                      <label className="label-style"> SGST</label>
                      <input
                        type="number"
                        name="sgst"
                        className="form-control"
                        value={dataForm.SGST}
                        onChange={(e) => handleInputChanges(e)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
  <div className="form-group">
    <label>Section</label>
    <select
      name="sectionId"
      className="form-select"
      onChange={(e) => handleChanges(e)}
      value={productAddForm.sectionId}
    >
      <option value={""}>{"CategoryList"}</option>
      {sectionList &&
        sectionList.length > 0 &&
        sectionList.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
    </select>
  </div>

  <div className="form-group">
    <label>Category</label>
    <select
      name="categoryId"
      className="form-select"
      onChange={(e) => handleInputChanges5(e)}
      value={productAddForm.categoryId}
    >
      <option value={''}>{"SubCategoryList"}</option>
      {categoryList &&
        categoryList.length > 0 &&
        categoryList.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
    </select>
  </div>
</div>


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

export default ProductUpdateForm;
