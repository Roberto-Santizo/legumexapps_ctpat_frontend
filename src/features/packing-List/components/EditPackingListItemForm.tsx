// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { updatePackingListItemAPI } from "@/features/packing-List/api/PackingListAPI";
// import type { AddItemToPackingListFormData } from "@/features/packing-List/schemas/addItemToPackingList";
// import type { PackingListItem } from "@/features/packing-List/types";
// import AddItemToPackingListForm from "./AddItemToPackingListForm";

// type EditPackingListItemFormProps = {
//   data: PackingListItem;
//   itemId: number;
//   ctpatId: number;
// };

// export default function EditPackingListItemForm({
//   data,
//   itemId,
//   ctpatId,
// }: EditPackingListItemFormProps) {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<AddItemToPackingListFormData>();

//   // 🔹 Precargar datos
//   useEffect(() => {
//     if (data) {
//       reset({
//         name: data.name,
//         type: data.type,
//       });
//     }
//   }, [data, reset]);

//   const { mutate, isPending } = useMutation({
//     mutationFn: updatePackingListItemAPI,

//     onSuccess: () => {
//       toast.success("Item actualizado correctamente");

//       queryClient.invalidateQueries({
//         queryKey: ["packingList", ctpatId],
//       });

//       navigate(-1);
//     },

//     onError: (error: Error) => {
//       toast.error(error.message);
//     },
//   });

//   const handleForm = (formData: AddItemToPackingListFormData) => {
//     mutate({
//       itemId,
//       packingListId: data.packing_list_id,
//       formData,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]">
//             Editar Item del Packing List
//           </h1>
//         </div>

//         <div className="mb-6">
//           <Link
//             to={-1 as any}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow border"
//           >
//             ← Regresar
//           </Link>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
//           <div className="h-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]" />

//           <form
//             className="p-8 space-y-6"
//             onSubmit={handleSubmit(handleForm)}
//             noValidate
//           >
//             <AddItemToPackingListForm
//               register={register}
//               errors={errors}
//             />

//             <button
//               type="submit"
//               disabled={isPending}
//               className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white font-bold py-4 rounded-xl"
//             >
//               {isPending ? "Guardando..." : "Guardar Cambios"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
