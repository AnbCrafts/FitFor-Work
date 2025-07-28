import Employee from "../Models/Employee.Models.js"
import Seeker from "../Models/Seeker.Models.js";
import User from "../Models/User.Models.js";


const getAllEmployees = async(req,res)=>{
    try {
        const employees = await Employee.find({});
        if(!employees || employees.length<0){
            return res.json({success:false, message:"Cannot get employees"});
        }
        return res.json({success:true, message:" got all the employees", employees});


    } catch (error) {
            return res.json({success:false, message:"Internal Sever error"});
        
    }
} 
const getEmployeeById = async(req,res)=>{
    try {
        const {empId} = req.params;
        if(!empId){
        return res.json({success:false, message:"Cannot get employee id"});

        }
        const employee = await Employee.findById(empId);
        if(!employee ){
            return res.json({success:false, message:"Cannot get employee for this id"});
        }
        return res.json({success:true, message:" got the employee for this id", employee});


    } catch (error) {
            return res.json({success:false, message:"Internal Sever error"});
        
    }
}  

const getEmployeeBySeekerId = async(req,res)=>{
    try {
        const {seekerId} = req.params;
        if(!seekerId){
        return res.json({success:false, message:"Cannot get seekerId"});

        }
        const employee = await Employee.find({seekerId:seekerId});
        if(!employee ){
            return res.json({success:false, message:"Cannot get employee for seekerId"});
        }
        return res.json({success:true, message:" got the employee for this id", employee});


    } catch (error) {
            return res.json({success:false, message:"Internal Sever error"});
        
    }
}
const getEmployeeByJobId = async(req,res)=>{
    try {
        const {jobId} = req.params;
        if(!jobId){
        return res.json({success:false, message:"Cannot get jobId"});

        }
        const employee = await Employee.find({jobId:jobId});
        if(!employee ){
            return res.json({success:false, message:"Cannot get employee for jobId"});
        }
        return res.json({success:true, message:" got the employee for this id", employee});


    } catch (error) {
            return res.json({success:false, message:"Internal Sever error"});
        
    }
}
const removeEmployee = async(req,res)=>{
    try {
        const {empId} = req.params;
        if(!empId){
        return res.json({success:false, message:"Cannot get employee id"});

        }
        const employee = await Employee.findByIdAndDelete(empId);
        if(!employee ){
            return res.json({success:false, message:"Cannot delete employee for this id"});
        }
        return res.json({success:true, message:" deleted the employee for this id"});


    } catch (error) {
            return res.json({success:false, message:"Internal Sever error"});
        
    }
}
const getUserDataByEmployeeId = async (req, res) => {
  try {
    const { empId } = req.params;

    if (!empId) {
      return res.status(400).json({ success: false, message: "Employee ID is required." });
    }

    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "No employee found for this ID." });
    }

    const seeker = await Seeker.findById(employee.seekerId);
    if (!seeker) {
      return res.status(404).json({ success: false, message: "No seeker linked to this employee." });
    }

    const user = await User.findById(seeker.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "No user linked to this seeker." });
    }

    const empData = {
      name: `${user.firstName} ${user.lastName}`,
      picture: user.picture,
      email: user.email,
      phone: user.phone,
      status: user.status,
      skills: seeker.skills,
      experience: seeker.experience,
      resume: seeker.resume,
      availableFrom: seeker.availableFrom,
      portfolioLink: seeker.portfolioLink
    };

    return res.status(200).json({
      success: true,
      message: "Employee user data retrieved successfully.",
      empData
    });

  } catch (error) {
    console.error("❌ Error fetching employee data:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const getUserDataObject = async (empId) => {
  if (!empId) return null;

  const employee = await Employee.findById(empId);
  if (!employee) return null;

  const seeker = await Seeker.findById(employee.seekerId);
  if (!seeker) return null;

  const user = await User.findById(seeker.userId);
  if (!user) return null;

  return {
    id:employee._id,
    name: `${user.firstName} ${user.lastName}`,
    picture: user.picture,
    email: user.email,
    phone: user.phone,
    status: user.status,
    skills: seeker.skills,
    experience: seeker.experience,
    resume: seeker.resume,
    availableFrom: seeker.availableFrom,
    portfolioLink: seeker.portfolioLink,
  };
};

const getEmployeeByCompanyId = async (req, res) => {
  try {
    const { compId } = req.params;

    if (!compId) {
      return res.status(400).json({ success: false, message: "Company ID is required." });
    }

    const employees = await Employee.find({ companyId: compId });
    if (!employees || employees.length === 0) {
      return res.status(404).json({ success: false, message: "No employees found for this company." });
    }

    const allEmpData = await Promise.all(
      employees.map(async (item) => await getUserDataObject(item._id))
    );

    const filteredEmpData = allEmpData.filter(Boolean); // Remove nulls (in case of failed lookups)

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully.",
      employee: filteredEmpData,
    });

  } catch (error) {
    console.error("❌ Error in getEmployeeByCompanyId:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



export {getAllEmployees,getEmployeeByCompanyId,getEmployeeById,getEmployeeByJobId,getEmployeeBySeekerId,removeEmployee,getUserDataByEmployeeId}