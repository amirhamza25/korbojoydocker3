import axios from "axios";
import Link from "next/link";
import React from "react";
import useScript from "../../commonFunction/ReloadJs";
const ListOfAgentRequest = (props) => {
  useScript("/assets/js/app.js");
  const agentRequest = props.data;
  return (
    <div>
      <div className="row">
        <div className="col-md-12 m-b-30">
          <div className="d-block d-sm-flex flex-nowrap align-items-center">
            <div className="page-title mb-2 mb-sm-0">
              <h1>List of agent request</h1>
            </div>
            <div className="ml-auto d-flex align-items-center">
              <nav>
                <ol className="breadcrumb p-0 m-b-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Tables</li>
                  <li className="breadcrumb-item active text-primary" aria-current="page">
                    List of agent request
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="datatable-wrapper table-responsive">
                <table id="datatable" className="display compact table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Serial</th>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Number</th>
                      <th>Email</th>
                      <th>Details</th>
                      <th>Join date</th>
                      <th>Edit</th>
                      <th>Approve</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentRequest.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={process.env.API_URL + "/upload/" + JSON.parse(item.img)} width={150} height={150} />
                        </td>

                        <td>{item.name}</td>
                        <td>{item.number}</td>
                        <td>{item.email}</td>
                        <td>
                          <a href="javascript:void(0);" className="btn btn-block btn-outline-info" data-toggle="modal" data-target={`#loginModal${index}`}>
                            Information
                          </a>
                          <div className="modal fade" id={`loginModal${index}`} tabIndex="{-1}" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Vendor Details</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">??</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div className="datatable-wrapper table-responsive">
                                    <table id="datatable" className="display compact table table-striped table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Present Address</th>
                                          <td>{item.presentAddress}</td>
                                        </tr>
                                        <tr>
                                          <th>Permanent Address</th>
                                          <td>{item.permanentAddress}</td>
                                        </tr>
                                        <tr>
                                          <th>Division</th>
                                          <td>{item.division}</td>
                                        </tr>
                                        <tr>
                                          <th>District</th>
                                          <td>{item.district}</td>
                                        </tr>
                                        <tr>
                                          <th>Upazila</th>
                                          <td>{item.upazila}</td>
                                        </tr>
                                        <tr>
                                          <th>CompanyName</th>
                                          <td>{item.companyName}</td>
                                        </tr>
                                        <tr>
                                          <th>Office Address</th>
                                          <td>{item.officeAddress}</td>
                                        </tr>
                                        <tr>
                                          <th>commission</th>
                                          <td>{item.commission}</td>
                                        </tr>
                                        <tr>
                                          <th>NID Number</th>
                                          <td>{item.nidNumber}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.date}</td>
                        <td>
                          <div className="form-check mb-0 py-2">
                            <input className="form-check-input" type="radio" name="toasts" id="success" defaultValue="success" defaultChecked />
                            <label className="form-check-label" htmlFor="success">
                              Active
                            </label>
                          </div>

                          <div className="form-check mb-0 py-2">
                            <input className="form-check-input" type="radio" name="toasts" id="info" defaultValue="info" />
                            <label className="form-check-label" htmlFor="info">
                              Inactive
                            </label>
                          </div>
                        </td>
                        <td>
                          <Link href="/ecommerce/edit/product/[productId]" as={`/ecommerce/edit/product/`}>
                            <a className="btn btn-sm btn-outline-info">
                              <i className="fa fa-edit"></i>
                            </a>
                          </Link>
                        </td>
                        <td>
                          <a href="javascript:void(0);" onClick={() => deleteItem(item.id)} className="btn btn-block btn-square btn-outline-danger">
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { data } = await axios.get(process.env.API_URL + "/AdminAgent/v1/GetAgentRequestInfo");

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default ListOfAgentRequest;
