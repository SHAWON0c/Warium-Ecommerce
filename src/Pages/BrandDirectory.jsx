import React from "react";

const BrandDirectory = () => {
  return (
   <div className="bg-black text-white py-10  ">
     <div className="max-w-[1320px] mx-auto">
      <h2 className="text-red-400 font-bold uppercase mb-4">Brand Directory</h2>

      <div className="space-y-4 text-sm">
        <div>
          <span className="font-semibold text-white">Fashion :</span>{" "}
          T-Shirt | Shirts | Shorts & Jeans | Jacket | Dress & Frock | Innerwear | Hosiery
        </div>

        <div>
          <span className="font-semibold text-white">Footwear :</span>{" "}
          Sport | Formal | Boots | Casual | Cowboy Shoes | Safety Shoes | Party Wear Shoes | Branded | Firstcopy | Long Shoes
        </div>

        <div>
          <span className="font-semibold text-white">Jewellery :</span>{" "}
          Necklace | Earrings | Couple Rings | Pendants | Crystal | Bangles | Bracelets | Nosepin | Chain | Earrings | Couple Rings
        </div>

        <div>
          <span className="font-semibold text-white">Cosmetics :</span>{" "}
          Shampoo | Bodywash | Facewash | Makeup Kit | Liner | Lipstick | Prefume | Body Soap | Scrub | Hair Gel | Hair Colors | Hair Dye | Sunscreen | Skin Loson | Liner | Lipstick
        </div>
      </div>
    </div>
   </div>
  );
};

export default BrandDirectory;
