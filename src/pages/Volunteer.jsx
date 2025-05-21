// pages/Volunteer.jsx

import { useState } from "react";

const Volunteer = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: [],
    availability: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updated = checked
        ? [...form.interests, value]
        : form.interests.filter((i) => i !== value);
      setForm({ ...form, interests: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer form submitted", form);
    // TODO: Connect to Dataverse/BC volunteer table
  };

  return (
    <section className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-foundation-purple mb-6 text-center">
        Volunteer Signup
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

        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">Areas of Interest</legend>
          <div className="flex flex-wrap gap-4">
            {["Book Club", "Tech Training", "Events", "Marketing", "Fundraising", "Mentorship"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  checked={form.interests.includes(option)}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Availability</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Evenings">Evenings</option>
          <option value="Flexible">Flexible</option>
        </select>

        <textarea
          name="message"
          placeholder="Tell us more about how you'd like to serve."
          value={form.message}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          rows={4}
        />

        <button
          type="submit"
          className="bg-foundation-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-foundation-purple/90"
        >
          Submit Volunteer Form
        </button>
      </form>
    </section>
  );
};

export default Volunteer;
