import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      console.log(error);
      alert("failed to fetch products");
    }
  };

  const deleteButton = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        confirm("do you want to delete?");
        alert("product deleted successfully");
        setProducts(products.filter((item) => item._id !== productId));
      }
    } catch (error) {
      console.log(error);
      alert("failed to delete the product");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);
  return (
    <div>
      {!products ? (
        <p>No products found</p>
      ) : (
        <table className="border-2 border-black w-screen max-w-screen-lg mt-20 ml-3">
          <thead>
            <tr>
              <th className="border-2 border-black p-3 bg-slate-400">
                ProductName
              </th>
              <th className="border-2 border-black p-3 bg-slate-400">Price</th>
              <th className="border-2 border-black p-3 bg-slate-400">Image</th>
              <th className="border-2 border-black p-3 bg-slate-400">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <td className="border-2 border-black p-3">
                      {item.productName}
                    </td>
                    <td className="border-2 border-black p-3">{item.price}</td>
                    <td className="border-2 border-black p-3">
                      {item.image && (
                        <img
                          src={`${API_URL}/uploads/${item.image}`}
                          alt={item.productName}
                          style={{ height: "50px", width: "50px" }}
                        />
                      )}
                    </td>
                    <td className="border-2 border-black p-3">
                      <button
                        className="bg-orange-100 border-2 border-stone-950 px-3 py-1 rounded"
                        onClick={() => deleteButton(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
