import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import { StyleSheet, View, Text } from 'react-native';

type NetInfoContextType = {
  isConnected: boolean;          // 인터넷 연결 여부 (null 대신 false로 기본값)
  netInfo: NetInfoState | null;  // 필요하면 전체 상태
};

const NetInfoContext = createContext<NetInfoContextType | undefined>(undefined);

export function NetInfoProvider({ children }: { children: ReactNode }) {
  const [netInfo, setNetInfo] = useState<NetInfoState | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state);
      const connected =
        !!state.isConnected && (state.isInternetReachable ?? true); // null이면 일단 true 취급
      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetInfoContext.Provider value={{ isConnected, netInfo }}>
      {children}
      <Modal
        isVisible={!isConnected}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        pointerEvents="none"
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            인터넷 연결 없음
          </Text>
        </View>
      </Modal>
    </NetInfoContext.Provider>
  );
}

export function useNetInfoContext() {
  const ctx = useContext(NetInfoContext);
  if (!ctx) {
    throw new Error('useNetInfoContext must be used within NetInfoProvider');
  }
  return ctx;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
})
