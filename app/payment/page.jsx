"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateCardName, updateCardNumber, updateCVC, updateMonthYear } from "@app/redux/features/payment/paymentSlice";

import { AiOutlineLeft } from "react-icons/ai";
import axios from "axios";
import Footer from "@components/Footer";
import Input from "@components/Input";

const Payment = () => {
  const { cardName, CardNumber, cvc, monthYear } = useSelector((state) => state.payment)
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState()
  const [mail, setMail] = useState()
  const [id, setId] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    setId(localStorage.getItem("podcastId"));
    setMail(localStorage.getItem("podcastMail"));
    const token =
      localStorage.getItem("podcastToken") === undefined ||
        localStorage.getItem("podcastToken") === null
        ? ""
        : localStorage.getItem("podcastToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getUserDetails = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config
        )
        .then((res) => {
          // console.log("user: ", res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => { setIsLoaded(false) });
    };

    getUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <main className="w-full h-full">
      <div className="w-full p-5 lg:p-10 flex flex-col  gap-7">
        <div className="mb-5 self-center">
          <Image
            src={"/images/tpg.png"}
            width={150}
            height={50}
            className="self-end"
            alt="Pow image"
          />
        </div>

        <div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
          <Link href={"/create-profile"} className="">
            <div>
              <AiOutlineLeft size={22} className="text-primary" />
            </div>
          </Link>
          <p className="text-primary text-base font-normal">Back</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-1/3 flex flex-col items-center justify-center">
          <form className="w-full flex flex-col justify-center items-center gap-5">
            <div className="w-full flex flex-col gap-2">
              <p className="text-primary text-left text-xl font-semibold">Contact Inforamtion</p>
              <div className='h-12 w-full rounded-md bg-white border flex items-center border-grey-100 px-6 text-sm focus:border-2 focus:border-blue-500'>
                {data ? data?.user?.email : mail }
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <p className="text-primary text-left text-xl font-semibold">Payment Information</p>
              <Input
                inputholder={"CARD HOLDER NAME"}
                onChangeValue={(e) => { dispatch(updateCardName(e.target.value)) }}
                value={cardName}
                type="text"
                required
              />
              <Input
                inputholder={"CARD NUMBER"}
                onChangeValue={(e) => { dispatch(updateCardNumber(e.target.value)) }}
                value={CardNumber}
                type="text"
                required
              />
              <div className="w-full flex flex-row justify-between items-center gap-2">
                <Input
                  inputholder={"MM / YY"}
                  onChangeValue={(e) => { dispatch(updateMonthYear(e.target.value)); }}
                  value={monthYear}
                  type="month"
                  required
                  pattern={"[0-1]{1}[0-9]{1}/[0-9]{4}"}
                />
                <Input
                  inputholder={"CVC"}
                  onChangeValue={(e) => { dispatch(updateCVC(e.target.value)) }}
                  value={cvc}
                  type="text"
                  required
                />
              </div>
            </div>

            <div className="">
              <p className="text-xs text-center">
                <span className="">
                  <input type="checkbox" className="w-2.5 h-2.5" />
                </span> I agree to thepodcastexpert.co.uk <span className="underline text-success">Terms and Conditions</span> and <span className="underline text-success">Privacy Policy</span>
              </p>
            </div>

            <button type="submit" className="h-12 w-full rounded-md bg-success text-primary text-sm font-semibold">Subscribe</button>
          </form>

          <div className="text-center flex flex-col items-center gap-5 mt-3 mb-14">
            <p className="text-xs text-grey-100">
              By confirming your subscription, you allow thepodcastexpert.co.uk to change
              your card for this payment and future payments in accordance
              with their terms. You can always cancel your subscription.
            </p>

            <p className="text-xs text-grey-100">
              Powered By <span className="font-black">Stripe</span> | Terms and Conditions | Privacy Policy | Contact
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default Payment