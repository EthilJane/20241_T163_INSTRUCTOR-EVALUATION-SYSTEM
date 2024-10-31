import Student_login from '../Db/Studentlogin'
import Student_firstfillout from  '../Db/Stud_firstfillout'
import Stud_rating1 from '../Db/Stud_rating1'
import bcry from 'bcrypt'
import jwt from 'jsonwebtoken'

// Student Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const student = await Student.findOne({ email });
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      // Compare password (assuming you have hashed passwords)
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, student: { id: student._id, email: student.email } });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};


// Confirmation as a Student
const confirmation = async (req, res) => {
  const { confirmation } = req.body;

  try {
      // Check if the confirmation matches 'student'
      if (confirmation.toLowerCase() !== 'student') {
          return res.status(400).json({ message: 'Confirmation failed. You are not a student.' });
      }
      res.json({ message: 'Confirmation successful. Proceed to fill out the evaluation.' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

// Fill Out the First Page
const firstpage = async (req, res) => {
  const { Rating_period, Semester, SChool_year, Name_of_Faculty, Subject, College, Room } = req.body;

  try {
      const firstPageData = new FirstPage({
          Rating_period,
          Semester,
          SChool_year,
          Name_of_Faculty,
          Subject,
          College,
          Room,
      });

      await firstPageData.save();
      res.status(201).json({ message: 'First page filled out successfully', data: firstPageData });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

// Lesson Presentation Rating
const secondpage = async (req, res) => {
  // Implement logic for Lesson Presentation rating
  // Similar to firstpage, you would save the rating data to a specific model
};

// Management of Learning Rating
const thirdpage = async (req, res) => {
  // Implement logic for Management of Learning rating
};

// Innovativeness and Creativity
const fourthpage = async (req, res) => {
  // Implement logic for Innovativeness and Creativity rating
};

// Mastery of the Subject Matter
const fifthpage = async (req, res) => {
  // Implement logic for Mastery of the Subject Matter rating
};

// Assessment of Learning
const sixthpage = async (req, res) => {
  // Implement logic for Assessment of Learning
};

// Comments and Suggestions
const seventhpage = async (req, res) => {
  // Implement logic for Comments and Suggestions
};

module.exports = {
  login,
  confirmation,
  firstpage,
  secondpage,
  thirdpage,
  fourthpage,
  fifthpage,
  sixthpage,
  seventhpage,
};