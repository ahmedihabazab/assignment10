export function successResponse({res , stsatusCode = 200 , msg = "done" , data}= {}){
    res.status(stsatusCode).json({ msg , data })
}