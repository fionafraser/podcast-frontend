"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "@app/redux/features/search/searchSlice";

import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";

import AdminNav from "@components/AdminNav";
import Featured from "@components/Featured";
import Loader from "@components/Loader";

const AdminFeatured = () => {
  const { searched } = useSelector((state) => state.search);

  const router = useRouter();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const checks = async () => {
      const token = localStorage.getItem("podcastToken");
      setId(localStorage.getItem("podcastId"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
        .then(async (res) => {
          if (!res.data.user.isAdmin) router.push("/");

          await axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/user/profiles?category=all&location=&topic=`, { id }
            )
            .then((res) => {
              console.log(res)
              const prof = res?.data?.filter((i) => {
                return i.user._id !== id;
              });
              console.log(prof)
              setProfiles(prof);
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setIsLoaded(false);
            });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoaded(false);
        });
    };

    checks();
  }, []);

  useEffect(() => {
    const getSearched = async () => {
      const categories = profiles?.filter((i) => {
        for (let index = 0; index < i.topic_categories.length; index++) {
          let str = i?.topic_categories[index].toLowerCase()
          return searched === str;
        }
      });
      const users = profiles?.filter((i) => {
        let str = i.user.name.toLowerCase()
        return str.includes(searched.toLowerCase());
      });

      const prof = [...users, ...categories];
      setSearch(prof);
      // setProfiles(prof);
    };

    getSearched();
  }, [searched, profiles]);

  const logOut = async () => {
    localStorage.removeItem("podcastMail");
    localStorage.removeItem("podcastId");
    localStorage.removeItem("podcastToken");

    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`)
      .then((res) => {
        if (res.status === 204) router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoaded) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader template={false} numOfTemplate={20} />
      </div>
    )
  }

  return (
    <main className="flex flex-row w-full h-full relative">
      <div className="relative w-fit hidden lg:block">
        <AdminNav />
      </div>

      <section className="w-full relative">
        <div className="p-5 flex flex-row items-center justify-normal w-full gap-3 sticky top-0	z-30 bg-white">
          {/* <Link href={'/admin'} title="Home" className="lg:hidden">
							<HiOutlineHome color="#00CCBB" size={25} />
						</Link> */}
          <button onClick={() => { setIsOpen(!isOpen); console.log(isOpen) }} title="Home" className="lg:hidden sticky top-0">
            {!isOpen ? <AiOutlineMenu color="#00CCBB" size={25} /> : <RxCross2 color="#00CCBB" size={25} />}
          </button>
          <label className="bg-grey sticky top-0 p-1.5 px-2 rounded-md flex flex-row items-center w-full lg:w-[563px] outline-0 focus:outline-0">
            <input
              type="text"
              name="search"
              id="search"
              value={searched}
              onChange={(e) => {
                dispatch(updateSearch(e.target.value.trim()));
              }}
              placeholder="search user name or category"
              className="bg-grey w-full text-sm outline-0 focus:outline-0"
            />
            {/* <button
										type="button"
										className="bg-lightgreen p-1.5 rounded-md"
										onClick={() => 	{}}
									>
										<Image
											src={"/svgs/search.svg"}
											width={15}
											height={15}
											alt="Search icon"
										/>
									</button> */}
          </label>
          {/* <button
							onClick={() => {
								// setToggleDropdown(false);
								logOut();
							}}
							title="Sign Out"
							className="p-1.5 bg-lightgreen break-normal rounded-lg lg:hidden"
						>
							<pre className="text-xs text-center text-primary font-publicSans">
								Sign Out
							</pre>
						</button> */}
        </div>
        <div className="z-0 p-10">
          {isLoaded ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : profiles.length > 0 ? (
            <div className="grid min-[380px]:grid-cols-2 sm:grid-cols-3 min-[1120px]:grid-cols-4 2xl:grid-cols-6 gap-5">
              {searched ? (
                search.length > 0 ? (
                  search.map(
                    (
                      {
                        user: { image, name, _id, profile_type },
                        topic_categories
                      },
                      index
                    ) => (
                      <div key={index} className="h-80 w-full">
                        <Featured
                          key={index}
                          image={image}
                          name={name}
                          type={profile_type}
                          id={_id}
                          categories={topic_categories}
                          isAdmin={true}
                        />
                      </div>
                    )
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-4 ">
                    <Image
                      src={"/images/cloud.png"}
                      width={225}
                      height={225}
                      className=""
                      alt="No data image"
                      priority
                    />
                    <p className="text-center text-primary font-semibold text-lg">
                      No data found
                    </p>
                  </div>
                )
              ) : (
                profiles.map(
                  ({
                    user: { image, name, _id, profile_type },
                    topic_categories,
                  },
                    index
                  ) => (
                    <div key={index} className="h-80 w-full">
                      <Featured
                        key={index}
                        image={image}
                        name={name}
                        type={profile_type}
                        id={_id}
                        categories={topic_categories}
                        isAdmin={true}
                      />
                    </div>
                  )
                )
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-4 ">
              <Image
                src={"/images/cloud.png"}
                width={225}
                height={225}
                className=""
                alt="No data image"
                priority
              />
              <p className="text-center text-primary font-semibold text-lg">
                No data founded
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="absolute w-fit h-full z-50 lg:hidden">
        {isOpen && <AdminNav mobile isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </main>
  );
};

export default AdminFeatured;
