import axios from "axios";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import React, { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { storeAgentCancelListOfProduct } from "../../atom/listOfAgentAtom";
import ApproveItem from "../../commonFunction/approvalItemHandler";
import useScript from "../../commonFunction/ReloadJs";

const sdjfklsfkls = atom({
  key: "sdjfklsfkls",
  default: [],
});
const AgentSuccessOrderFromUser = (props) => {
  useScript("/assets/js/app.js");
  const [currentAtom, setCurrentAtom] = useRecoilState(sdjfklsfkls);

  useEffect(() => {
    const token = getCookie("token");
    const decodedToken = jwtDecode(token);
    const sjdklf = axios.get(process.env.API_URL + "/agentPanel/av1/userOrderSuccessToAgent/" + decodedToken.userId).then((res) => {
      setCurrentAtom(res.data);
    });
  }, [setCurrentAtom]);
  const updateNextAtom = useSetRecoilState(storeAgentCancelListOfProduct);

  const dfhsjkdhfjk = useRecoilValue(sdjfklsfkls);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 m-b-30">
          <div className="d-block d-sm-flex flex-nowrap align-items-center">
            <div className="page-title mb-2 mb-sm-0">
              <h1>List of success order from user</h1>
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
                    List of success order from user
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
                      <th>Name</th>
                      <th>Number</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Total product</th>
                      <th>Total qty</th>
                      <th>Total amount</th>
                      <th>Invoice</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dfhsjkdhfjk.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.agents[0].name}</td>
                          <td>{item.agents[0].number}</td>
                          <td>{item.agents[0].email}</td>
                          <td>{item.date}</td>
                          <td>{item.totalProduct}</td>
                          <td>{item.totalQty}</td>
                          <td>{item.totalPrice}</td>
                          <Link href={`/agent/userInvoice/${item.invoiceNumber}`}>
                            <td>
                              <a href="javascript:void(0);" className="btn btn-block btn-outline-info">
                                {item.invoiceNumber}
                              </a>
                            </td>
                          </Link>
                          <td>
                            <a
                              href="javascript:void(0)"
                              onClick={() =>
                                ApproveItem(item.id, currentAtom, sdjfklsfkls, setCurrentAtom, updateNextAtom, "agentOrderDetails", "status", "id", "success")
                              }
                              className="btn btn-sm btn-outline-danger ml-2"
                            >
                              Pending
                            </a>
                          </td>
                        </tr>
                      );
                    })}
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
export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  const decodedToken = jwtDecode(token);
  const { data } = await axios.get(process.env.API_URL + "/agentPanel/av1/userOrderSuccessToAgent/" + decodedToken.userId);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
export default AgentSuccessOrderFromUser;
