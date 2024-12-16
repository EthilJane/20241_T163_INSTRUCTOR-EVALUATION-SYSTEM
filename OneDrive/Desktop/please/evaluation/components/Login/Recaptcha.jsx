import { RECAPTCHA_ID } from '@/utils/constant';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
const Recaptcha = ({
  valueSetter
}) => {
  const recaptchaRef = useRef(null);
  const onChange = () => {
    valueSetter(recaptchaRef.current?.getValue() || '');
  };

  return (
    (<div style={{ display: 'grid', placeItems: 'center', marginTop: '15px' }}>
      <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_ID} onChange={onChange} />
    </div>)
  );
};

export default Recaptcha;
