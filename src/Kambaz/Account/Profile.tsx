import { useState, useEffect } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import type { User } from "./reducer";
import type { RootState } from "../store";

export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin", { replace: true });
      return;
    }
    setProfile(currentUser);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin", { replace: true });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <div className="wd-profile-screen" style={{ padding: "2rem" }}>
      <h3>Profile</h3>
      <hr />
      <div>
        <label htmlFor="wd-username" style={{ fontWeight: "600" }}>
          Username
        </label>
        <FormControl
          defaultValue={profile.username}
          id="wd-username"
          className="mb-2"
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
        />

        <label htmlFor="wd-password" style={{ fontWeight: "600" }}>
          Password
        </label>
        <FormControl
          defaultValue={profile.password}
          id="wd-password"
          className="mb-2"
          onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })
          }
        />

        <label htmlFor="wd-firstname" style={{ fontWeight: "600" }}>
          First Name
        </label>
        <FormControl
          defaultValue={profile.firstName}
          id="wd-firstname"
          className="mb-2"
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />

        <label htmlFor="wd-lastname" style={{ fontWeight: "600" }}>
          Last Name
        </label>
        <FormControl
          defaultValue={profile.lastName}
          id="wd-lastname"
          className="mb-2"
          onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })
          }
        />

        <label htmlFor="wd-dob" style={{ fontWeight: "600" }}>
          Date of Birth
        </label>
        <FormControl
          defaultValue={profile.dob}
          id="wd-dob"
          className="mb-2"
          type="date"
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />

        <label htmlFor="wd-email" style={{ fontWeight: "600" }}>
          Email
        </label>
        <FormControl
          defaultValue={profile.email}
          id="wd-email"
          className="mb-2"
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        <label htmlFor="wd-role" style={{ fontWeight: "600" }}>
          Role
        </label>
        <select
          onChange={(e) => setProfile({ ...profile, role: e.target.value as any })}
          className="form-control mb-2"
          id="wd-role"
          defaultValue={profile.role}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>

        <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
          Sign out
        </Button>
      </div>
    </div>
  );
}
