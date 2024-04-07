import React from 'react'
import { FaTrash, FaUserLock } from 'react-icons/fa';

function UserRow(props) {
  return (
    <div>
      <tr key={props.i}>
                        {/* <th scope="row">{od.id}</th> */}
                        <td className="align-middle">
                          <p>{props.el.id}</p>
                        </td>
                    
                        <td className="align-middle">
                          <p>{props.el.name}</p>
                        </td>
                        <td className="align-middle">
                          <p>{props.el.phone}</p>
                        </td>
                        {/* <td className="align-middle">
                          <p>{props.el.prices.name}</p>
                        </td> */}
                        <td className="align-middle">
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={props.el.status === "YES" ? true : false}
                            />
                          </div>
                          {/* <p><input class="form-check-input" type="checkbox" role="switch"  checked={props.el.status === "YES" ? true : false}/></p> */}
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
                            <span className="dprops.elete-icon-btn">
                              <FaTrash />
                            </span>
                          
                        </td>
                      </tr>
    </div>
  )
}

export default UserRow
