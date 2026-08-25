import React from "react";

export const metadata = {
  title: "Privacy Policy | Growtez",
  description: "Learn how Growtez collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how Growtez handles your data across our services.
          </p>
          <p className="text-sm text-slate-400 mt-4">Last updated: August 2026</p>
        </div>

        <div className="space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect different types of information depending on how you interact with Growtez:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and company details submitted through our contact forms.</li>
              <li><strong>Project Data:</strong> Information, files, and requirements you share with us to help us deliver web, app, or AI development services.</li>
              <li><strong>Usage Data:</strong> Basic analytics such as IP address, browser type, and pages visited on our website to help us improve user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate, and maintain our development and design services.</li>
              <li>To communicate with you regarding your project, inquiries, or support requests.</li>
              <li>To send you updates, marketing communications (which you can opt out of), and administrative emails.</li>
              <li>To improve our website functionality and service offerings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Data Sharing & Third-Party Services</h2>
            <p className="mb-4">
              We do <strong>not</strong> sell your personal information. We share data only with trusted third-party service providers (such as hosting platforms and communication tools) that are essential to delivering our services. All third parties are bound by strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Data Storage & Security</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your personal information and project data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Cookies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Rights</h2>
            <p className="mb-4">
              You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br /><br />
              <strong>Email:</strong> contact@growtez.com<br />
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
