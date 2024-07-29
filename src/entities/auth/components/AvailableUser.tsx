"use client";

import useUserDropbox from "../hooks/useUserDropbox";

const AvailableUser = () => {
  const {
    toggleDropbox,
    data: { isOpen },
  } = useUserDropbox();

  return (
    <div className="mt-10 max-w-80 m-auto">
      <h3
        className="text-lg text-center p-2 bg-slate-500 text-white cursor-pointer"
        onClick={toggleDropbox}>
        사용 가능한 유저 정보
      </h3>
      {isOpen && (
        <table className="table-fixed w-full slided">
          <tbody>
            <tr className="border-white border-b-2">
              <td className="bg-slate-200 p-2">email</td>
              <td className="p-2">test@test.com</td>
            </tr>
            <tr>
              <td className="bg-slate-200 p-2">password</td>
              <td className="p-2">1111</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AvailableUser;
