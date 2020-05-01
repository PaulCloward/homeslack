import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin';
admin.initializeApp();

// Sendgrid Config
import * as sgMail from '@sendgrid/mail';


//import * as Storage from '@google-cloud/storage';
//const projectID = 'homeslack-12280';
// const gcs = new Storage.Storage({projectId:projectID});

// import { tmpdir } from 'os';
// import { join, dirname } from 'path';

// import * as sharp from 'sharp';
//import * as fs from 'fs-extra';

// ------Functions Below

//Sends email to user after a patient id is created on registration
export const welcomeEmail = functions.auth.user().onCreate(user => {

  //const uid = user.uid;
  const email = user.email;

  const API_KEY = functions.config().sendgrid.key;
  const TEMPLATE_ID = functions.config().sendgrid.template;
  sgMail.setApiKey(API_KEY);

  const emailArray:string[] = [];
  if(email){
   emailArray.push(email);
  }
  emailArray.push("paulclowardcs12@gmail.com");

    const msg = {
        to: emailArray,
        from: 'paulclowardcs12@gmail.com',
        templateId: TEMPLATE_ID,
        dynamic_template_data: {
        name: user.displayName,
        subject: 'Congrats on joining Kuldasac!',
        Sender_Name:'Kuldasac',
        Sender_Address:'383 N St. Street',
        Sender_City:'Draper',
        Sender_State:'UT',
        Sender_Zip:'84020',
      },
  };

  return sgMail.send(msg).then(success => {

    const msg = {
          to: user.email,
          from: 'paulclowardcs12@gmail.com',
          templateId: TEMPLATE_ID,
          dynamic_template_data: {
          subject: 'Congrats on joining Kuldasac!',
          name: user.displayName,
        },
    };

    return sgMail.send(msg);
  });

});

// export const generateThumbs = functions.storage
//   .object()
//   .onFinalize(async object => {
    

//     const bucket = gcs.bucket(object.bucket);
//     const filePath = object.name;

//     const fileName = filePath!.split('/').pop();

//     const bucketDir = dirname(filePath!);

//     const workingDir = join(tmpdir(), 'thumbs');
//     const tmpFilePath = join(workingDir, 'source.png');

//     if (fileName!.includes('thumb@') || !object.contentType!.includes('image')) {
//       console.log('exiting function');
//       return false;
//     }

//     // 1. Ensure thumbnail dir exists
//     await fs.ensureDir(workingDir);

//     // 2. Download Source File
//     await bucket.file(filePath!).download({
//       destination: tmpFilePath
//     });

//     // 3. Resize the images and define an array of upload promises
//     const sizes = [64, 128, 256];

//     const uploadPromises = sizes.map(async size => {
//       const thumbName = `thumb@${size}_${fileName}`;
//       const thumbPath = join(workingDir, thumbName);

//       // Resize source image
//       await sharp(tmpFilePath)
//         .resize(size, size)
//         .toFile(thumbPath);

//       // Upload to GCS
//       return bucket.upload(thumbPath, {
//         destination: join(bucketDir, thumbName)
//       });
//     });

//     // 4. Run the upload operations
//     await Promise.all(uploadPromises);

//     // 5. Cleanup remove the tmp/thumbs from the filesystem
//     return fs.remove(workingDir);
//   });