import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import RecommendCard from '../../../components/profile/RecommendCard';
import TopMyProfileCard from "../../../components/profile/TopMyProfileCard";

function HomeScreen(){
    return (
        <ScrollView style={styles.container}>
            {/* 상단 프로필 */}
            <TopMyProfileCard
                name="고구마탕님"
                gender="여성"
                age={23}
                ddee="#호랑이띠"
                mbti="#ENFP"
            />

            {/* 오늘 추천 */}
            <Text style={styles.sectionTitle}>오늘 추천</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <RecommendCard
                    name="감자맛탕"
                    age={29}
                    distance="경기도 (1km)"
                    job="회사원"
                    hashtags={['커피', 'INTP', '헬스', '카페']}
                    image={require('../../../assets/sample-profile.png')}
                />
                <RecommendCard
                    name="사과탕"
                    age={27}
                    distance="서울 (3km)"
                    job="디자이너"
                    hashtags={['영화', 'ENFP', '맛집']}
                    image={require('../../../assets/sample-profile.png')}
                />
            </ScrollView>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        marginBottom: 16,
    },
    username: {
        fontSize: 22,
        fontWeight: '700',
    },
    profileTag: {
        color: '#666',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: '700',
        marginTop: 25,
        marginBottom: 20,
    },
});
