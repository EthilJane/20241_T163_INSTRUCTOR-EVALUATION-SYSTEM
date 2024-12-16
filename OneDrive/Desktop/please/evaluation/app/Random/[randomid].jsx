import { useLocalSearchParams } from 'expo-router';

const RandomLink = () => {
  const { randomid } = useLocalSearchParams();

  return (<>
    <div style={{ background: 'white', width: '100%', height: '100%' }}>
      <p> {'Random page with id ' + randomid}</p>
    </div>
  </>);
};

export default RandomLink;
