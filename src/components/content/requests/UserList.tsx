import { type IGetUsersResponse } from "@/api/jsonplaceholder/users";
import { type ReactElement, memo } from "react";
import Link from "next/link";

const UserList = ({ users }: { users: IGetUsersResponse[] | undefined }): ReactElement => {
  if (!users) {
    return <></>;
  }

  return (
    <div className="w-full mt-2">
      <table className="w-full border-collapse border border-amber-600">
        <thead>
          <tr>
            <th className="p-4 border border-amber-500 text-left">#</th>
            <th className="p-4 border border-amber-500 text-left">Name</th>
            <th className="p-4 border border-amber-500 text-left">email</th>
            <th className="p-4 border border-amber-500 text-left">phone</th>
            <th className="p-4 border border-amber-500 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user.id}
              className="cursor-pointer transition-colors hover:bg-amber-50"
            >
              <td className="p-4 border border-amber-400">{user.id}</td>
              <td className="p-4 border border-amber-400">{user.name}</td>
              <td className="p-4 border border-amber-400">{user.email}</td>
              <td className="p-4 border border-amber-400">{user.phone}</td>
              <td className="p-4 border border-amber-400">
                <Link
                  href={`/users/${user.id}`}
                  className="transition-all hover:text-amber-800 text-lg font-semibold"
                >
                  Show more
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(UserList);
