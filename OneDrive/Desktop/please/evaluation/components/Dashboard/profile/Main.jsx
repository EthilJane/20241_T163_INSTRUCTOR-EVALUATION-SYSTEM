import '@/constants/styles/profile.css';
import { useEffect, useState } from 'react';
import AdditionEmployeInfo from './AdditionalInfo';
import { getInfo } from '@/utils/api';
import { useAssetsContext } from '@/components/AssetsContext';

const Profile = ({
  role
}) => {
  const [profileDetails, setProfileDetails] = useState({
    email: '',
    picture: '',
    name: '',
  });
  const imgAssets = useAssetsContext();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        setProfileDetails((await getInfo()).data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProfileDetails();
  }, []);

  if (isLoading) return;

  if (error) return;

  return (
    (<div className="profile-main">
      <div className="profile-backgroud-image-holder">
        <img src={imgAssets.bgImg}></img>
      </div>
      <div className="profile-main-content">
        <div className="profile-image-container">
          <img className="profile-image" src={profileDetails.picture}></img>
          <div className="profile-details">
            <p className="profile-name">{profileDetails.name}</p>
            <p className="profile-email">{profileDetails.email}</p>
          </div>
        </div>
        {role == 'instructor' && <AdditionEmployeInfo></AdditionEmployeInfo>}
      </div>
    </div>)
  );
};

export default Profile;
