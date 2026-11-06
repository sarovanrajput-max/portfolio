"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Code, Server, Database, Cpu, ArrowLeft } from "lucide-react";

export default function ICUNetBankingDemo() {
  const [activeTab, setActiveTab] = useState<"pan" | "emi" | "rest" | "acl">("pan");
  
  const [panInput, setPanInput] = useState("ABCDE1234F");
  const [verificationResult, setVerificationResult] = useState<{ status: string; message: string } | null>(null);

  const handleVerifyPan = () => {
    const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panInput);
    if (isValid) {
      setVerificationResult({
        status: "VERIFIED",
        message: "PAN matched against simulated registry. Automatic KYC flag set to TRUE."
      });
    } else {
      setVerificationResult({
        status: "INVALID_FORMAT",
        message: "Regex validation failed: Expected format AAAAA0000A."
      });
    }
  };

  const scriptCodeSnippet = `var ICUKYCService = Class.create();
ICUKYCService.prototype = {
    initialize: function() {},
    validatePAN: function(panNumber) {
        var panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(panNumber)) {
            return { valid: false, error: "Invalid PAN format" };
        }
        var gr = new GlideRecord('x_1330921_icu_pan_registry');
        gr.addQuery('pan_number', panNumber);
        gr.query();
        if (gr.next()) {
            return { valid: true, holder: gr.getValue('registered_name') };
        }
        return { valid: false, error: "PAN not found in registry" };
    },
    type: 'ICUKYCService'
};`;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-slate-400 hover:text-cyan-400 transition flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Projects
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <Server className="text-cyan-400" size={20} />
            <h1 className="font-bold text-white tracking-wide">ICU Net Banking — ServiceNow Scoped App</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Scope: x_1330921_icu_p1_0
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <div className="lg:col-span-6 border-r border-slate-800 p-6 flex flex-col bg-slate-900/30 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
              <Cpu size={18} /> Left Side: Interactive Application View
            </h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Simulated UI</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveTab("pan")}
              className={`px-3 py-1.5 rounded text-xs font-mono transition ${
                activeTab === "pan" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              1. PAN Verification Rule
            </button>
            <button
              onClick={() => setActiveTab("emi")}
              className={`px-3 py-1.5 rounded text-xs font-mono transition ${
                activeTab === "emi" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              2. Loan EMI Calculator
            </button>
            <button
              onClick={() => setActiveTab("rest")}
              className={`px-3 py-1.5 rounded text-xs font-mono transition ${
                activeTab === "rest" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              3. REST Integration
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex-1 flex flex-col justify-between">
            {activeTab === "pan" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Shield size={16} />
                  <span>KYC Registry PAN Verification</span>
                </div>
                <p className="text-xs text-slate-400">
                  Enter a 10-character alphanumeric PAN to trigger server-side regex validation and simulated registry lookup.
                </p>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Customer PAN Number:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={panInput}
                      onChange={(e) => setPanInput(e.target.value.toUpperCase())}
                      className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-cyan-300 flex-1 uppercase"
                      maxLength={10}
                    />
                    <button
                      onClick={handleVerifyPan}
                      className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded transition"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {verificationResult && (
                  <div className={`p-4 rounded-lg border text-xs font-mono ${
                    verificationResult.status === "VERIFIED" 
                      ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
                      : "bg-rose-950/40 border-rose-800 text-rose-300"
                  }`}>
                    <p className="font-bold mb-1">Status: {verificationResult.status}</p>
                    <p>{verificationResult.message}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "emi" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Database size={16} />
                  <span>Loan Management & EMI Calculation</span>
                </div>
                <p className="text-xs text-slate-400">
                  Server-side Script Include calculations for reducing balance monthly EMIs.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-900 p-4 rounded-lg">
                  <div>
                    <span className="text-slate-500 block">Principal Amount:</span>
                    <span className="text-white font-bold text-sm">₹5,00,000</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Interest Rate:</span>
                    <span className="text-white font-bold text-sm">10.5% p.a.</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tenure:</span>
                    <span className="text-white font-bold text-sm">24 Months</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Calculated Monthly EMI:</span>
                    <span className="text-cyan-400 font-bold text-sm">₹23,154 / mo</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rest" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Server size={16} />
                  <span>REST Message Outbound Payload</span>
                </div>
                <p className="text-xs text-slate-400">
                  Outbound JSON payload dispatched via ServiceNow `RESTMessageV2` API.
                </p>
                <pre className="bg-slate-900 p-3 rounded font-mono text-[11px] text-cyan-300 overflow-x-auto">
{`{
  "endpoint": "https://api.icu-banking.internal/v1/kyc",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer token_x99",
    "Content-Type": "application/json"
  },
  "payload": {
    "pan": "${panInput}",
    "branch_ifsc": "ICUB0000101"
  }
}`}
                </pre>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
              <span>Environment: PDI Scoped App</span>
              <span>Status: Active</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 p-6 flex flex-col bg-slate-950 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <Code size={18} /> Right Side: Technical Explanation & Logic
            </h2>
            <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded">
              Architecture View
            </span>
          </div>

          <div className="space-y-6 text-sm">
            {activeTab === "pan" && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider text-cyan-400">Component: Server-Side Business Rule</h3>
                  <p className="text-xs text-slate-300">
                    Before Insert/Update Business Rule running on `x_1330921_icu_p1_0_account` table intercepting records to validate customer identification.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider text-cyan-400">Script Include: `ICUKYCService`</h3>
                  <pre className="bg-slate-950 p-3 rounded font-mono text-[11px] text-slate-300 overflow-x-auto">
                    {scriptCodeSnippet}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "emi" && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider text-cyan-400">Component: GlideAjax & Client Script</h3>
                  <p className="text-xs text-slate-300">
                    Asynchronous client-server communication using `GlideAjax` to fetch real-time loan schedules without refreshing the Service Portal form.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "rest" && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider text-cyan-400">Security & ACL Protection</h3>
                  <p className="text-xs text-slate-300">
                    Protected by 17 Role-based Access Control Lists (ACLs) ensuring only users with `x_1330921_icu.admin` or `x_1330921_icu.teller` roles can access transaction tables.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
