import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";


const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event)=>{

    const selectedImage = event.target.files[0];
    setFile(selectedImage)

  }

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.log("user in authenticated");
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image",file);
      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:"POST",
        headers:{
          "token":`${loginToken}`
        },
        body:formData
      })

      const data = await response.json();

      if(response.ok)
      {
        console.log(data);
        alert("firm added successfully");
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      localStorage.setItem("firmId",data.firmId)
      localStorage.setItem("firmName",data.firmName);
      window.location.reload();
      }
      else if(data.message==="only single firm should be added")
      {
          alert("only single firm should be added");
      }
      else{
        alert("failed to add firm");
      }
    } catch (error) {
      console.log(error);
      alert("adding of firm failed");
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <form className="border-4 border-slate-500 w-full max-w-xl flex-col px-10 py-1 text-sm justify-center items-center rounded" onSubmit={handleFirmSubmit}>
        <h1 className="font-bold text-xl text-center">ADD FIRM</h1>
        <label>FirmName</label>
        <br />
        <input
          type="text"
          value={firmName}
          name="firmName"
          onChange={(e) => setFirmName(e.target.value)}
          className="w-full max-w-lg border-2 border-slate-950 p-1 my-1 rounded-lg"
        />
        <br />
        <label>Area</label>
        <br />
        <input
          type="text"
          value={area}
          name="area"
          onChange={(e) => setArea(e.target.value)}
          className="w-full max-w-lg border-2 border-slate-950 p-1 my-1 rounded-lg"
        />
        <br />
        {/* <label>Category</label>
        <br />
        <input
          type="text"
          className="w-full max-w-2xl border-2 border-slate-950 p-1 my-3 rounded-lg"
        /> */}
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
        {/* <label>Region</label>
        <br />
        <input
          type="text"
          className="w-full max-w-lg border-2 border-slate-950 p-1 my-1 rounded-lg"
        /> */}
        <div className="flex-col">
          <label>Region</label>
          <div className="flex">
            <div className="px-3">
              <label>South Indian</label>
              <input
                type="checkbox"
                value="south-indian"
                className="m-2 mb-0"
                checked={region.includes("south-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="px-3">
              <label>North Indian</label>
              <input
                type="checkbox"
                value="north-indian"
                className="m-2 mb-0"
                checked={region.includes("north-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="px-3">
              <label>Chinese</label>
              <input
                type="checkbox"
                value="chinese"
                className="m-2 mb-0"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="px-3">
              <label>Bakery</label>
              <input
                type="checkbox"
                value="bakery"
                className="m-2 mb-0"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>
        <br />
        <label>Offer</label>
        <br />
        <input
          type="text"
          value={offer}
          name="offer"
          onChange={(e) => setOffer(e.target.value)}
          className="w-full max-w-lg border-2 border-slate-950 p-1 rounded-lg my-1"
        />
        <br />
        <label>FirmImage</label>
        <br />
        <input type="file" className="my-3" onChange={handleImageUpload}/>
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

export default AddFirm;
