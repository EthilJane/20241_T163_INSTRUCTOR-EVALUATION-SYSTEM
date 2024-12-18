import { forwardRef, useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
const CustomDatePicker = ({
  date = new Date(),
  dateSetter
}) => {
  const [startDate, setStartDate] = useState(date);
  const CustomInput = forwardRef(({ className, onClick, value }, ref) => {
    return (
      (<button className={className} onClick={onClick} type="button" ref={ref}>
        {value}
      </button>)
    );
  });
  return (
    (<DatePicker
      selected={startDate}
      className="date-picker"
      onChange={(pickedDate) => {
        setStartDate(pickedDate || new Date());
        dateSetter(pickedDate || new Date());
      }}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      customInput={<CustomInput></CustomInput>} />)
  );
};

export default CustomDatePicker;
