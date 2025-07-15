import { Request, Response, NextFunction, response } from "express";
import { createEmployeeSchema, updateInput } from "../schema/userEmployee.schema";
import { UserEmployeeService } from "../services/createEmployee.service";
import { getEmployeeListInput } from "../schema/userEmployee.schema";
import { deleteEmployeeSchema } from "../schema/userEmployee.schema";
export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('Received req.body:', req.body);
console.log('Received req.file:', req.file);
    const profileUrl = req.file?.path

    const input = createEmployeeSchema.parse({...req.body, profile:profileUrl});
    const result = await UserEmployeeService.create(input);

    if (!result.success) {
      res.status(400).json({status:result.success, message: result.message });
      return;
    }

    res.status(201).json({
      status:result.success,
      message: "Employee created successfully",
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};


export const getEmployee= async(
    req:Request,
    res:Response,
    next:NextFunction
):Promise<void>=>{
    try {
        const input = getEmployeeListInput.parse(req.body);
        const result = await UserEmployeeService.getEmployee(input);

        if (result.success) {
            res.status(200).json({
                success: true,
                data: result.data,
                message: result.message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteemployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
   
    try {
    
       const id = parseInt(req.params.id);
       const input = deleteEmployeeSchema.parse({id});
    const result = await UserEmployeeService.deleteemployee(input);
    if (result.success === false) {
      res.status(404).json({ message: result.message });
      return;
    }
    res.status(200).json( "Employee deleted successfully" );
    } catch (error) {
        next(error);
    }
};

export const updateEmployee = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
            const input = updateInput.parse({ ...req.body, id });
        const result = await UserEmployeeService.updateservice(input);
        if (result.success == false) {
            res.status(404).json({ message: result.message });
            return;
        }
        res.status(200).json({status:result.success,data:result.newData, message:"update succcesfull"});
    } catch (error) {
        next(error);
    }
};

// export const uploadImage= async(
//     req:Request,
//     res:Response,
//     next:NextFunction
// ):Promise<void>=>{
//     try {
        
//     } catch (error) {
        
//     }
// }
