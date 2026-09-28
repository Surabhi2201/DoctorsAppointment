import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiMessageSquare,
  FiArrowLeft,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { Context } from "../main";
import api from "../services/api";

const Messages = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [messages, setMessages] = useState([]);

  // =========================
  // FETCH MESSAGES
  // =========================
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(
          "/api/v1/message/getall",
          {
            withCredentials: true,
          }
        );

        setMessages(data.messages || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load messages."
        );
      }
    };

    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  // =========================
  // MARK MESSAGE AS READ
  // =========================
  const handleMarkAsRead = async (messageId) => {
    try {
      const { data } = await api.put(
        `/api/v1/message/${messageId}/read`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === messageId
            ? { ...message, isRead: true }
            : message
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to mark message as read."
      );
    }
  };

  // =========================
  // PROTECTED PAGE
  // =========================
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="admin-main messages-page">

      {/* HEADER */}
      <div className="messages-page-header">
        <div>
          <span className="dashboard-eyebrow">
            MEDICARE
          </span>

          <h1>Messages</h1>

          <p>
            View and manage messages received from
            MediCare patients.
          </p>
        </div>

        <button
          className="messages-back-button"
          onClick={() => navigateTo("/")}
        >
          <FiArrowLeft />
          Back to Overview
        </button>
      </div>

      {/* SUMMARY */}
      <div className="messages-summary">
        <div className="messages-summary-icon">
          <FiMessageSquare />
        </div>

        <div>
          <span>Total Messages</span>
          <strong>{messages.length}</strong>
        </div>

        <div className="messages-summary-text">
          <span>
            Patient enquiries and messages received
            through MediCare.
          </span>
        </div>
      </div>

      {/* MESSAGES */}
      {messages.length > 0 ? (
        <section className="messages-list">

          {messages.map((message) => (
            <article
              className="message-card"
              key={message._id}
            >

              {/* CARD HEADER */}
              <div className="message-card-header">

                <div className="message-user">

                  <div className="message-avatar">
                    {message.firstName
                      ?.charAt(0)
                      ?.toUpperCase() || <FiUser />}
                  </div>

                  <div>
                    <h2>
                      {message.firstName}{" "}
                      {message.lastName}
                    </h2>

                    <span>Patient</span>
                  </div>

                </div>

                {/* DATE */}
                <div className="message-date">
                  {message.createdAt
                    ? new Date(
                        message.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </div>

              </div>

              {/* CONTACT DETAILS */}
              <div className="message-contact">

                <div>
                  <FiMail />
                  <span>{message.email}</span>
                </div>

                <div>
                  <FiPhone />
                  <span>{message.phone}</span>
                </div>

              </div>

              {/* MESSAGE */}
              <div className="message-content">

                <span>Message</span>

                <p>
                  {message.message}
                </p>

              </div>

              {/* READ STATUS */}
              <div className="message-card-footer">

                {message.isRead ? (
                  <span className="message-read-status">
                    <FiCheck />
                    Read
                  </span>
                ) : (
                  <button
                    type="button"
                    className="message-read-button"
                    onClick={() =>
                      handleMarkAsRead(message._id)
                    }
                  >
                    <FiCheck />
                    Mark as Read
                  </button>
                )}

              </div>

            </article>
          ))}

        </section>
      ) : (

        /* EMPTY STATE */
        <section className="messages-empty">

          <div className="messages-empty-icon">
            <FiMessageSquare />
          </div>

          <h2>No Messages Yet</h2>

          <p>
            Patient messages will appear here when
            they contact MediCare.
          </p>

          <button
            className="messages-empty-button"
            onClick={() => navigateTo("/")}
          >
            <FiArrowLeft />
            Back to Overview
          </button>

        </section>
      )}

    </main>
  );
};

export default Messages;