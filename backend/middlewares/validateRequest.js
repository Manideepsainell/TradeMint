const validateRequest=(schema)=>(req,res,next)=>{
    try{
        schema.parse(req.body);
        next(); 
    }catch(err){
        res.status(400);

        const messages=err.issues.map(e=>e.message);
        const error=new Error(messages.join(","));
        next(error);
    }
};

export default validateRequest;