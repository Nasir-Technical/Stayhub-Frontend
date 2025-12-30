'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { HiPlus, HiTrash } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function ManageHotelPage({ params }) {
  const { id } = params; // Hotel ID
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const router = useRouter();

  const [newRoom, setNewRoom] = useState({
      name: '',
      description: '',
      price: '',
      totalRooms: 1
  });

  useEffect(() => {
     const fetchRooms = async () => {
         try {
             // Use the new getHotel endpoint which returns hotel + rooms
             const res = await api.get(`/hotels/${id}`);
             // data.data.rooms
             setRooms(res.data.data.rooms || []);
         } catch (err) {
             console.error(err);
         } finally {
             setLoading(false);
         }
     };
     
     if (id) fetchRooms();
  }, [id]);

  const handleAddRoom = async (e) => {
      e.preventDefault();
      try {
          await api.post('/rooms', {
              ...newRoom,
              hotel: id
          });
          alert('Room added successfully!');
          setShowAddRoom(false);
          // Manually reload or append to state
          // For simplicity, trigger a reload or simple window.location.reload() or re-fetch
          const res = await api.get(`/hotels/${id}`);
          setRooms(res.data.data.rooms || []);
      } catch (err) {
          console.error(err);
          alert('Failed to add room');
      }
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Manage Rooms</h1>
            <button onClick={() => setShowAddRoom(!showAddRoom)} className="btn-primary flex items-center">
                <HiPlus className="mr-2" /> Add Room
            </button>
        </div>

        {/* Add Room Form */}
        {showAddRoom && (
            <div className="bg-slate-50 p-6 rounded-xl border border-blue-200 mb-8">
                <h3 className="font-bold text-lg mb-4">New Room Details</h3>
                <form onSubmit={handleAddRoom} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label-base">Room Name</label>
                            <input className="input-base" required value={newRoom.name} onChange={e => setNewRoom({...newRoom, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="label-base">Price ($)</label>
                            <input type="number" className="input-base" required value={newRoom.price} onChange={e => setNewRoom({...newRoom, price: e.target.value})} />
                        </div>
                        <div>
                            <label className="label-base">Total Units</label>
                            <input type="number" className="input-base" required value={newRoom.totalRooms} onChange={e => setNewRoom({...newRoom, totalRooms: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label className="label-base">Description</label>
                        <textarea className="input-base h-20" required value={newRoom.description} onChange={e => setNewRoom({...newRoom, description: e.target.value})}></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn-primary">Save Room</button>
                    </div>
                </form>
            </div>
        )}

        {/* Room List */}
        <div className="space-y-4">
             {/* Mock Room */}
             {rooms.map(room => (
                 <div key={room._id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex justify-between items-center">
                     <div>
                         <h4 className="font-bold text-lg">{room.name}</h4>
                         <p className="text-sm text-slate-500">{room.description ? room.description.substring(0, 50) + '...' : ''}</p>
                     </div>
                     <div className="text-right">
                         <div className="font-bold text-blue-600">${room.price}/night</div>
                         <div className="text-xs text-slate-400">{room.totalRooms} units</div>
                         <div className="text-xs text-green-600">{room.availableRooms} available</div>
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
