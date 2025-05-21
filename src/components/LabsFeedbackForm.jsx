import { useState } from "react";

const LabsFeedbackForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", pilot: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setSending(true);

    try {
      const res = await fetch(
        "https://prod-154.westus.logic.azure.com:443/workflows/ac8422f80c3f45e8a26d36c365101be4/triggers/manual/paths/invoke?api-version=2016-06-01",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Non-200 response");

      // Redirect to thank-you page on success
      window.location.href = "/labs/thank-you";
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-20 bg-white p-6 rounded-lg shadow"
      aria-label="Labs Feedback Form"
    >
      <h3 className="text-2xl font-bold text-foundation-purple mb-4">
        Submit an Idea or Feedback
      </h3>

      <input
        name="name"
        placeholder="Your Name"
        aria-label="Your Name"
        className="w-full border px-4 py-2 mb-4 rounded"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        aria-label="Your Email"
        className="w-full border px-4 py-2 mb-4 rounded"
        value={form.email}
        onChange={handleChange}
        required
      />
      <select
        name="pilot"
        className="w-full border px-4 py-2 mb-4 rounded"
        value={form.pilot}
        onChange={handleChange}
      >
        <option value="">Select a project (optional)</option>
        <option value="AI Concierge">AI Concierge</option>
        <option value="Blockchain Donor Receipts">Blockchain Donor Receipts</option>
        <option value="Virtual Book Club">Virtual Book Club</option>
        <option value="Youth Tech Fellowship">Youth Tech Fellowship</option>
      </select>
      <textarea
        name="message"
        placeholder="Message or Idea"
        aria-label="Message or Idea"
        className="w-full border px-4 py-2 mb-4 rounded"
        rows={4}
        value={form.message}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        disabled={sending}
        className={`bg-foundation-purple text-white px-6 py-2 rounded transition ${
          sending ? "opacity-50 cursor-not-allowed" : "hover:bg-foundation-purple/90"
        }`}
      >
        {sending ? "Submitting..." : "Submit"}
      </button>
      {status && !status.startsWith("Sending") && (
        <p
          className={`mt-4 text-sm text-center ${
            status.startsWith("Success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
};

export default LabsFeedbackForm;