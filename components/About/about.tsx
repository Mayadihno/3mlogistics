import React from "react";
import image from "../../public/port1.jpg";
import image1 from "../../public/port2.jpg";
import Image from "next/image";
const About = () => {
  return (
    <div className=" md:w-[90%] w-[95%] mx-auto">
      <h2 className="text-4xl font-semibold text-center md:py-8 py-6">
        About Us
      </h2>
      <div className="">
        <p className=" text-lg font-medium leading-10  md:pb-0 pb-4">
          We are wholesale exporters & suppliers specialized in processing,
          branding, and packaging of African foodstuffs. Items include soup
          ingredients , egusi, ogbono,Indomie Noodles palm oil, African spices,
          and seasonings. We import & export plantain flour, garri, yams and yam
          flour etc.
        </p>
        <div className="flex md:flex-row flex-col space-y-10 md:space-y-0 md:space-x-8 space-x-0 items-center w-full">
          <div className="md:w-[800px] w-full md:h-[500px]">
            <Image
              src={image}
              alt="about page image"
              width={1000}
              height={1000}
              className="w-full h-full object-contain md:rounded-[50px] rounded-sm"
            />
          </div>
          <div className="md:w-[800px] w-full md:h-[500px]">
            <Image
              src={image1}
              alt="about page image"
              width={1000}
              height={1000}
              className="w-full h-full object-contain md:rounded-[50px] rounded-sm"
            />
          </div>
        </div>
        <p className="text-lg font-medium leading-10 pb-3 md:pt-0 pt-4">
          Our Company is one of the widely trusted importer and suppliers of
          agricultural products from Nigeria to Denmark and any country in the
          world.
        </p>
      </div>
    </div>
  );
};

export default About;
