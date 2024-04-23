/* eslint-disable react/prop-types */
import { Pagination } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const Paginate = ({pages, page, isAdmin = false, keyword = ""}) => {

  const navigate = useNavigate();
  const handlePageChange = (page) => {
  
    if (!isAdmin){
      if(keyword) {
        navigate(`/search/${keyword}/page/${page}`);
      }else {
        navigate(`/product/page/${page}`);
      } 
    }else{
        navigate(`/admin/productlist/${page}`);
      }
  };
  return (
    <Pagination total={pages} value={page} mt="xl" onChange={(page) => handlePageChange(page)} />
  );
};

export default Paginate;
