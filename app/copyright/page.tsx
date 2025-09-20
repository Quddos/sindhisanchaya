'use client';

import Link from 'next/link';
import { Shield, FileText, Users, Globe, AlertTriangle, CheckCircle } from 'lucide-react';

export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img src="/logo.svg" alt="SindhiSanchaya" className="h-8" />
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/copyright" className="text-blue-600 font-medium">
                Copyright
              </Link>
            </div>
          </nav>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Copyright & Legal Information
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the legal framework and usage rights for content on SindhiSanchaya
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Copyright Notice */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Copyright Notice</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                All content on SindhiSanchaya is provided for educational and research purposes. 
                We respect intellectual property rights and are committed to operating within legal frameworks.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-blue-800">
                  <strong>Important:</strong> The content available on this platform may be subject to various copyright protections. 
                  Users are responsible for ensuring their use complies with applicable copyright laws.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sources */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Content Sources & Rights</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Public Domain Works</h3>
                <p className="text-gray-700 mb-2">
                  Many works in our collection are in the public domain, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Works published before 1928</li>
                  <li>Works with expired copyright terms</li>
                  <li>Works explicitly released into the public domain</li>
                  <li>Government publications and official documents</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Archive.org Integration</h3>
                <p className="text-gray-700 mb-2">
                  We integrate with Archive.org for digital access to books. Archive.org operates under:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Fair use provisions for educational purposes</li>
                  <li>Controlled digital lending principles</li>
                  <li>One-to-one ownership ratio for digital copies</li>
                  <li>Time-limited access for copyrighted materials</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Institutional Collections</h3>
                <p className="text-gray-700">
                  We work with various institutions and libraries that have provided access to their collections 
                  under appropriate licensing agreements and institutional policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Responsibilities */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Permitted Uses</h3>
                    <ul className="text-green-700 space-y-1">
                      <li>• Personal study and research</li>
                      <li>• Educational purposes in academic settings</li>
                      <li>• Non-commercial scholarly activities</li>
                      <li>• Cultural preservation and documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Prohibited Uses</h3>
                    <ul className="text-red-700 space-y-1">
                      <li>• Commercial reproduction or distribution</li>
                      <li>• Creating derivative works without permission</li>
                      <li>• Mass downloading or systematic copying</li>
                      <li>• Removing copyright notices or attribution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DMCA Policy */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">DMCA Compliance</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                SindhiSanchaya respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA).
              </p>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Copyright Infringement Claims</h3>
                <p className="text-gray-700 mb-3">
                  If you believe your copyright has been infringed, please contact us with the following information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Description of the copyrighted work</li>
                  <li>Location of the allegedly infringing material</li>
                  <li>Your contact information</li>
                  <li>Statement of good faith belief</li>
                  <li>Statement of accuracy under penalty of perjury</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">
                  <strong>Contact for DMCA claims:</strong> legal@sindhisanchaya.in
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms of Use */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Use</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                By using SindhiSanchaya, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use the platform only for lawful purposes</li>
                <li>Respect intellectual property rights</li>
                <li>Not attempt to circumvent any security measures</li>
                <li>Provide accurate information when required</li>
                <li>Report any copyright violations you discover</li>
              </ul>
              
              <p className="mt-4">
                We reserve the right to modify these terms at any time. Continued use of the platform 
                constitutes acceptance of any changes.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-16">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Disclaimer</h3>
                <p className="text-yellow-700">
                  The information provided on this platform is for educational and research purposes only. 
                  We make no warranties about the accuracy, completeness, or legality of the content. 
                  Users are responsible for ensuring their use complies with applicable laws and regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">General Inquiries</h3>
              <p className="text-gray-700 mb-2">Email: info@sindhisanchaya.in</p>
              <p className="text-gray-700">Website: www.sindhisanchaya.in</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Matters</h3>
              <p className="text-gray-700 mb-2">Email: legal@sindhisanchaya.in</p>
              <p className="text-gray-700">For copyright claims and legal notices</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Last updated: September 2025 | Version 1.0
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 SindhiSanchaya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
