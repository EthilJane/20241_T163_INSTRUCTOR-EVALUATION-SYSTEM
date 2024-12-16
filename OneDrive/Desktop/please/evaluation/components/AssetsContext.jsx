import { useAssets } from 'expo-asset';
import { createContext, useContext } from 'react';

const AssetsContext = createContext({
  bgImg: '',
  logo: '',
});

export const AssetsContextProvider = ({
  children
}) => {
  const [assets] = useAssets([
    require('@/assets/images/bg.jpg'),
    require('@/assets/images/log-removebg-preview.png'),
  ]);

  return (
    (<AssetsContext.Provider
      value={{
        bgImg: assets?.[0]?.localUri || '',
        logo: assets?.[1]?.localUri || '',
      }}>
      {children}
    </AssetsContext.Provider>)
  );
};

export const useAssetsContext = () => {
  return useContext(AssetsContext);
};
