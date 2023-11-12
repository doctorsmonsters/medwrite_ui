import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteReferences, getReferences } from "../../../Services/Reference.service";
import { Drawer, Box, Typography } from "@mui/material";
import Loading from "../../../Components/Loading";
import { removeHTMLTags } from "../../../Constans/Helpers";

const ReferenceDrawer = ({ open, setOpen, article }) => {
  const [showFullDescription, setShowFullDescription] = React.useState(null)
  const [deletingReferenceindex, setdeletingReferenceindex] = React.useState(null)

  const toggleDescription = (index) => {
    setShowFullDescription(showFullDescription === index ? null : index)
  }

  const deleteReference = (id, index) => {
    setdeletingReferenceindex(index)
    deleteReferenceMutation.mutate(id)
  }

  const deleteReferenceMutation = useMutation({
    mutationFn: (data) =>
      deleteReferences(data)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error
        })
        .finally(() => setdeletingReferenceindex(null)),
  });

  const referenceQuery = useQuery({
    queryKey: ["references", deleteReferenceMutation.isSuccess],
    queryFn: () =>
      getReferences({ article_id: article }).then((res) => res.data.data),
  });

  return (
    <Drawer
      anchor="right"
      open={ open }
      disableAutoFocus
      PaperProps={ {
        sx: {
          width: "60%",
          background: "#EAECEE",
          "@media (max-width: 768px)": {
            width: "90%",
          },
        },
      } }
      onClose={ () => setOpen((prev) => !prev) }
    >
      <Box sx={ { px: 5, py: 8 } } color="white" height="100%">
        <Typography
          variant="h4"
          component="h5"
          className="text-black pb-4 border-b-2 border-black"
        >
          Article's Reference
        </Typography>

        <Box
          component="div"
          className="my-5 h-full w-full bg-pink-00 overflow-y-auto"
        >
          { referenceQuery.isLoading && (
            <div className="flex items-center justify-center my-12">
              <Loading />
            </div>
          ) }
          { referenceQuery.isSuccess && (
            <>
              { referenceQuery.data.map((item, index) => {
                const { abstract_text, title, id } = item
                const abstractText = removeHTMLTags(abstract_text)
                const abstractTextRefactored = abstractText.slice(0, 200);
                console.log(deletingReferenceindex === id);
                return (
                  <Box
                    component="div"
                    className="p-3 mx-2 my-3 bg-[#f9f9f9] rounded-md relative"
                    key={ index }
                  >
                    <Typography
                      variant="body1"
                      component="h5"
                      className="text-black py-2 font-semibold"
                    >
                      { title }
                    </Typography>

                    <div
                      className="capitalize text-gray-600 mb-5"
                    >
                      { showFullDescription !== index ? abstractTextRefactored + ". . ." : abstractText }
                      <span
                        className=" absolute right-0 bottom-0 cursor-pointer bg-black rounded-tl-md rounded-br-md text-sm hover:bg-gray-600 px-2 py-1 text-white"
                        onClick={ () => toggleDescription(index) }
                      >

                        { showFullDescription === index ? "Read Less" : "Read More" }
                      </span>
                      <span
                        className=" absolute right-[5.5rem] bottom-0 cursor-pointer bg-black rounded-t-md  text-sm px-2 py-1 hover:bg-gray-600  text-white"
                        onClick={ () => deleteReference(id, index) }
                      >
                        Delete
                      </span>

                      { deleteReferenceMutation.isLoading && deletingReferenceindex === index && (
                        <div className="flex items-center  justify-center my-5">
                          <Loading />
                        </div>
                      ) }
                    </div>
                  </Box>
                );
              }) }
            </>
          ) }
        </Box>
      </Box>
    </Drawer>
  );
};

export default ReferenceDrawer;
