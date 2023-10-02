import React from "react";
import CategoryFilterSideBar from "./ProductSideBar/CategoryFilterSideBar";
import LatestSideBar from "./ProductSideBar/LatestSideBar";

function SideBar() {
  return (
    <>
      <div className="">
        <>  
          {/* <CategoryFilterSideBar /> */}
          <LatestSideBar />
        </>
      </div>
    </>
  );
}

export default SideBar;
