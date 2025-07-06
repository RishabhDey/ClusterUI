import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PublicProfileScreen() {

    //KEYS NEED TO BE VIABLE FOR USE AS TITLES!
    const [user, setUser] = useState({
        type: "cluster",
        name: "John Doe", 
        profileImage: "www.google.com",
        beats: 120, 
        followers: 500,
        following: 500,
        bio: "AMAZING",
        likedSongs: ['SONG 1', 'SONG 2'],
        joinedCliques: ['Clique1'],
        favoriteClusters: ['Cluster1'],
        Achievements : ['Achievement'],
        Banner: 'www.banner.com'
    });

    //Eventually handles Javascript
    const Follow = () =>
    {};

    const Join = () =>
    {};

    const renderButtons = () => (
        <View>
        {(user.type.toLowerCase() === 'user' || user.type.toLowerCase() === 'clique') && (
            <TouchableOpacity onPress={Follow}>
            <Text>Follow</Text>
            </TouchableOpacity>
        )}
        {user.type.toLowerCase() === 'clique' && (
            <TouchableOpacity onPress={() => { /* join logic here */ }}>
            <Text>Join</Text>
            </TouchableOpacity>
        )}
        </View>
    );

    const renderProfileBox = () => {};

    const renderHorizontalSection = () => {
        return Object.entries(user).map(([key, value]) => {
            if(Array.isArray(value)) {

                const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                    <HorizontalScrollSection title = {key} data = {value} func = {renderProfileBox}/>

                );
            }

        });

    };

    const getProfileImageStyle = () => {
        switch (user.type.toLowerCase()) {
            case 'user':
                return styles.profileUser;
            case 'clique':
                return styles.profileClique;
            case 'cluster':
                return styles.profileCluster;
        }

    };

    const getImageStyle = () => {
        return user.type.toLowerCase() === 'cluster' ? styles.counterRotate : {};
    };

    


    return(
        <SafeAreaView>
            <View>
                {/* Header with Main Profile Elements */}
                <View>
                    <View style={[styles.profileContainer, getProfileImageStyle()]}>
                        <Image
                            source={{ uri: user.profileImage }}
                            style={[getImageStyle()]}
                        />
                    </View>
                    <Text>{user.name}</Text>
                    <Text>{user.beats} Beats | {user.followers} Followers | {user.following} Following</Text>
                    {/* Follow Button */}
                    <TouchableOpacity onPress = {Follow}>
                        <Text>Follow</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>

                    {/* User Bio */}
                    <View>
                        <Text>Biography</Text>
                        <Text>{user.bio}</Text>
                    </View>
                    
                    {/*Render all needed Horizontal Sections gained.*/}
                    {renderHorizontalSection()}


                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffff",
        paddingTop: 40,
    },
    profileContainer: {
        width: 100,
        height: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileUser: {
        borderRadius: 0
    },
    profileClique: {
        borderRadius: 50
    },
    profileCluster: {
        borderRadius: 0,
        transform: [{ rotate: '45deg' }],
    },

    profileImageBase: {
        width: 100,
        height: 100,
        borderRadius: 0,  
    },

    counterRotate: {
    transform: [{ rotate: '-45deg' }], 
    },
});
