import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../../components/model/layout";
import modelStyle from "../../styles/model.module.css";
import withAuth from "../../components/admin/withAuth";
import axios from "axios";
import OrderSingle from "./orderSingle.js";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [modelId, setModelId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noOrder, setNoOrder] = useState(false);
  const [status, setStatus] = useState(""); // "Approved" | "Denied" | ''

  // Normalize status updates coming from children
  const changeOrderStatus = useCallback((nextStatus) => {
    setStatus(nextStatus === "Approved" ? "Approved" : "Denied");
  }, []);

  const fetchOrders = useCallback(async (id, signal) => {
    if (!id) return;
    setLoading(true);
    setError("");
    setNoOrder(false);

    try {
      const url = `https://tsm.spagram.com/api/getpendingorders.php?modelid=${encodeURIComponent(
        id
      )}`;
      const response = await axios.get(url, { signal });
      const data = Array.isArray(response.data) ? response.data : [];

      setOrderData(data);
      setNoOrder(data.length === 0);
    } catch (err) {
      // Axios throws if aborted; ignore abort errors
      if (axios.isCancel(err) || err?.name === "CanceledError") return;
      setError(err?.message || "Failed to load orders.");
      setOrderData([]);
      setNoOrder(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Read token once on mount
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setModelId(token || null);
  }, []);

  // Fetch whenever modelId is set or status toggles (to reflect child actions)
  useEffect(() => {
    if (!modelId) return;
    const controller = new AbortController();
    fetchOrders(modelId, controller.signal);

    return () => controller.abort();
  }, [modelId, status, fetchOrders]);

  return (
    <Layout orders>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="orderlist">
        <h2>Your Service Request</h2>

        {loading && <p>Loading pending requests…</p>}

        {!loading && error && (
          <div className={modelStyle.error}>
            <p>{error}</p>
            <button
              className="button"
              onClick={() => fetchOrders(modelId, undefined)}
              type="button"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && noOrder && (
          <strong>You don&apos;t have any pending service request.</strong>
        )}

        {!loading && !error && !noOrder && (
          <div className="orders">
            <div className={modelStyle.table}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Request Time</th>
                    <th>Address</th>
                    <th>Call Type</th>
                    <th>Service Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order, index) => (
                    <OrderSingle
                      key={order?.id ?? index}
                      order={order}
                      changeOrderStatus={changeOrderStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(Orders);
