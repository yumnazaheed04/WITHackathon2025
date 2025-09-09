#!/bin/bash

# Set download directory
DOWNLOAD_DIR=~/WITHackathon2025/backend/datasets
mkdir -p "$DOWNLOAD_DIR"
cd "$DOWNLOAD_DIR" || exit

#########################
# MANIPULATED VIDEOS (15)
#########################
manipulated_videos=(
"DFD_manipulated_sequences/01_02__exit_phone_room__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__hugging_happy__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__meeting_serious__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__outside_talking_still_laughing__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__secret_conversation__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__talking_against_wall__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__talking_angry_couch__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__walk_down_hall_angry__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__walking_and_outside_surprised__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__walking_down_indoor_hall_disgust__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_02__walking_outside_cafe_disgusted__YVGY8LOK.mp4"
"DFD_manipulated_sequences/01_03__exit_phone_room__480LQD1C.mp4"
"DFD_manipulated_sequences/01_03__hugging_happy__ISF9SP4G.mp4"
"DFD_manipulated_sequences/01_03__kitchen_pan__JZUXXFRB.mp4"
"DFD_manipulated_sequences/01_03__meeting_serious__JZUXXFRB.mp4"
)

#########################
# ORIGINAL VIDEOS (15)
#########################
original_videos=(
"DFD_original_sequences/01__exit_phone_room.mp4"
"DFD_original_sequences/01__hugging_happy.mp4"
"DFD_original_sequences/01__meeting_serious.mp4"
"DFD_original_sequences/01__outside_talking_pan_laughing.mp4"
"DFD_original_sequences/01__outside_talking_still_laughing.mp4"
"DFD_original_sequences/01__secret_conversation.mp4"
"DFD_original_sequences/01__talking_against_wall.mp4"
"DFD_original_sequences/01__talking_angry_couch.mp4"
"DFD_original_sequences/01__walk_down_hall_angry.mp4"
"DFD_original_sequences/01__walking_and_outside_surprised.mp4"
"DFD_original_sequences/01__walking_down_indoor_hall_disgust.mp4"
"DFD_original_sequences/01__walking_down_street_outside_angry.mp4"
"DFD_original_sequences/01__walking_outside_cafe_disgusted.mp4"
"DFD_original_sequences/02__exit_phone_room.mp4"
"DFD_original_sequences/02__hugging_happy.mp4"
)

# Function to download a list of videos
download_videos() {
    local video_list=("$@")
    for video in "${video_list[@]}"; do
        echo "Downloading $video..."
        kaggle datasets download -d sanikatiwarekar/deep-fake-detection-dfd-entire-original-dataset -f "$video" -p "$DOWNLOAD_DIR"
        unzip -o "$DOWNLOAD_DIR/$(basename "$video").zip" -d "$DOWNLOAD_DIR"
        rm "$DOWNLOAD_DIR/$(basename "$video").zip"
    done
}

# Download manipulated and original videos
download_videos "${manipulated_videos[@]}"
download_videos "${original_videos[@]}"

echo "All selected videos (15 manipulated + 15 original) downloaded successfully!"
