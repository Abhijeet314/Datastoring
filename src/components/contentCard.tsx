// components/ContentCard.tsx
import React from 'react';
import { IContent } from '../models/content';

interface ContentCardProps {
  content: IContent;
  onDelete: (id:  string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onDelete }) => {
  // Format date to be more readable
  const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{content.title}</h3>
          {/* <button
            onClick={() => onDelete(content._id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button> */}
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{content.description}</p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Type:</span> {content.contentType}
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Format:</span> {content.format}
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Platform:</span> {content.platform}
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Created:</span> {formatDate(content.createdAt)}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Categories</h4>
          <div className="flex flex-wrap">
            {content.categories.map((category, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                {category}
              </span>
            ))}
            {content.categories.length === 0 && (
              <span className="text-gray-500 text-xs">No categories</span>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Marketing Patterns</h4>
          <div className="flex flex-wrap">
            {content.marketingPatterns.map((pattern, idx) => (
              <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                {pattern}
              </span>
            ))}
            {content.marketingPatterns.length === 0 && (
              <span className="text-gray-500 text-xs">No patterns</span>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Engagement Metrics</h4>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="bg-gray-100 rounded p-1">
              <div className="text-xs text-gray-500">Views</div>
              <div className="font-semibold">{content.engagementMetrics.views}</div>
            </div>
            <div className="bg-gray-100 rounded p-1">
              <div className="text-xs text-gray-500">Likes</div>
              <div className="font-semibold">{content.engagementMetrics.likes}</div>
            </div>
            <div className="bg-gray-100 rounded p-1">
              <div className="text-xs text-gray-500">Shares</div>
              <div className="font-semibold">{content.engagementMetrics.shares}</div>
            </div>
            <div className="bg-gray-100 rounded p-1">
              <div className="text-xs text-gray-500">Comments</div>
              <div className="font-semibold">{content.engagementMetrics.comments}</div>
            </div>
            <div className="bg-gray-100 rounded p-1">
              <div className="text-xs text-gray-500">Conv. Rate</div>
              <div className="font-semibold">{content.engagementMetrics.conversionRate}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;