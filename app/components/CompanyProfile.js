import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '../constants/api';

const CompanyProfile = ({ symbol }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
      setProfile(res.data);
    };
    fetchProfile();
  }, [symbol]);

  if (!profile) return null;

  return (
    <View>
      <Text>🏢 {profile.name}</Text>
      <Text>Industry: {profile.finnhubIndustry}</Text>
      <Text>Exchange: {profile.exchange}</Text>
      <Text>Website: {profile.weburl}</Text>
    </View>
  );
};

export default CompanyProfile;
