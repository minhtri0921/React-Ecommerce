import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import Menu from "../components/Menu";
import axios from "axios";

const AdminPage = () => {
    const initialProductState = {
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating_rate: "",
        rating_count: "",
    };
    const [product, setProduct] = useState(initialProductState);
    const [productList, setProductList] = useState([]);
    const [showFields, setShowFields] = useState(false);
    const [isEditting, setIsEditting] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/products");
                setProductList(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProducts();
    }, []);

    const handleAddProduct = async () => {
        try {
            await axios.post("http://localhost:3001/products/add", product);

            const response = await axios.get("http://localhost:3001/products");
            setProductList(response.data);

            setProduct(initialProductState);

            setShowFields(false);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const editProduct = async () => {

        try {
            await axios.put("http://localhost:3001/products/editById", product);

        } catch (err) {
            console.log("Error edit Product " + err);
        }

        setShowFields(false);
        setIsEditting(false);
        setProduct(initialProductState)
        window.location.reload()
    }

    const handleEditProduct = (productId) => {
        const editingProduct = productList.find((prd) => {
            return prd.id === productId
        })
        setProduct(editingProduct)
        setShowFields(true);
        setIsEditting(true);
    };



    const handleDeleteProduct = async (productId) => {
        try {
            // Gửi request để xóa sản phẩm dựa vào productId
            await axios.delete(`http://localhost:3001/products/${productId}`);

            // Lấy danh sách sản phẩm mới sau khi xóa
            const response = await axios.get("http://localhost:3001/products");
            setProductList(response.data);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>

            <Navbar showButtons={false} />
            <div className="container my-3 py-3">
                <h1 className="text-center">Admin Page</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-8 col-lg-6 col-sm-10 mx-auto">
                        <button
                            className="my-2 px-4 mx-auto btn btn-dark"
                            onClick={() => setShowFields(!showFields)}
                        >
                            {showFields ? "Hide" : "Add"}
                        </button>
                        <Menu ></Menu>
                        {showFields && (
                            <>
                                <h2>{isEditting ? 'Edit Prodcut' : 'Add Product'}</h2>
                                <div className="form my-3">
                                    <label htmlFor="title">Product Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={product.title}
                                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                        placeholder="Enter product title"
                                    />
                                </div>
                                <div className="form my-3">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="price"
                                        value={product.price}
                                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                        placeholder="Enter product price"
                                    />
                                </div>
                                <div className="form my-3">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={product.description}
                                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                        placeholder="Enter product description"
                                    />
                                </div>
                                <div className="form my-3">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        className="form-control"
                                        id="category"
                                        value={product.category}
                                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                    >
                                        <option value="men's clothing">Men's Clothing</option>
                                        <option value="women's clothing">Women's Clothing</option>
                                    </select>
                                </div>
                                <div className="form my-3">
                                    <label htmlFor="image">ImageURL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="image"
                                        value={product.image}
                                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
                                        placeholder="Enter product image URL"
                                    />
                                </div>

                                <button
                                    className="my-2 px-4 mx-auto btn btn-dark"
                                    onClick={isEditting ? editProduct : handleAddProduct}
                                >
                                    {isEditting ? 'Edit' : 'Add'}
                                </button>

                            </>
                        )}

                        <hr />
                        <h2>Product List</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                style={{ width: "50px", height: "50px" }}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleEditProduct(product.id)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
