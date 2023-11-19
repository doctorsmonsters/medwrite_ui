import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteReferences,
  getReferences,
} from "../../../Services/Reference.service";
import { Drawer, Box, Typography } from "@mui/material";
import { MdOutlineStyle } from "react-icons/md";
import ReferenceWrapper from "../../Wrapper/ReferenceWrapper/ReferenceWrapper";
import Loading from "../../../Components/Loading";

const ReferenceDrawer = ({
  open,
  setOpen,
  article,
  setRefStyleOpen,
  selectedStyle,
  setRefs,
  addTextToEditor,
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
              {referenceQuery.data
                .sort((a, b) => b.ref_num < a.ref_num)
                .map((item, index) => {
                  return (
                    <ReferenceWrapper
                      index={index}
                      item={item}
                      selectedStyle={selectedStyle}
                      deletingReferenceindex={deletingReferenceindex}
                      deleteReferenceMutation={deleteReferenceMutation}
                      deleteReference={deleteReference}
                      addTextToEditor={addTextToEditor}
                    />
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
