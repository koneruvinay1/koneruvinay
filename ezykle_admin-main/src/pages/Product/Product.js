import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  listAction,
  createUpdateAction,
} from "../../network/store/action/ProductResponseAction";
import GMCTPagination from "../../components/pagination";
import { FaUserLock, FaTrash } from "react-icons/fa";
import ProductUpdateForm from "./Product-update-form";
import { listAction as categoryListAction } from "../../network/store/action/CategoriesResponseAction";
import { listAction as subcategoriesListAction } from "../../network/store/action/SubCategoriesResponseAction";
function Product() {
  // to get api data

  const dispatch = useDispatch();
  const [ProductName, setProductName] = useState("");

  // list of items
  const [resultList, setResultList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [productAddForm, setproductAddForm] = useState({
    "section  Id": "",
  });

  const [selectedForEdit, setSelectedForEdit] = useState({});
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    getSections();
    getSections1();
    geList();
  }, []);

  const handleClientNameChange = (e) => {
    setProductName(e.target.value);
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
    await dispatch(
      subcategoriesListAction({ limit: 100, offset: 0 }, dispatch)
    ).then((response) => {
      console.log("sectionList1", response.result);
      if (response.result) {
        setCategoryList(response.result);
      }
    });
  };
  const geList = async () => {
    await dispatch(
      listAction(
        {
          limit: 500,
          offset: 0,
          role: "Product",
        },
        dispatch
      )
    ).then((reponse) => {
      if (reponse.result) {
        setResultList(reponse.result);
      } else {
        resetFilter();
      }
    });
  };

  const editItem = (item) => {
    setSelectedForEdit(item);
    setShowRequestForm(true);
  };

  const onCloseEvent = () => {
    setShowRequestForm(false);
    setResultList([]);
    setSelectedForEdit({});

    geList();
  };

  const resetFilter = () => {
    setResultList([]);
  };

  const handleChanges = (e) => {
    console.log("SDebug > handleChanges", e);
    if (e.target.name === "sectionId") {
      setproductAddForm({ ...productAddForm, sectionId: e.target.value });
    }
  };
  const handleInputChanges1 = (e) => {
    console.log("SDebug > handleChanges", e);
    if (e.target.name === "categoryId") {
      setproductAddForm({ ...productAddForm, categoryId: e.target.value });
    }
  };

  return (
    <>
      {showRequestForm && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            zIndex: "999",
            overflow: "scroll",
          }}
        >
          <div className="d-flex align-item-center justify-content-center">
            <div className="col-md-8">
              <ProductUpdateForm
                onClose={() => {
                  console.log("AddCategory : closed.");
                  onCloseEvent();
                }}
                itemInfo={selectedForEdit}
                pageName="Agent"
              />
            </div>
          </div>
        </div>
      )}
      <main className="container-fluid dashboard">
        <div className="row m-3">
          <div className="row justify-content-around tble">
            <div className="col-6">
              <h5 className="dashboard-title">Product</h5>
            </div>
            
            <div className="mr-auto col-6 text-end">
              <div style={{ display: "inline-block", marginRight: "10px" }}>
                <select
                  name="sectionId"
                  className="form-select"
                  onChange={(e) => handleChanges(e)}
                  value={productAddForm.sectionId}
                >
                  <option value={""}>{"Category"}</option>
                  {sectionList &&
                    sectionList.length > 0 &&
                    sectionList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>


              </div>

              <div style={{ display: "inline-block" }}>
                <select
                  name="categoryId"
                  className="form-select"
                  onChange={(e) => handleInputChanges1(e)}
                  value={productAddForm.categoryId}
                >
                  <option value={""}>{"SubCategory"}</option>
                  {categoryList &&
                    categoryList.length > 0 &&
                    categoryList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              
              </div>
              
                
              <button
                type="button"
                className="mr-auto btn btn-primary"
                 style={{ display: "inline-block", marginLeft: "10px" }}
                onClick={() => setShowRequestForm(true)}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-md-12 card-1 h-scroll">
            <table className="table table-hover align-middle">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Mrp</th>
                  <th scope="col">DiscountPrice</th>
                  <th scope="col">c_gst</th>
                  <th scope="col">s_gst</th>
                  <th scope="col">Status</th>

                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {resultList && resultList.length > 0 ? (
                <tbody>
                  {resultList.map((el, i) => {
                    return (
                      <tr key={i}>
                        {/* <th scope="row">{od.id}</th> */}
                        <td className="align-middle">
                          <p>{el.id}</p>
                        </td>

                        <td className="align-middle">
                          <p>{el.name}</p>
                        </td>
                        <td className="align-middle">
                          <p>{el.quantity}</p>
                        </td>
                        <td className="align-middle">
                          <p>{el.mrp}</p>
                        </td>

                        <td className="align-middle">
                          <p>{el.discounted_price}</p>
                        </td>
                        <td className="align-middle">
                          <p>{el.c_gst}</p>
                        </td>
                        <td className="align-middle">
                          <p>{el.s_gst}</p>
                        </td>

                        <td className="align-middle">
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={el.status === "YES" ? true : false}
                            />
                          </div>
                          {/* <p><input class="form-check-input" type="checkbox" role="switch"  checked={el.status === "YES" ? true : false}/></p> */}
                        </td>
                        <td className="align-middle">
                          <span
                            className="edit-icon-btn"
                            onClick={() => {
                              // setShowRequestForm(true);
                            }}
                          >
                            <FaUserLock />
                          </span>{" "}
                          <span className="delete-icon-btn">
                            <FaTrash />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <p>No Data found</p>
              )}
            </table>
          </div>
        </div>
       
      </main>
    </>
  );
}
export default Product;
