
import Product from "../models/Product.js"
import { v2 as cloudinary } from 'cloudinary'; // ✅ correct SDK







// add product :  /api/product/add
export const addProduct=async(req ,res)=>{
  try {
    let productData =JSON.parse(req.body.productData)
    const images =req.files 
    let imagesUrl =await Promise.all(
      images.map(async(item)=>{
      let result =await cloudinary.uploader.upload(item.path,{resource_type:'image'})
      return result.secure_url
    })
    )

    await Product.create({...productData,image:imagesUrl})
    res.json({success:true,message:"product added"})
  } catch (error) {
      console.log(error.message);
    
    res.json({success:false,message:error.message})
  }


}


// get product :  /api/product/list
export const productList=async(req ,res)=>{

   try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching product list:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
  
}



// get single  product :  /api/product/id
export const productById=async(req ,res)=>{
 try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
  
}

// change product  inStock:  /api/product/stock
export const changeStock=async(req ,res)=>{
 try {
  const { id, inStock } = req.body;

const product = await Product.findByIdAndUpdate(
  id,
  { inStock },
  { new: true }
);


    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Stock updated", product });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ success: false, message: "Failed to update stock" });
  }
  
}