import { useEffect, useState } from "react";

function GMCTPagination(props) {

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8 h-scroll">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                {/* <li class="page-item">
                  <a class="page-link" role="button" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li> */}
                {[...Array(props.pageCount)].map((el, i) => {
                  return <li class="page-item">
                    <a class={props.activePage === i + 1 ? "page-link active" : "page-link"} role="button" onClick={() => props.onPageChange(i + 1)}>
                      {i + 1}
                    </a>
                  </li>
                })}

                {/* <li class="page-item">
                  <a class="page-link" role="button" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
          <div className="col-3"><p>{'Found ' + props.totalCount + ' items'}</p></div>
          <div className="col-1">
            <div className="form-group">
              <select name="pageLimit" className="form-select" onChange={(e) => props.onLimitChange(e)} value={props.pageLimit}>
                <option value={5}>{'5'}</option>
                <option value={10}>{'10'}</option>
                <option value={20}>{'20'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GMCTPagination;