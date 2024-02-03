import { useContext } from "react";
import { MyLikesContext } from "../context/MyLikesContext";

const useMyLikes = () => {
  return useContext(MyLikesContext);
};

export default useMyLikes;
