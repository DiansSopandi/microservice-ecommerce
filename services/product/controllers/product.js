import  { Product } from '../models/product';

export const create = async ( req,res ) => {
    try {
        
        const { kode,name,description,price } = req.body;
        let check = await Product.findOne({kode});

        if(check){
            return res.json({
                success: false,
                message: `product code ${kode} already exist`
            });
        }

        let newProduct = new Product(req.body);
        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: `product ${name} success created...`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `unable create product ${error.message}`
        });
    }
}

export const buy = async ( req,res ) => {
    try {
        const { kode, name } = req.params;
        let isExist = await Product.findOne({ kode });

        if(!isExist){
            return res.json({
                success: false,
                message: `product code ${kode} ${name} doesn't exist`
            })
        }

        return res.status(200).json({
            success: true,
            message: isExist
        });

    } catch (error) {
        return res.json({
            success: false,
            message: `unable get product code ${error.message}`
        });
    }
}