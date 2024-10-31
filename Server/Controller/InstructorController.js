


            // INSTRUCTOR LOGIN
const login = async (req, res) => {
  const { UEmail, password } = req.body; // Assuming password is sent in the request body

  try {
      const instructor = await Instructor.findOne({ UEmail });
      if (!instructor) {
          return res.status(404).json({ message: 'Instructor not found' });
      }

      // Compare password (assuming you have hashed passwords)
      const isMatch = await bcrypt.compare(password, instructor.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign({ id: instructor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, instructor: { id: instructor._id, name: instructor.name, UEmail: instructor.UEmail } });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

            // VIEW PROFILE
const viewProfile = async (req, res) => {
  try {
      const instructor = await Instructor.findById(req.user.id); 
      if (!instructor) {
          return res.status(404).json({ message: 'Instructor not found' });
      }
      res.json(instructor);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

            // ADD INSTRUCTOR INFORMATION
const Information = async (req, res) => {
  const { evaluationData } = req.body; // Assuming evaluation data is sent in the request body

  try {
      // Save evaluation data logic here (you may need a separate model for evaluations)
      // For example:
      const evaluation = new Evaluation({ instructorId: req.user.id,});
      await evaluation.save();

      res.status(201).json({ message: 'Evaluation information added successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

// View the list of evaluations
const viewEvaluation = async (req, res) => {
  try {
      // Fetch evaluations for the instructor
      // const evaluations = await Evaluation.find({ instructorId: req.user.id });

      // For demonstration, let's assume evaluations is an array of evaluation objects
      // res.json(evaluations);

      res.json([]); // Replace with actual evaluations
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  login,
  viewProfile,
  Information,
  viewEvaluation,
}