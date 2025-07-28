import { Briefcase } from 'lucide-react'
import React from 'react'
import { getRandomJobIcon } from '../UI/RandomJobIcons';
import { Link } from 'react-router-dom';

const JobCard = ({createdAt,deadline,title,jobRole,totalSeats,status,experienceRequired,description,jobType,id}) => {
    const { icon: IconComponent } = getRandomJobIcon();

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl text-white w-full max-w-sm">
  {/* Header */}
  <div className="flex items-center justify-between gap-5 px-5 py-1.5 border border-gray-900 rounded-xl mb-4">
    <h1 className="text-lg font-semibold">{title}</h1>
    <IconComponent className="h-10 w-10 text-gray-300 p-2 rounded-full bg-gray-950" />
  </div>

  {/* Job Details */}
  <div className="space-y-2 text-sm px-2">
    <p><span className="text-gray-400">Role:</span> {jobRole}</p>
    <p><span className="text-gray-400">Experience Required:</span> {experienceRequired}</p>
    <p><span className="text-gray-400">Job Type:</span> {jobType}</p>
    <p><span className="text-gray-400">Status:</span> {status}</p>
    <p><span className="text-gray-400">Seats Left:</span> {totalSeats}</p>
    <p><span className="text-gray-400">Posted:</span> {new Date(createdAt).toDateString()}</p>
    <p><span className="text-gray-400">Deadline:</span> {new Date(deadline).toDateString()}</p>

    {/* Short Description */}
    <p className="text-gray-300 line-clamp-2">
      {description}
    </p>
  </div>

  {/* View Button */}
  <div className="mt-4 text-right">
    <Link to={`job/${id}`} className="text-sm my-3 inline-block px-4 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg font-medium">
      View in Detail
    </Link>
    
  </div>
</div>

  )
}

export default JobCard
