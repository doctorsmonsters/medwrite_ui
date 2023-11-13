import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteReferences,
  getReferences,
} from "../../../Services/Reference.service";
import { Drawer, Box, Typography } from "@mui/material";
import { MdOutlineStyle } from "react-icons/md";
import { referenceMaker } from "../../../Constans/Helpers";
import Loading from "../../../Components/Loading";

const ReferenceDrawer = ({
  open,
  setOpen,
  article,
  setRefStyleOpen,
  selectedStyle,
  setRefs,
}) => {
  const queryClient = useQueryClient();
  const [deletingReferenceindex, setdeletingReferenceindex] =
    React.useState(null);

  const deleteReference = (id, index) => {
    setdeletingReferenceindex(index);
    deleteReferenceMutation.mutate(id);
  };

  const deleteReferenceMutation = useMutation({
    mutationFn: (data) =>
      deleteReferences(data)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error;
        })
        .finally(() => setdeletingReferenceindex(null)),
    onSuccess: () => {
      queryClient.invalidateQueries(["references"]);
    },
  });

  const referenceQuery = useQuery({
    queryKey: ["references"],
    queryFn: () =>
      getReferences({ article_id: article }).then((res) => {
        setRefs(res.data.data);
        return res.data.data;
      }),
  });

  return (
    <Drawer
      anchor="right"
      open={open}
      disableAutoFocus
      PaperProps={{
        sx: {
          width: "60%",
          background: "#EAECEE",
          "@media (max-width: 768px)": {
            width: "90%",
          },
        },
      }}
      onClose={() => setOpen((prev) => !prev)}
    >
      <Box sx={{ px: 5, py: 8 }} color="white" height="100%">
        <Typography
          variant="h4"
          component="h5"
          className="text-black pb-4 border-b-2 border-black flex justify-between"
        >
          Article's Reference
          <span>
            <MdOutlineStyle
              className="cursor-pointer"
              onClick={() => setRefStyleOpen(true)}
            />
          </span>
        </Typography>

        <Box
          component="div"
          className="my-5 h-full w-full bg-pink-00 overflow-y-auto"
        >
          {referenceQuery.isLoading && (
            <div className="flex items-center justify-center my-12">
              <Loading />
            </div>
          )}
          {referenceQuery.isSuccess && (
            <>
              {referenceQuery.data.map((item, index) => {
                return (
                  <Box
                    component="div"
                    className="mx-2 mb-6 bg-[#f9f9f9] rounded-md relative"
                    key={item.id}
                  >
                    {deleteReferenceMutation.isLoading &&
                      deletingReferenceindex === index && (
                        <div className="absolute h-full w-full bg-gray-200 opacity-100 flex items-center justify-center">
                          <Loading />
                        </div>
                      )}

                    <Box
                      component="div"
                      className="!text-black p-5"
                      dangerouslySetInnerHTML={{
                        __html: referenceMaker(selectedStyle?.name, item),
                      }}
                    />

                    <div className="capitalize text-gray-600 mb-5">
                      <span
                        className="absolute right-0 bottom-0 cursor-pointer bg-black rounded-t-md text-sm px-10 py-1 hover:bg-gray-600 text-white"
                        onClick={() => deleteReference(item.id, index)}
                      >
                        Delete
                      </span>
                    </div>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default ReferenceDrawer;
