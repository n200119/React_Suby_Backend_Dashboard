import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddProduct = () => {

  const [productName,setProductName]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState([]);
  const [bestSeller,setBestSeller]=useState(false);
  const [image,setImage]=useState(null);
  const [description,setDescription] = useState("");

const handleBestSellerChange =(e)=>{
  const value = e.target.value === "true";
  setBestSeller(value);
}

const handleImageChange = (event)=>{

  const selectedImage = event.target.files[0];
  setImage(selectedImage);

}

const handleCategoryChange = (e)=>{
  const value = e.target.value;
  if(category.includes(value))
  {
    setCategory(category.filter((item)=>item!==value));
  }
  else{
    setCategory([...category,value]);
  }
}

  const handleAddProduct = async (e)=>{

    e.preventDefault();
    try {
      
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");
      if(!loginToken || firmId)
      {
        console.error("User is not authenticated");
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image",image);
      formData.append("bestSeller",bestSeller);
      category.forEach((value) => {
        formData.append("category", value);
      });
      

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:"POST",
        body:formData
      })

      const data = await response.json();

      if(response.ok)
      {
        console.log(data);
        alert("product added successfully");
        setProductName("");
        setPrice("");
        setCategory([]);
        setDescription("");
        setBestSeller(false);
        setImage(null);
      }

    } catch (error) {
      console.log(error);
      alert("adding of product failed");
      
    }

  }
  return (
    <div className="w-full flex justify-center items-center">
      <form className="border-2 shadow-xl shadow-black border-slate-800 w-full max-w-xl flex-col px-10 py-4 text-sm justify-center items-center rounded" onSubmit={handleAddProduct}>
        <h1 className="font-bold text-3xl text-center text-[#D7263D]">ADD PRODUCT</h1>
        <label>ProductName</label>
        <br />
        <input
          type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}
          className="w-full max-w-xl border-2 border-slate-950 p-0.5 my-2 rounded-lg"
        />
        <br />
        <label>Price</label>
        <br />
        <input
          type="text" value={price} onChange={(e)=>setPrice(e.target.value)}
          className="w-full max-w-xl border-2 border-slate-950 p-0.5 my-2 rounded-lg"
        />
        <br />
        {/* <label>Category</label><br/>
            <input type="text" className="w-full max-w-xl border-2 border-slate-950 p-0.5 my-2 rounded-lg"/><br/> */}
        <div className="flex-col">
          <label>category</label>
          <div className="flex">
            <div className="px-3">
              <label>veg</label>
              <input
                type="checkbox"
                value="veg"
                className="m-2 mb-0"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="px-3">
              <label>Non-veg</label>
              <input
                type="checkbox"
                value="non-veg"
                className="m-2 mb-0"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        <br />
        {/* <label>BestSeller</label>
        <br />
        <input
          type="text"
          className="w-full max-w-xl border-2 border-slate-950 p-0.5 my-2 rounded-lg"
        /> */}
        <div className="flex-col">
          <label>BestSeller</label>
          <div className="flex">
            <div className="px-3">
              <label>Yes</label>
              <input
                type="radio"
                value="true"
                className="m-2 mb-0" checked={bestSeller===true}
                onChange={handleBestSellerChange}
              />
            </div>
            <div className="px-3">
              <label>No</label>
              <input
                type="radio"
                value="false"
                className="m-2 mb-0" checked={bestSeller===false}
                onChange={handleBestSellerChange}
              />
            </div>
          </div>
        </div>
        <br />
        <label>Description</label>
        <br />
        <input
          type="text" value={description} onChange={(e)=>setDescription(e.target.value)}
          className="w-full max-w-xl border-2 border-slate-950 p-0.5 rounded-lg my-2"
        />
        <br />
        <label>Image</label>
        <br />
        <input type="file" className="my-1" onChange={handleImageChange} />
        <br />
        <br />
        <div>
          <button className="bg-blue-500 px-5 py-1 text-white rounded" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
