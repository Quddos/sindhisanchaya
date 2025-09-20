'use client';

import Link from 'next/link';
import { BookOpen, Users, Globe, Heart, Award, Target, Lightbulb, Shield, Search } from 'lucide-react';

export default function AboutPage() {
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
              <Link href="/about" className="text-blue-600 font-medium">
                About
              </Link>
              <Link href="/copyright" className="text-gray-600 hover:text-blue-600 transition-colors">
                Copyright
              </Link>
            </div>
          </nav>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About SindhiSanchaya
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Preserving and sharing the rich heritage of Sindhi literature for future generations
            </p>
            <div className="mt-6 max-w-4xl mx-auto">
              <p className="text-gray-700 leading-relaxed">
                SindhiSanchaya is a comprehensive digital archive dedicated to preserving, cataloging, and making accessible 
                the vast treasure trove of Sindhi literature. Our mission is to ensure that the rich cultural heritage of 
                Sindhi language and literature remains accessible to scholars, researchers, students, and literature 
                enthusiasts worldwide.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              SindhiSanchaya is dedicated to preserving, digitizing, and making accessible the vast treasure trove of Sindhi literature. 
              We believe that language and literature are the soul of a culture, and our mission is to ensure that the rich heritage 
              of Sindhi writing remains accessible to scholars, students, and literature enthusiasts worldwide.
            </p>
            <div className="mt-8 max-w-4xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Our Vision</h3>
                <p className="text-blue-800">
                  To become the world's most comprehensive and accessible digital repository of Sindhi literature, 
                  serving as a bridge between the rich cultural past and the digital future, ensuring that 
                  Sindhi language and literature continue to thrive in the modern world.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Preservation</h3>
              <p className="text-gray-600">
                Digitizing rare and valuable Sindhi texts to prevent their loss and ensure their survival for future generations.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Making Sindhi literature accessible to a global audience through our comprehensive digital library platform.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Building a community of scholars, researchers, and literature enthusiasts passionate about Sindhi culture.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our platform provides comprehensive access to Sindhi literature through innovative features and user-friendly design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Target className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Search</h3>
              <p className="text-gray-600 text-sm">
                Powerful search capabilities with fuzzy matching, multi-script support, and intelligent filtering.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <Lightbulb className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Features</h3>
              <p className="text-gray-600 text-sm">
                AI-generated book summaries, enhanced search queries, and intelligent content recommendations.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <Shield className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Script Support</h3>
              <p className="text-gray-600 text-sm">
                Support for English, Devanagari, and Perso-Arabic scripts with automatic transliteration.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <Heart className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Curated Collections</h3>
              <p className="text-gray-600 text-sm">
                Carefully curated collections of classical, religious, and modern Sindhi literature.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-16 bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Numbers that reflect our commitment to preserving Sindhi literature
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">40,000+</div>
              <div className="text-gray-600">Books Catalogued</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Authors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Collections</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">Scripts Supported</div>
            </div>
          </div>
        </section>

        {/* Technology Flowchart Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              A simple flow of how our digital literature archive operates
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center space-y-6">
              {/* Flowchart */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">1. Collection</h3>
                  <p className="text-sm text-gray-600 text-center">Gather Sindhi books from various sources</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:block">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300 ml-2"></div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Search className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">2. Processing</h3>
                  <p className="text-sm text-gray-600 text-center">AI-powered indexing and categorization</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:block">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300 ml-2"></div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Globe className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">3. Access</h3>
                  <p className="text-sm text-gray-600 text-center">Global search and discovery platform</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our platform uses advanced AI technology to make Sindhi literature accessible worldwide, 
                  with support for multiple scripts and intelligent search capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join us in our mission to preserve and promote Sindhi literature. Whether you're a scholar, 
              researcher, or simply passionate about literature, there are many ways to contribute.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Contribute Content
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
                Become a Partner
              </button>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors">
                Support Our Mission
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 SindhiSanchaya. Preserving and sharing Sindhi literature for future generations.</p>
            <p className="mt-2 text-sm">
              Built with ❤️ for the Sindhi community worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
