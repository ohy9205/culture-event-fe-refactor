import ProtectRouter from "@/src/components/UI/ProtectRouter";
import MyInfo from "@/src/components/user/client/MyInfo";

const MyPage = () => {
  return (
    <ProtectRouter>
      <MyInfo />
    </ProtectRouter>
  );
};

export default MyPage;
