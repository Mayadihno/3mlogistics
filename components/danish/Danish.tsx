import Image from "next/image";
import React from "react";
import image from "../../public/smilesImage.jpg";
import Link from "next/link";
const Danish = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <div className="w-[300px] object-cover">
        <Link
          href={
            "https://www.findsmiley.dk/Sider/Search.aspx?k=3m%20Logistics%20Solution"
          }
          target="_blank"
          rel="noreferrer"
        >
          <Image src={image} alt="smiles image" width={1000} height={560} />
        </Link>
      </div>
      <h3 className="text-xl font-semibold font-ebgaramond pt-4">
        See the Danish Veterinary and Food Administration&apos;s smiley reports
      </h3>
    </div>
  );
};

export default Danish;
