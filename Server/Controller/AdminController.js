const adminlogin = require ('../Db/AdminLogin');
const adminprofile = require ('../Db/AdminProfile');
const addEvaluationform = require ('../Db/AdminEvaluation');
const bcrypt = require ('bcrypt');
const jwt = required ('jsonwebtoken');


            // ADMIN LOGIN
const login = async (req, res) => {
  try{
    // Find the existing account of an Admin
    const { email, password } = req.body;
    const admin = await admin.findOne({ UEmail: email });

    // if it's not found because of unexisting entities it response Admin not found
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
  }

    //if the input entities is not match it response invalid credentials
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
  }

   // Creation of JWT is to 
   const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.UEmail } });
} catch (error) {
   res.status(500).json({ message: 'Server error', error });
}
  };

          // VIEWING PROFILE
const profile = async (req, res) => {
  try {
    //It finds the profile using uunique identifier
      const admin = await admin.findById(req.admin.id);
      if (!admin) {
          return res.status(404).json({ message: 'Admin not found' });
      }
      res.json(admin);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

            // ADD EVALUATION FORM
const createEvaluation = async (req, res) => {
  try {
      const { Evaluation_Link, Semester, Instructor, college, Deadline } = req.body;
      const newEvaluation = new adminEvaluation({
          Evaluation_Link,
          Semester,
          Instructor,
          College,
          Deadline
      });

      await newEvaluation.save();
      res.status(201).json({ message: 'Evaluation form created successfully', newEvaluation });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

          // GENERATE LINKS FOR EVALUATION
const generateLink = async (req, res) => {
  try {
      const { baseLink } = req.body;
      //generate link
      const uniqueLink = `${baseLink}/${Date.now()}`;
      res.json({ link: uniqueLink });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

            //VIEW RATINGS FROM STUDENT EVALUATION
const viewRatings = async (req, res) => {
  try {
    //retreving evaluation
      const evaluations = await AdminEvaluation.find();
      res.json(evaluations);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};
export {login, profile, createEvaluation, generateLink, viewRatings};