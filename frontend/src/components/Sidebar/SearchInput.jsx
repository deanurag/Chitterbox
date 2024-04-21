import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState();
  const {setSelectedConversation } = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length<3)
      return toast.error("Search term must be more then 3 characters");
    const conversation = conversations.find((conversation)=> conversation.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation);
      setSearch('');
    }
    else toast.error("No conversation found");

  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search.. "
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput