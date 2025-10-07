import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileCardProps {
    name: string;
    gender: string;
    age: number;
    ddee: string;
    mbti: string;
}

const RecommendCard: React.FC<ProfileCardProps> = ({ name, gender, age, ddee, mbti }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.profileTag}>{gender}</Text>
            <Text style={styles.profileTag}>{age}</Text>
            <Text style={styles.profileTag}>{ddee}</Text>
            <Text style={styles.profileTag}>{mbti}</Text>

        </View>
    );
};

export default RecommendCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 12,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginRight: 16,
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        marginRight: 16,
    },
    profileTag: {
        color: '#666',
        marginRight: 16,
    },
});
