import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getReferences } from "../../../Services/Reference.service";
import { Drawer, Box, Typography } from "@mui/material";
import { MdOutlineStyle } from "react-icons/md";
import { removeHTMLTags } from "../../../Constans/Helpers";
import Loading from "../../../Components/Loading";

const ReferenceDrawer = ({
  open,
  setOpen,
  article,
  setRefStyleOpen,
  setRefs,
}) => {
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
                    className="p-3 mx-2 my-3 bg-[#f9f9f9] rounded-md relative"
                    key={index}
                  >
                    <Typography
                      variant="body1"
                      component="h5"
                      className="text-black py-2 font-semibold"
                    >
                      {item?.title}
                    </Typography>

                    <span
                      // onClick={toggleDescription}
                      className="capitalize text-gray-600"
                    >
                      {/* {showFullDescription ? "Read Less" : "Read More"} */}
                      {removeHTMLTags(item.abstract_text)}
                    </span>
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
