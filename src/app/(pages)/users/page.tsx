import { getUsers } from "@/api/jsonplaceholder/users";
import UserList from "@/components/content/requests/UserList";
import { memo, type ReactElement, Suspense } from "react";

export const experimental_ppr = true;
export const revalidate = 3600;

const UsersPage = async (): Promise<ReactElement> => {
  const users = await getUsers();
  
  return (
    <div className="p-5">
      <h3 className="font-semibold">USERS (SSR & PPR Render)</h3>
      <Suspense fallback={<>Loading...</>}>
        <UserList users={users} />
      </Suspense>
    </div>
  );
};

export default memo(UsersPage);
