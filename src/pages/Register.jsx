// pages/Register.jsx

import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    program: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", form);
    // TODO: Add backend integration with Dataverse / BC
  };

  return (
    <section className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-foundation-purple mb-6 text-center">
        Program Registration
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select
          name="program"
          value={form.program}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        >
          <option value="">Select a Program</option>
          <option value="ai-class">Basics of AI Class</option>
          <option value="digital-legacy">Digital Legacy Creation</option>
          <option value="youth-tech-fellowship">Youth Tech Fellowship</option>
          <option value="virtual-book-club">Virtual Book Club</option>
          <option value="little-free-library">Little Free Library</option>
        </select>
        <textarea
          name="message"
          placeholder="Why are you interested in this program? (optional)"
          value={form.message}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          rows={4}
        />
        <button
          type="submit"
          className="bg-foundation-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-foundation-purple/90"
        >
          Submit Registration
        </button>
      </form>
    </section>
  );
};

export default Register;
