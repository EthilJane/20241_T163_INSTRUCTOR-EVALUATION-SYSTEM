import { Evaluation } from '../Model/Evaluation';
import { v4 as uuidv4 } from 'uuid';
type EvaluationValues = {
  evaluation_id?: number;
  semester: string;
  evaluation: string;
  college: string;
  deadline: Date;
};

export default {
  async addOrUpdateEvaluation(EvalDetails: EvaluationValues) {
    if (!EvalDetails.evaluation_id) {
      return await Evaluation.create({
        semester: EvalDetails.semester,
        college: EvalDetails.college,
        deadline: EvalDetails.deadline,
        evaluation_title: EvalDetails.evaluation,
        link_id: uuidv4(),
      });
    }
    return await Evaluation.update(
      {
        semester: EvalDetails.semester,
        college: EvalDetails.college,
        deadline: EvalDetails.deadline,
        evaluation_title: EvalDetails.evaluation,
      },
      {
        where: {
          id: EvalDetails.evaluation_id,
        },
      }
    );
  },
  async getAllEvaluation() {
    return await Evaluation.findAll({
      order: [['deadline', 'desc']],
      attributes: [
        ['id', 'evaluation_id'],
        ['evaluation_title', 'evaluation'],
        'deadline',
        'semester',
        'college',
        'link_id',
      ],
    });
  },
  async deleteEval(EvalDetails: EvaluationValues) {
    return await Evaluation.destroy({
      where: { id: EvalDetails.evaluation_id },
    });
  },
};
