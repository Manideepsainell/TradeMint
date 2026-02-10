const validateRequest=(schema,source="body")=>(req,res,next)=>{
    try{
        const validatedData=schema.parse(req[source]);
        req[source]=validatedData;
        next(); 
    }catch(err){
        const messages=err.issues.map(e=>e.message);
        res.status(400);
        next(new Error(messages.join(", ")));
    }
};

export default validateRequest;