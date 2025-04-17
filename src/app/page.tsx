// pages/create.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ContentForm from '../components/contentForm';

const CreateContent: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Create Content | Content Management System</title>
        <meta name="description" content="Create new content in the CMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Content List
          </Link>
        </div>
        
        <ContentForm />
      </main>

      <footer className="bg-white py-4 shadow-inner mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Content Management System
        </div>
      </footer>
    </div>
  );
};

export default CreateContent;