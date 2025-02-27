import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, departments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    // Check if department already exists
    // const existingDep = await Department.findOne({ dep_name });
    // if (existingDep) {
    //   return res.status(400).json({ success: false, error: "Department already exists" });
    // }

    const newDep = new Department({ dep_name, description });
    await newDep.save();
    res.status(201).json({ success: true, department: newDep });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    res.status(200).json({ success: true, department });
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true } // Return updated document
    );
    if (!updateDep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    res.status(200).json({ success: true, updateDep });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteDep = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await Department.findByIdAndDelete(id);
    if (!deleteDep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    res.status(200).json({ success: true, deleteDep });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDep };
