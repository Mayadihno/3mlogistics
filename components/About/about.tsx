import React from "react";
import image from "../../public/port1.jpg";
import image1 from "../../public/port2.jpg";
import Image from "next/image";
const About = () => {
  return (
    <div className=" w-[90%] mx-auto">
      <h2 className="text-4xl font-semibold text-center py-8">About Us</h2>
      <div className="">
        <p className=" text-lg font-medium leading-10">
          We are wholesale exporters & suppliers specialized in processing,
          branding, and packaging of African foodstuffs. Items include soup
          ingredients , egusi, ogbono,Indomie Noodles palm oil, African spices,
          and seasonings. We import & export plantain flour, garri, yams and yam
          flour etc.
        </p>
        <div className="flex space-x-8 items-center w-full">
          <div className="w-[800px] h-[500px]">
            <Image
              src={image}
              alt="about page image"
              width={1000}
              height={1000}
              className="w-full h-full object-contain rounded-[50px]"
            />
          </div>
          <div className="w-[800px] h-[500px]">
            <Image
              src={image1}
              alt="about page image"
              width={1000}
              height={1000}
              className="w-full h-full object-contain rounded-[50px]"
            />
          </div>
        </div>
        <p className="text-lg font-medium leading-10 pb-3">
          Our Company is one of the widely trusted importer and suppliers of
          agricultural products from Nigeria to Denmark and any country in the
          world.
        </p>
      </div>
    </div>
  );
};

export default About;
