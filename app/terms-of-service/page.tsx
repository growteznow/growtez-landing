import React from "react";

export const metadata = {
  title: "Terms of Service | Growtez",
  description: "Read the terms and conditions governing your use of the Growtez platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please read these terms carefully before using Growtez services.
          </p>
          <p className="text-sm text-slate-400 mt-4">Last updated: August 2026</p>
        </div>

        <div className="space-y-12 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using the services provided by Growtez (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree, you may not access or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Growtez provides digital agency services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Web Development and Design</li>
              <li>App Development</li>
              <li>AI Integration and Solutions</li>
              <li>Brand Identity and Strategy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Client Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information required for project execution.</li>
              <li>Ensure you have the rights and permissions for any assets (images, text, logos) you provide to us.</li>
              <li>Respond to feedback requests and approvals in a timely manner.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Payments & Billing</h2>
            <p className="mb-4">
              Payment terms, project milestones, and billing structures will be agreed upon in individual project proposals or contracts. We reserve the right to suspend services for accounts with overdue payments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              Upon full payment, intellectual property rights for the final delivered project assets are typically transferred to the client, unless otherwise specified in the project contract. Growtez retains the right to display the completed work in our portfolio and marketing materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              Growtez shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our liability is limited to the amount paid for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Termination</h2>
            <p className="mb-4">
              Either party may terminate a project with written notice as per the conditions laid out in the individual project contract. You may be responsible for payment for work completed up to the date of termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Growtez operates. Any disputes shall be subject to the exclusive jurisdiction of the local courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br /><br />
              <strong>Email:</strong> contact@growtez.com<br />
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
