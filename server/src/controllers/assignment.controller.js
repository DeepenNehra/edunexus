const { Assignment } = require('../models/Assignment');
const { Submission } = require('../models/Submission');
const { Course } = require('../models/Course');
const { uploadVideoToCloudinary, uploadDocumentToCloudinary } = require('../config/cloudinary');

async function listByCourse(req, res) {
  const { courseId } = req.params;
  const assignments = await Assignment.find({ course: courseId }).sort({ createdAt: -1 });
  return res.json({ assignments });
}

async function create(req, res) {
  try {
    const { courseId } = req.params;
    const { title, description, dueAt } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    
    let attachmentUrl = req.body.attachmentUrl;
    if (req.file) {
      // Check file type and use appropriate upload function
      const fileType = req.file.mimetype;
      if (fileType.startsWith('video/')) {
        const result = await uploadVideoToCloudinary(req.file.buffer);
        attachmentUrl = result.secure_url;
      } else if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
        const result = await uploadDocumentToCloudinary(req.file.buffer, req.file.originalname);
        attachmentUrl = result.secure_url;
      } else {
        return res.status(400).json({ error: 'Unsupported file type. Please use PDF, PNG, JPG, or video files.' });
      }
    }
    
    const assignment = await Assignment.create({ course: courseId, title, description, dueAt, attachmentUrl });
    return res.status(201).json({ assignment });
  } catch (err) {
    return res.status(500).json({ error: 'Failed: ' + err.message });
  }
}

async function submitAssignment(req, res) {
  try {
    const { id } = req.params; // assignment id
    const studentId = req.user.id;
    
    let fileUrl = req.body.fileUrl;
    if (req.file) {
      // Check file type and use appropriate upload function
      const fileType = req.file.mimetype;
      if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
        const result = await uploadDocumentToCloudinary(req.file.buffer, req.file.originalname);
        fileUrl = result.secure_url;
      } else if (fileType.startsWith('video/')) {
        const result = await uploadVideoToCloudinary(req.file.buffer);
        fileUrl = result.secure_url;
      } else {
        return res.status(400).json({ error: 'Unsupported file type. Please use PDF, PNG, JPG, or video files.' });
      }
    }
    
    if (!fileUrl) return res.status(400).json({ error: 'File URL or file required' });
    
    const existing = await Submission.findOne({ assignment: id, student: studentId });
    if (existing) {
      existing.fileUrl = fileUrl;
      existing.fileName = req.file?.originalname || existing.fileName;
      await existing.save();
      return res.json({ submission: existing });
    }
    
    const submission = await Submission.create({ 
      assignment: id, 
      student: studentId, 
      fileUrl,
      fileName: req.file?.originalname 
    });
    return res.status(201).json({ submission });
  } catch (err) {
    return res.status(500).json({ error: 'Failed: ' + err.message });
  }
}

async function listSubmissions(req, res) {
  try {
    const { id } = req.params; // assignment id
    const { courseId } = req.params;
    
    // Get assignment details
    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    
    // Get all submissions for this assignment
    const submissions = await Submission.find({ assignment: id }).populate('student', 'name email');
    
    // Ensure file URLs are accessible (transform if needed)
    const processedSubmissions = submissions.map(submission => {
      let fileUrl = submission.fileUrl;
      
      // If it's a Cloudinary URL, ensure it's using the correct format
      if (fileUrl && fileUrl.includes('cloudinary.com')) {
        // Force HTTPS and remove any authentication parameters that might cause issues
        fileUrl = fileUrl.replace('http://', 'https://');
        // Add fl_attachment for better PDF handling
        if (submission.fileName && submission.fileName.toLowerCase().endsWith('.pdf')) {
          fileUrl = fileUrl.replace('/upload/', '/upload/fl_attachment/');
        }
      }
      
      return {
        ...submission.toObject(),
        fileUrl: fileUrl
      };
    });
    
    // Get all enrolled students in the course
    const course = await Course.findById(courseId).populate('students', 'name email');
    const enrolledStudents = course?.students || [];
    
    // Create a map of submitted students
    const submittedStudentIds = new Set(submissions.map(s => s.student._id.toString()));
    
    // Find students who haven't submitted
    const notSubmittedStudents = enrolledStudents.filter(
      student => !submittedStudentIds.has(student._id.toString())
    );
    
    return res.json({ 
      assignment,
      submissions: processedSubmissions,
      enrolledStudents: enrolledStudents.length,
      submittedCount: submissions.length,
      notSubmittedStudents
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed: ' + err.message });
  }
}

module.exports = { listByCourse, create, submitAssignment, listSubmissions };

