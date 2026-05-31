import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRaffles } from "../redux/slices/raffles";
import { IoMdClose } from "react-icons/io";

function toDateTimeLocal(endDate, endTime) {
  if (!endDate) return "";
  if (!endTime) return endDate;
  return `${endDate}T${endTime}`;
}

const emptyForm = {
  raffleName: "",
  raffleDescription: "",
  endDate: "",
  endTime: "",
  datetimeLocal: "",
  phoneChoice: true,
};

export default function RaffleFormDrawer({
  open,
  onClose,
  mode = "create",
  raffle = null,
  userId,
}) {
  const drawerId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit";
  const title = isEdit ? "Edit raffle" : "New raffle";
  const submitLabel = loading
    ? isEdit
      ? "Saving…"
      : "Creating…"
    : isEdit
      ? "Save changes"
      : "Start raffle";

  useEffect(() => {
    if (!open) return;

    setError("");
    if (isEdit && raffle) {
      setForm({
        raffleName: raffle.raffleName ?? "",
        raffleDescription: raffle.description ?? "",
        endDate: raffle.endDate ?? "",
        endTime: raffle.endTime ?? "",
        datetimeLocal: toDateTimeLocal(raffle.endDate, raffle.endTime),
        phoneChoice: raffle.phone !== false,
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, isEdit, raffle]);

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || loading) return;

    setLoading(true);
    setError("");

    const payload = {
      user: userId,
      raffleName: form.raffleName,
      endDate: form.endDate,
      endTime: form.endTime,
      description: form.raffleDescription,
      phone: form.phoneChoice,
    };

    try {
      if (isEdit) {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/updateRaffle`, {
          ...payload,
          raffleId: raffle._id,
        });
        await dispatch(getRaffles(userId));
        onClose();
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/createRaffle`,
          payload,
        );
        await dispatch(getRaffles(userId));
        onClose();
        const newId = response.data?._id ?? response.data?.raffleID;
        if (newId) {
          navigate(`/raffle/${newId}`);
        }
      }
    } catch (err) {
      console.log(isEdit ? "updateRaffle error: " : "createRaffle error: ", err);
      setError(
        err.response?.data?.error ||
          (isEdit ? "Failed to update raffle." : "Failed to create raffle."),
      );
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    form.raffleName.trim() && form.endDate && form.endTime && !loading;

  const formId = `${drawerId}-form`;

  return (
    <div
      className={`drawer drawer-end fixed inset-0 z-50 ${
        open ? "drawer-open pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <input
        id={drawerId}
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        readOnly
        aria-hidden
      />
      <div className="drawer-content" />
      <div className="drawer-side">
        <label
          htmlFor={drawerId}
          aria-label="Close sidebar"
          className="drawer-overlay"
          onClick={handleClose}
        />
        <div className="flex min-h-full w-80 max-w-[min(100vw,24rem)] flex-col bg-base-100 text-base-content shadow-xl sm:w-96">
          <div className="flex shrink-0 items-center justify-between border-b border-base-300 px-5 py-4">
            <h2 className="text-xl font-bold font-trocchi text-btn-orange">
              {title}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          <form
            id={formId}
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="drawer-raffle-name" className="font-semibold">
                Raffle name
              </label>
              <input
                id="drawer-raffle-name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter raffle name"
                disabled={loading}
                value={form.raffleName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, raffleName: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="drawer-end-datetime" className="font-semibold">
                End date and time
              </label>
              <input
                id="drawer-end-datetime"
                type="datetime-local"
                className="input input-bordered w-full"
                disabled={loading}
                value={form.datetimeLocal}
                onChange={(e) => {
                  const [date, time] = e.target.value.split("T");
                  setForm((prev) => ({
                    ...prev,
                    datetimeLocal: e.target.value,
                    endDate: date ?? "",
                    endTime: time ?? "",
                  }));
                }}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="drawer-description" className="font-semibold">
                Description
              </label>
              <textarea
                id="drawer-description"
                className="textarea textarea-bordered w-full"
                placeholder="Raffle description"
                disabled={loading}
                value={form.raffleDescription}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    raffleDescription: e.target.value,
                  }))
                }
              />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="font-semibold">Required phone number?</legend>
              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="drawer-phone-required"
                    className="radio radio-warning"
                    checked={form.phoneChoice}
                    disabled={loading}
                    onChange={() =>
                      setForm((prev) => ({ ...prev, phoneChoice: true }))
                    }
                  />
                  Yes
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="drawer-phone-required"
                    className="radio radio-warning"
                    checked={!form.phoneChoice}
                    disabled={loading}
                    onChange={() =>
                      setForm((prev) => ({ ...prev, phoneChoice: false }))
                    }
                  />
                  No
                </label>
              </div>
            </fieldset>

            {error ? (
              <p className="text-sm text-error" role="alert">
                {error}
              </p>
            ) : null}
          </form>

          <div className="shrink-0 border-t border-base-300 px-5 py-4">
            <button
              type="submit"
              form={formId}
              disabled={!canSubmit}
              className="btn btn-primary w-full rounded-full border-0 bg-btn-orange text-white hover:bg-btn-gold disabled:opacity-50"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
