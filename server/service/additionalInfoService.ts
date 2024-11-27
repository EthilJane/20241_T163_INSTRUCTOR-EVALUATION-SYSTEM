import { Op } from 'sequelize';
import { AdditionalInfo } from '../Model/AdditionalInfo';

export default {
  async getEmployeeAdditonalInfo(email: string) {
    try {
      let additional_info = await AdditionalInfo.findOne({
        where: {
          username: {
            [Op.eq]: email,
          },
        },
        rejectOnEmpty: true,
      });
      return {
        employee_id: additional_info.employee_id,
        office_type: additional_info.office_type,
        department: additional_info.department,
        subject: additional_info.subject_code,
        college: additional_info.college,
        total_student: additional_info.total_student,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  async updateAdditionalInfo(additionalInfo: {
    username: string;
    subject: string;
    college: string;
    total_student: number;
    employee_id: number;
    office_type: string;
  }) {
    await AdditionalInfo.upsert({
      username: additionalInfo.username,
      employee_id: additionalInfo.employee_id,
      subject_code: additionalInfo.subject,
      college: additionalInfo.college,
      total_student: additionalInfo.total_student,
      office_type: additionalInfo.office_type,
    });
  },
};
