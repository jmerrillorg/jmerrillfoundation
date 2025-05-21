import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate form submission logic
    console.log("Submitted:", form);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left: Image + Info */}
        <div>
          <img
            src="https://via.placeholder.com/600x400?text=Get+In+Touch"
            alt="Contact"
            className="rounded-lg mb-6 w-full"
          />
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Address:</strong><br />434 Hillpine Dr.<br />Columbus, OH 43207</p>
            <p><strong>Main Line:</strong> (614) 965-6057 (Option 3)</p>
            <p><strong>Email:</strong> <a href="mailto:info@jmerrill.one" className="text-foundation-purple underline">info@jmerrill.one</a></p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-foundation-purple text-white px-6 py-2 rounded-md hover:bg-foundation-purple/90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
