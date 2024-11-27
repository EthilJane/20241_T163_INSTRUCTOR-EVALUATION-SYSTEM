import {
  useState,
  ChangeEvent,
  useEffect,
  FormEventHandler,
  FormEvent,
} from 'react';
import '@/constants/styles/additionalInfo.css';
import {
  getInstructorAdditionalInfo,
  updateInstructorAdditionalInfo,
} from '@/utils/api';
export type AdditionalInformation = {
  employee_id: string;
  office_type: string;
  department: string;
  subject: string;
  college: string;
  total_student: string;
};
const INPUT_NAMES: AdditionalInformation = {
  employee_id: 'employee_id',
  office_type: 'office_type',
  department: 'department',
  subject: 'subject',
  college: 'college',
  total_student: 'total_student',
};

const PLACE_HOLDER_IF_EMPTY: AdditionalInformation = {
  employee_id: '',
  office_type: '',
  department: 'Department of Technology',
  subject: '',
  college: 'Department of Technology',
  total_student: '0',
};
const AdditionEmployeInfo = () => {
  const [additionalFormData, setAdditionalFormData] =
    useState<AdditionalInformation>(PLACE_HOLDER_IF_EMPTY);
  const [initialFormData, setInitialFormData] = useState<AdditionalInformation>(
    PLACE_HOLDER_IF_EMPTY
  );
  const [isLoading, setLoading] = useState(true);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAdditionalFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateInstructorAdditionalInfo(additionalFormData)
      .then(() => {
        console.log('submitted');
        setInitialFormData(additionalFormData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function formDataHasChanged() {
    console.log(additionalFormData, initialFormData);
    return !Object.entries(additionalFormData).every(([keys]) => {
      let key = keys as keyof AdditionalInformation;
      console.log(additionalFormData[key] == initialFormData[key]);
      return additionalFormData[key] == initialFormData[key];
    });
  }
  useEffect(() => {
    const getAdditionalInfo = async () => {
      try {
        let add_info = (await getInstructorAdditionalInfo())
          .data as AdditionalInformation;
        if (add_info.college) {
          setInitialFormData(add_info);
          setAdditionalFormData(add_info);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAdditionalInfo();
  }, []);

  if (isLoading) return;

  return (
    <div className="employee-additional-info-container">
      <h1>Additional Information</h1>
      <hr></hr>
      <div className="info-container">
        <form onSubmit={handleSubmit} className="additional-info-form">
          <div className="additional-info-form-content">
            <div>
              <label>Employee IDs</label>
              <input
                name={INPUT_NAMES.employee_id}
                onChange={handleChange}
                defaultValue={initialFormData.employee_id}
              ></input>
              <label>Office Type</label>
              <select
                onChange={handleChange}
                name={INPUT_NAMES.office_type}
                defaultValue={initialFormData.office_type}
              >
                <option defaultValue=""></option>
                <option value="IT Faculty">IT Faculty</option>
                <option value="EMC Faculty">EMC Faculty</option>
              </select>
              <label>Department</label>
              <input
                onChange={handleChange}
                disabled={true}
                name={INPUT_NAMES.department}
                defaultValue={initialFormData.department}
              ></input>
            </div>
            <div>
              <label>Subject Code / Subject Title</label>
              <select
                onChange={handleChange}
                name={INPUT_NAMES.subject}
                defaultValue={initialFormData.subject}
              >
                <option defaultValue=""></option>
                <option value="IT 137 - Elective 3">IT 137 - Elective 3</option>
                <option value="IT 135 - Information Assurance and Security 1">
                  IT 135 - Information Assurance and Security 1
                </option>
              </select>
              <label>College</label>
              <input
                disabled={true}
                defaultValue={initialFormData.college}
                name={INPUT_NAMES.college}
              ></input>
              <label>Total Student</label>
              <input
                onChange={handleChange}
                name={INPUT_NAMES.total_student}
                type="number"
                maxLength={3}
                defaultValue={initialFormData.total_student}
              ></input>
            </div>
          </div>
          <div>
            <hr></hr>
            {formDataHasChanged() && (
              <button className="submit-button">Save</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdditionEmployeInfo;
