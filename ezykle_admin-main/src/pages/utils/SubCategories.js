import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  listAction,
  createUpdateAction,
} from "../../network/store/action/SubCategoriesResponseAction";
import GMCTPagination from "../../components/pagination";
import { FaUserLock, FaTrash } from "react-icons/fa";
import SubCategoriesUpdateForm from "./SubCategories-update-form";
import { listAction as categoryListAction } from "../../network/store/action/CategoriesResponseAction";

function SubCategories() {
  // to get api data

  const dispatch = useDispatch();

  // list of items
  const [resultList, setResultList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  
  const [productAddForm, setproductAddForm] = useState({
    "sectionId": "",
  });
  
  // progress Dialog
  const [isLoading, setIsLoading] = useState(false);

  const [selectedForEdit, setSelectedForEdit] = useState({});
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    getSections();
    geList();
  }, []);

  const getSections = async () => {
    await dispatch(categoryListAction({limit:100,offset:0}, dispatch)).then((response) => {
      console.log('sectionList', response.result);
      if (response.result) {
        setSectionList(response.result);
      }
    });

  }

  const geList = async () => {
    await dispatch(
      listAction(
        {
          limit: 500,
          offset: 0,
          role: "SubCategories",
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
    console.log('SDebug > handleChanges', e);
    if (e.target.name === 'sectionId') {
      setproductAddForm({ ...productAddForm, "sectionId": e.target.value })
    } 
  }


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
              <SubCategoriesUpdateForm
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
              <h5 className="dashboard-title">SubCategories</h5>
            </div>
            <div className="mr-auto col-6 text-end">

            <select name="sectionId" className="form-select" onChange={(e) => handleChanges(e)} value={productAddForm.sectionId}>
                <option value={''}>{'--Select Section--'}</option>
                {sectionList && sectionList.length > 0 && sectionList.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>{item.name}</option>
                  )
                })}
              </select>
              <button
                type="button"
                className="mr-auto btn btn-primary"
                onClick={() => setShowRequestForm(true)}
              >
                 Add SubCategories
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
                          <p>
                            {el.name}
                                                      </p>
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
export default SubCategories;
