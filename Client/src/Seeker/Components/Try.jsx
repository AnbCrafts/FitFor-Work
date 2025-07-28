export default function JobCategoryFilter() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Filter Jobs by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Skills */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Skills</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select Skill</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Job Type</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Experience</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="1 Year">1 Year</option>
            <option value="3 Years">3 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Location</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select Location</option>
            <option value="Remote">Remote</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Role</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select Role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Education">Education</option>
          </select>
        </div>
      </div>

      {/* Apply Filter Button */}
      <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
