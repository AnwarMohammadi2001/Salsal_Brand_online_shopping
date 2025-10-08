import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchUsers, deleteUser } from "../../../redux/slices/usersSlice";
import { MdOutlineDelete } from "react-icons/md";
import SearchBox from "../../SearchBox";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
   const [searchQuery, setSearchQuery] = useState("");
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات غیرقابل بازگشت است!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف شود!",
      cancelButtonText: "لغو",
    });

    if (result.isConfirmed) {
      dispatch(deleteUser(userId));
      Swal.fire("حذف شد!", "کاربر با موفقیت حذف شد.", "success");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold mb-4">تمام کاربران</h2>
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="جستجوی کاربر..."
        />
      </div>
      <table className="min-w-full  border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="p-2">نام کاربری</th>
            <th className="p-2 ">ایمیل</th>
            <th className="p-2 ">نقش</th>
            <th className="p-2 ">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, index) => (
            <tr
              key={u._id}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.isAdmin ? "ادمین" : "کاربر"}</td>
              <td className="p-2">
                {!u.isAdmin && (
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 text-red-500"
                  >
                    <MdOutlineDelete size={24} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
