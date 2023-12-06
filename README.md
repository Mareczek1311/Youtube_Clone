# YouTube Clone

Welcome to my YouTube clone project! This web application provides a familiar YouTube-like experience with essential features such as video listing, watching, user authentication, and video uploading. The platform is built using a robust tech stack and leverages various Google Cloud services for seamless functionality.

## Features:

- List videos
- Watch a video
- Sign in/out
- Upload a video
- Watch the transcoded video

## Tech Stack:

- TypeScript
- Next.js
- Express.js
- Docker
- FFmpeg
- Firebase Auth
- Firebase Functions
- Firebase Firestore
- Google Cloud Storage
- Google Cloud Pub/Sub
- Google Cloud Run

## Architecture:

- Cloud Storage stores raw and processed videos uploaded by users.
- Pub/Sub sends messages to the video processing service.
- Cloud Run hosts a non-public video processing service for transcoding videos.
- Cloud Firestore stores metadata for the videos.
- Cloud Run hosts a Next.js app, serving as the YouTube web client.
- The Next.js app makes API calls to Firebase Functions, which fetch videos from Cloud Firestore.

Feel free to explore, contribute, and enhance this YouTube clone project!
