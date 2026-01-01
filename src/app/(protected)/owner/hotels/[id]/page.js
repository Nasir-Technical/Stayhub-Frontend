'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function ManageHotelPage({ params }) {
  const { id } = params; // Hotel ID
  const [hotel, setHotel] = useState(null); // Full hotel data
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  
  // Image Management State
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      totalRooms: 1
  });

  const fetchRooms = async () => {
      try {
          const res = await api.get(`/hotels/${id}`);
          setHotel(res.data.data);
          setRooms(res.data.data.rooms || []);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
     if (id) fetchRooms();
  }, [id]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (isEditing) {
              await api.put(`/rooms/${selectedRoomId}`, formData);
              alert('Room updated successfully!');
          } else {
              await api.post('/rooms', {
                  ...formData,
                  hotel: id
              });
              alert('Room added successfully!');
          }
          
          setShowForm(false);
          resetForm();
          fetchRooms();
      } catch (err) {
          console.error(err);
          alert(isEditing ? 'Failed to update room' : 'Failed to add room');
      }
  };

  const handleDelete = async (roomId) => {
      if(!confirm('Are you sure you want to delete this room?')) return;
      try {
          await api.delete(`/rooms/${roomId}`);
          alert('Room deleted');
          fetchRooms();
      } catch (err) {
          console.error(err);
          alert('Failed to delete room');
      }
  };

  const handleEditInit = (room) => {
      setFormData({
          name: room.name,
          description: room.description || '',
          price: room.price,
          totalRooms: room.totalRooms
      });
      setSelectedRoomId(room._id);
      setIsEditing(true);
      setShowForm(true);
  };

  const resetForm = () => {
      setFormData({ name: '', description: '', price: '', totalRooms: 1 });
      setIsEditing(false);
      setSelectedRoomId(null);
  };

  const toggleForm = () => {
      if (showForm) {
          setShowForm(false);
          resetForm();
      } else {
          resetForm();
          setShowForm(true);
      }
  };

  const handleAddImage = async (e) => {
      e.preventDefault();
      if (!imageUrl) return;

      try {
          const updatedImages = [...(hotel.images || []), imageUrl];
          // Optimistic UI
          setHotel({ ...hotel, images: updatedImages });
          
          await api.put(`/hotels/${id}`, { images: updatedImages });
          setImageUrl('');
          alert('Image added!');
      } catch (err) {
          console.error(err);
          alert('Failed to add image');
      }
  };

  const handleRemoveImage = async (indexToRemove) => {
      if(!confirm('Remove this image?')) return;
      try {
           const updatedImages = hotel.images.filter((_, idx) => idx !== indexToRemove);
           setHotel({ ...hotel, images: updatedImages });
           await api.put(`/hotels/${id}`, { images: updatedImages });
      } catch (err) {
          console.error(err);
          alert('Failed to remove image');
      }
  };

  return (
    <div>
        {/* Hotel Images Management */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 mb-8">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Hotel Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {hotel?.images?.map((img, idx) => (
                    <div key={idx} className="relative group aspect-video bg-slate-100 rounded-lg overflow-hidden">
                        <img src={img} className="w-full h-full object-cover" alt="Hotel" />
                        <button 
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                            <HiTrash className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            
            <form onSubmit={handleAddImage} className="flex gap-2">
                <input 
                  type="url" 
                  placeholder="Paste Image URL here (e.g. https://example.com/photo.jpg)" 
                  className="input-base flex-1"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">Add Photo</button>
            </form>
        </div>

        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Manage Rooms</h1>
            <button onClick={toggleForm} className="btn-primary flex items-center">
                <HiPlus className="mr-2" /> {showForm ? 'Cancel' : 'Add Room'}
            </button>
        </div>

        {/* Add/Edit Room Form */}
        {showForm && (
            <div className="bg-slate-50 p-6 rounded-xl border border-blue-200 mb-8">
                <h3 className="font-bold text-lg mb-4">{isEditing ? 'Edit Room' : 'New Room Details'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label-base">Room Name</label>
                            <input className="input-base" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="label-base">Price ($)</label>
                            <input type="number" className="input-base" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                        </div>
                        <div>
                            <label className="label-base">Total Units</label>
                            <input type="number" className="input-base" required value={formData.totalRooms} onChange={e => setFormData({...formData, totalRooms: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label className="label-base">Description</label>
                        <textarea className="input-base h-20" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={toggleForm} className="btn-outline">Cancel</button>
                        <button type="submit" className="btn-primary">{isEditing ? 'Update Room' : 'Save Room'}</button>
                    </div>
                </form>
            </div>
        )}

        {/* Room List */}
        <div className="space-y-4">
             {rooms.map(room => (
                 <div key={room._id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                     <div>
                         <h4 className="font-bold text-lg">{room.name}</h4>
                         <p className="text-sm text-slate-500 mb-1">{room.description ? room.description.substring(0, 50) + '...' : ''}</p>
                         <div className="flex gap-3 text-xs">
                             <span className="font-bold text-blue-600">${room.price}/night</span>
                             <span className="text-slate-400">|</span>
                             <span className="text-slate-500">{room.totalRooms} units</span>
                             <span className="text-slate-400">|</span>
                             <span className="text-green-600 font-medium">{room.availableRooms} available</span>
                         </div>
                     </div>
                     <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                         <button 
                            onClick={() => handleEditInit(room)}
                            className="flex-1 sm:flex-none flex items-center justify-center p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition"
                            title="Edit"
                         >
                             <HiPencil className="w-5 h-5" />
                         </button>
                         <button 
                            onClick={() => handleDelete(room._id)}
                            className="flex-1 sm:flex-none flex items-center justify-center p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded transition"
                            title="Delete"
                         >
                             <HiTrash className="w-5 h-5" />
                         </button>
                     </div>
                 </div>
             ))}
             
             {rooms.length === 0 && !loading && (
                 <div className="text-center py-10 text-slate-500">
                     No rooms found. Add one to start accepting bookings.
                 </div>
             )}
        </div>
    </div>
  );
}
