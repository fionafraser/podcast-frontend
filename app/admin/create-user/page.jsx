'use client'

import Dropdown from '@components/Dropdown';
import Input from '@components/Input';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
  const { } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [profileType, setProfileType] = useState("");
  const [image, setImage] = useState("");
  const [check, setCheck] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputFile = useRef(null);

  const router = useRouter();

  const changeName = (e) => {
    setFormInfo({ ...formInfo, name: e.target.value });
  };
  const changeEmail = (e) => {
    setFormInfo({ ...formInfo, email: e.target.value });
  };
  const changePassword = (e) => {
    setFormInfo({ ...formInfo, password: e.target.value });
  };
  const changeCPassword = (e) => {
    setFormInfo({ ...formInfo, confirm: e.target.value });
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    if (
      formInfo.email !== "" &&
      formInfo.name !== "" &&
      formInfo.password !== "" &&
      formInfo.confirm !== "" &&
      profileType !== ""
    ) {
      if (formInfo.password === formInfo.confirm) {
        const token = localStorage.getItem("podcastToken");
        const id = localStorage.getItem("podcastId");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/admin/create`,
            {
              email: formInfo.email,
              name: formInfo.name,
              password: formInfo.password,
              image,
              profile_type: profileType,
            },
            config
          )
          .then((res) => {
            if (res.status === 201) {
              router.push("/admin");
            }
          })
          .catch((err) => {
            setSubmitting(false);
            console.log(err);
          });
      } else {
        setSubmitting(false);
        alert("Password and Confirm password not the same");
      }
    } else {
      setSubmitting(false);
      alert("Please fill all field");
    }
  };

  return (
    <main className='flex flex-col justify-center items-center p-5'>
      <section className="w-full h-full bg-white flex flex-col items-center p-5">
        <div className="flex flex-col items-center justify-center gap-3 w-full self-center h-full">
          <div className="mb-5">
            <Image
              src={"/images/tpg.png"}
              width={150}
              height={50}
              className="self-end"
              alt="Pow image"
            />
          </div>
          <div className="flex flex-row items-center gap-10 justify-start self-start">
            <Link href={"/admin"} className="">
              <div>
                <Image
                  src={"/svgs/leftarrow.svg"}
                  width={10}
                  height={10}
                  alt="Left arrow to go back"
                  className=""
                />
              </div>
            </Link>
            <p className="text-primary text-base font-normal">Back</p>
          </div>

          <form onSubmit={(e) => handleSubmit(e)} className="w-full mt-2 flex flex-col items-center">
            <h1 className="text-primary text-left text-3xl font-black mb-3">
              Create new user
            </h1>

            <div className="flex flex-col gap-3 sm:w-125 w-full">
              <div className="w-full flex flex-col items-center justify-start gap-5">
                <div className="w-32 sm:w-32 h-32 sm:h-32 rounded-xl relative items-center justify-center flex">
                  {image ? (
                    <Image
                      src={image}
                      id="img"
                      alt="image"
                      fill
                      className="rounded-lg h-full w-full flex items-center justify-center"
                    />
                  ) : (
                    <div className=" bg-success w-full h-full rounded-xl relative items-center justify-center flex">
                      <Image
                        src={"/svgs/profile.svg"}
                        width={50}
                        height={50}
                        alt="profile icon"
                        className=""
                      />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    e.preventDefault();

                    const file = e.target.files?.[0];

                    if (!file) return;
                    if (!file.type.includes("image")) {
                      return alert("Please upload an image file");
                    }

                    const reader = new FileReader();

                    reader.readAsDataURL(file);
                    reader.onload = async () => {
                      const result = reader.result;

                      try {
                        const response = await fetch(`/api/upload`, {
                          method: "POST",
                          body: JSON.stringify({ path: result }),
                        });
                        const imageUrl = await response.json()
                        setImage(imageUrl.url)
                      } catch (error) {
                        console.log(error);
                        throw error;
                      }
                    };
                  }}
                />
                <button
                  type="button"
                  onClick={onButtonClick}
                  className="bg-success text-xs flex flex-row gap-3 justify-center items-center rounded-lg p-2 self-center"
                >
                  <Image
                    src={"/svgs/upload.svg"}
                    width={12}
                    height={12}
                    alt="upload image"
                    className=""
                  />
                  <p className="text-primary font-semibold">Change Avatar</p>
                </button>
                <p className="text-primary text-xs">File must not be above 1MB</p>
              </div>

              <div className="flex flex-col gap-3 sm:w-125 w-full">
                <Input
                  placeholder={"Full Name"}
                  onChangeValue={changeName}
                  value={formInfo.name}
                />
                <Input
                  placeholder={"Email"}
                  onChangeValue={changeEmail}
                  value={formInfo.email}
                />
                <Input
                  placeholder={"Password"}
                  onChangeValue={changePassword}
                  value={formInfo.password}
                  secureText
                />
                <Input
                  placeholder={"Confirm Password"}
                  onChangeValue={changeCPassword}
                  value={formInfo.confirm}
                  secureText
                />
                <Dropdown
                  options={[{ option: "Podcaster" }, { option: "Guest" }]}
                  value={profileType}
                  placeholder={'Profile Type'}
                  onChangeValue={(e) => setProfileType(e)}
                />
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="w-full h-12 bg-success text-primary text-lg font-extrabold rounded-lg mt-5"
                >
                  {!submitting ? "Create user" : "Creating user..."}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default page

