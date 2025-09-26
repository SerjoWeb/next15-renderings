import { memo, Suspense, type ReactElement } from "react";
import { getUsers, getUser } from "@/api/jsonplaceholder/users";

type tParams = Promise<{ id: string }>;

const createArrayWithObjects = () => {
  const result = [];

  for (let i = 1; i <= 10; i++) {
    result.push({ id: i });
  }

  return result;
}

export const revalidate = 60;

export const generateStaticParams = async () => {
  const users = await getUsers();

  return users ? users.map(user => ({
    id: String(user.id)
  })) : createArrayWithObjects().map(user => ({
    id: String(user.id)
  }));
};

const UserPage = async ({ params }: { params: tParams }): Promise<ReactElement> => {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return <>No data Loaded</>;
  }

  return (
    <div className="p-5">
      <h3 className="font-semibold">USER (ISR & PPR Render)</h3>
      <Suspense fallback={<>Loading...</>}>
        <div className="mt-4">
          <ul>
            <li>Number: {user.id}</li>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Phone: {user.phone}</li>
            <li>Company: {user.company.name}</li>
            <li>Company: {user.address.city}</li>
            <li>Company: {user.website}</li>
          </ul>
        </div>
      </Suspense>
    </div>
  );
};

export default memo(UserPage);
