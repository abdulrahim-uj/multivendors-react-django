import React from "react";
import SideBar from "./SideBar";
import Category from "./Category";
import BottomProduct from "./CategoryFilter/BottomProduct";


function Product() {
  return (
    <>
      <div class="products-area mt-47 mt-sm-37">
        <div class="container-fluid">
          <div class="row">
            <SideBar />
            <Category />
            <BottomProduct />
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
