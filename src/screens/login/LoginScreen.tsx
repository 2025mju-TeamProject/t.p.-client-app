import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import ROUTES from '../../constants/routes';
import AppButton from "../../components/common/AppButton";

function LoginScreen({navigation}: any) {

    const {login} = useAuth();
    const [id, setText] = useState('');
    const [passwd, setPasswd] = useState('');

    const handleLogin = () =>{
        if(id.length <= 0 || passwd.length <= 0) return false;
        //Todo 로그인 api 연결

        login('Jane Doe');
        navigation.reset({
          index: 0,
          routes: [{name: ROUTES.BOTTOM}]
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>로그인</Text>
            <TextInput
                onChangeText={setText}
                value={id}
                placeholder="id"
                style={styles.textInput}>

            </TextInput>
            <TextInput
                onChangeText={setPasswd}
                value={passwd}
                placeholder="password"
                secureTextEntry={true}
                style={styles.textInput}>

            </TextInput>

            <AppButton
                title="로그인"
                onPress={handleLogin}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 100,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20
    },

    textInput: {
        height: 60,
        width: "100%",
        fontSize: 20,
        marginBottom: 20,
        textAlign: "left",
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

export default LoginScreen;