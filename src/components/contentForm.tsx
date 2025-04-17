"use client"
// components/ContentForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define content types and platforms for the form
const contentTypes = ['Blog', 'Video', 'Podcast', 'Infographic', 'Case Study', 'Whitepaper', 'Social Media', 'Email'];
const formatTypes = ['Article', 'Video', 'Audio', 'Image', 'PDF', 'Interactive', 'Text'];
const platformOptions = ['Website', 'Instagram', 'Twitter', 'LinkedIn', 'Facebook', 'YouTube', 'TikTok', 'Email', 'Podcast Platforms'];
const marketingPatterns = ['Storytelling', 'Educational', 'Inspirational', 'Problem-Solution', 'Behind-the-Scenes', 'User-Generated', 'Seasonal', 'Trending Topics'];

interface FormData {
  title: string;
  description: string;
  content: string;
  categories: string[];
  contentType: string;
  format: string;
  platform: string;
  marketingPatterns: string[];
  engagementMetrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    conversionRate: number;
  };
}

const ContentForm: React.FC = () => {
  const router = useRouter();
  const [newCategory, setNewCategory] = useState('');
  const [newPattern, setNewPattern] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    content: '',
    categories: [],
    contentType: contentTypes[0],
    format: formatTypes[0],
    platform: platformOptions[0],
    marketingPatterns: [],
    engagementMetrics: {
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      conversionRate: 0,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof FormData] as Record<string, any>,
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, newCategory]
      });
      setNewCategory('');
    }
  };

  const handleAddPattern = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPattern && !formData.marketingPatterns.includes(newPattern)) {
      setFormData({
        ...formData,
        marketingPatterns: [...formData.marketingPatterns, newPattern]
      });
      setNewPattern('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(c => c !== category)
    });
  };

  const handleRemovePattern = (pattern: string) => {
    setFormData({
      ...formData,
      marketingPatterns: formData.marketingPatterns.filter(p => p !== pattern)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Content created:', result);
        router.push('/');
      } else {
        console.error('Error creating content');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Content</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
          <div className="flex flex-wrap mb-2">
            {formData.categories.map((category, idx) => (
              <span 
                key={idx} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
              >
                {category}
                <button 
                  type="button" 
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-grow border border-gray-300 rounded-l-md shadow-sm p-2"
              placeholder="Add new category"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
        
        {/* Content Type, Format, Platform */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">Content Type</label>
            <select
              id="contentType"
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="format" className="block text-sm font-medium text-gray-700">Format</label>
            <select
              id="format"
              name="format"
              value={formData.format}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              {formatTypes.map((format) => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
            <select
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              {platformOptions.map((platform) => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Marketing Patterns */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Marketing Patterns</label>
          <div className="flex flex-wrap mb-2">
            {formData.marketingPatterns.map((pattern, idx) => (
              <span 
                key={idx} 
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
              >
                {pattern}
                <button 
                  type="button" 
                  onClick={() => handleRemovePattern(pattern)}
                  className="ml-1 text-green-500 hover:text-green-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <select
              value={newPattern}
              onChange={(e) => setNewPattern(e.target.value)}
              className="flex-grow border border-gray-300 rounded-l-md shadow-sm p-2"
            >
              <option value="">Select a pattern</option>
              {marketingPatterns.map((pattern) => (
                <option key={pattern} value={pattern}>{pattern}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddPattern}
              className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </div>
        
        {/* Engagement Metrics */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Engagement Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="engagementMetrics.views" className="block text-sm font-medium text-gray-700">Views</label>
              <input
                type="number"
                id="engagementMetrics.views"
                name="engagementMetrics.views"
                value={formData.engagementMetrics.views}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div>
              <label htmlFor="engagementMetrics.likes" className="block text-sm font-medium text-gray-700">Likes</label>
              <input
                type="number"
                id="engagementMetrics.likes"
                name="engagementMetrics.likes"
                value={formData.engagementMetrics.likes}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div>
              <label htmlFor="engagementMetrics.shares" className="block text-sm font-medium text-gray-700">Shares</label>
              <input
                type="number"
                id="engagementMetrics.shares"
                name="engagementMetrics.shares"
                value={formData.engagementMetrics.shares}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div>
              <label htmlFor="engagementMetrics.comments" className="block text-sm font-medium text-gray-700">Comments</label>
              <input
                type="number"
                id="engagementMetrics.comments"
                name="engagementMetrics.comments"
                value={formData.engagementMetrics.comments}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div>
              <label htmlFor="engagementMetrics.conversionRate" className="block text-sm font-medium text-gray-700">Conversion %</label>
              <input
                type="number"
                id="engagementMetrics.conversionRate"
                name="engagementMetrics.conversionRate"
                value={formData.engagementMetrics.conversionRate}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;