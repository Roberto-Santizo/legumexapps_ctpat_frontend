// import { useParams, Navigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getPackingListById } from "@/features/packing-List/api/PackingListAPI";
// import EditPackingListItemForm from "@/features/packing-List/components/EditPackingListItemForm";


// export default function EditPackingListItem({ ctpatId }: { ctpatId: number }) {
//   const { itemId } = useParams();
//   const numericItemId = Number(itemId);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["packingList", ctpatId],
//     queryFn: () => getPackingListById(ctpatId),
//   });

//   if (isLoading) return <p>Cargando...</p>;
//   if (isError || !data) return <Navigate to="/404" />;

//   const item = data.items.find(i => i.id === numericItemId);

//   if (!item) return <Navigate to="/404" />;

//   return (
//     <EditPackingListItemForm
//       data={item}
//       itemId={numericItemId}
//       packingListId={data.id}
//     />
//   );
// }