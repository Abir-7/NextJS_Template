import Login_logout from "../login_logout_button/login_logout";
import { ModeToggle } from "../theme/theme_toogle";

const Navbar = () => {
  return (
    <div className="w=full h-full flex justify-between items-center p-2">
      <div>Logo</div>
      <div className="flex items-center gap-2">
        <Login_logout></Login_logout> <ModeToggle></ModeToggle>
      </div>
    </div>
  );
};

export default Navbar;
