const CustomInput = ({
  registerProps,
  errorField,
  defaultValue,
  labelName
}) => {
  return (<>
    <label>{labelName}</label>
    <input {...registerProps} defaultValue={defaultValue} type="input"></input>
    {errorField && (
      <p className="error-message-form">{errorField?.message}</p>
    )}
  </>);
};

export default CustomInput;
