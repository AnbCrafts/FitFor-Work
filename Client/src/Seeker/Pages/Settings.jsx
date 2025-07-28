import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-[#0c0c3a]">
      <h1 className="text-3xl font-bold text-[#FF6B6B] mb-6">Settings</h1>

      {/* Account Settings */}
      <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border-l-4 border-[#FF6B6B]">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="p-3 border rounded-md" />
          <input type="email" placeholder="Email Address" className="p-3 border rounded-md" />
          <input type="password" placeholder="New Password" className="p-3 border rounded-md" />
          <input type="password" placeholder="Confirm Password" className="p-3 border rounded-md" />
        </div>
        <button className="mt-4 bg-[#FF6B6B] text-white px-4 py-2 rounded hover:bg-[#e25656]">Save Changes</button>
      </section>

      {/* Notification Preferences */}
      <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border-l-4 border-[#0c0c3a]">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            Receive Job Alerts
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Receive Company Notifications
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            Platform Updates & News
          </label>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border-l-4 border-purple-500">
        <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Make my profile visible to recruiters
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Enable two-factor authentication (2FA)
          </label>
        </div>
      </section>

      {/* Linked Accounts */}
      <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border-l-4 border-yellow-500">
        <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
        <div className="space-y-3">
          <p>🔗 LinkedIn: Not Connected <button className="text-[#FF6B6B] underline ml-2">Connect</button></p>
          <p>🔗 GitHub: Connected <button className="text-[#FF6B6B] underline ml-2">Disconnect</button></p>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-white rounded-xl shadow-lg p-5 mb-6 border-l-4 border-red-600">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete My Account</button>
      </section>
    </div>
  );
};

export default Settings;
