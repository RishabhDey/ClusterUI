import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const onLike = (post_id) => {

};

const onComment= (post_id) => {

};

const clusterRenderBox = (
    {   post_id,
        author,
        cluster,
        promotedClique,
        songTitle,
        songAuthor,
        rating,
        description,
        totalLikes,
        onLike,
        onComment
    }
) => {
    return (
        <View>
            <View>
                <Text>{author} | {cluster} | {promotedClique}</Text>
            </View>
            {/*Outer Content Box */}
            <View>
                {/*Community Rating or Likes */}
                <View>
                    <Text>Likes: {totalLikes}</Text>
                </View>

                {/*Inner Main Box */}
                <View>
                    {/*Placeholder for Vinyl*/}
                    <View style={styles.circle} />
                    <View>
                        <Text>{description}</Text>
                    </View>
                </View>
                {/* Song info */}
                <Text style={styles.songTitle}>{songTitle}</Text>
                <Text style={styles.songAuthor}>{songAuthor}</Text>
                <View>
                    <TouchableOpacity onPress={onLike(post_id)}>
                        <Text>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onComment(post_id)}>
                        <Text>Comment</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    circle:{
        borderRadius: 50
    }
});
