import { useEffect, useState } from "react";
import Input from "../../components/atoms/Input";
import SideBar from "../../components/organisms/SideBar";
import Cookies from "js-cookie";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import jwtDecode from "jwt-decode";
import { updateProfile } from "../../services/member";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface UserStateType {
  id: string;
  name: string;
  email: string;
  avatar: any;
  phoneNumber: string;
}
export default function EditProfile() {
  const [user, setUser] = useState<UserStateType>({
    id: "",
    name: "",
    email: "",
    avatar: "",
    phoneNumber: "",
  });
  const [imagePreview, setImagePreview] = useState("/");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;

      setUser(userFromPayload);
    }
  }, []);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("image", user.avatar);
    data.append("name", user.name);
    const response = await updateProfile(data, user.id);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Success Update Profile");
      Cookies.remove("token");
      router.replace("/sign-in");
    }
  };
  const IMG = process.env.NEXT_PUBLIC_IMG;
  return (
    <section className="edit-profile overflow-auto">
      <SideBar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview === "/" ? (
                      <img
                        src={`${IMG}/${user.avatar}`}
                        alt="icon-upload"
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%" }}
                      />
                    ) : (
                      <img
                        src={imagePreview}
                        alt="icon-upload"
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%" }}
                      />
                    )}
                  </label>
                  <input
                    onChange={(event) => {
                      const img = event.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({
                        ...user,
                        avatar: img,
                      });
                    }}
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="pt-30">
                <Input label="Email Address" value={user.email} disabled />
              </div>
              <div className="pt-30">
                <Input
                  label="Phone"
                  type="number"
                  value={user.phoneNumber}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      phoneNumber: event.target.value,
                    })
                  }
                />
              </div>
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
