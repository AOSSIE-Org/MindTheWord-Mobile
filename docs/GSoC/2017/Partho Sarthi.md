GSoC | Mind the Word Mobile App - Partho Sarthi 
======

MindTheWord helps the user to easily learn the vocabulary of a new language
while browsing pages in his native language. In every web page visited, it
randomly translates a few words into the language he would like to learn.
Since only a few words are translated, it is easy to infer their meaning from
the context.

I developed the hybrid app for the project usig web technologies like Angular 2 and Ionic. The app contains Firebase integration and Google SignIn to store the configuration options and users data.The details of the features implemented are given below.
### Project Links
Gitlab - https://gitlab.com/aossie/MindTheWord-Mobile/
Apk - http://doi.org/10.5281/zenodo.852463

### Task and Features Implemented
- **Scratch** - Developed the hybrid app using Ionic with Angular 2. 
- **UI** - Simple and clean UI. The complete UI for app was designed and developed by me. Ionic's in built feature made sure the UI elements adapt as per the platform to provide a native design (variation between Android and iOS)
- **Firebase Integration** - I integrated Firebase with the app which stores the data for the configuration across various devices. It uses a device's unique id to distinguish between and store the data correspondingly.
- **Google SignIn** - Implemented this to enable users to sync their configuration options accross various devices. The users data is also stored in Firebase storage.
- **Clipboard** - The App automatically detects the clipboard content and if its a valid url, opens the webpage with translation script injected.
- **Documentation** - Used `compodoc` to create the documentation for the Angular 2 project.

### Challenges faced
There were several challenges I faced during GSoC period. However, the mentors were helpful in providing valuable suggestions and alternatives to them. Most of them were because of the hybrid nature of the project. 

The backup and restore feature required to download and upload the files - This could not be implemented directly in Ionic as it is a web view itself. Firebase has an option to export the data in json format. The workaround was to open the link in user's default browser which would download the file. Regarding upload, there seemed to be issue file read permissions in android.

The next major issue was regarding bundling `mtw.js` script.Since Ionic bundles all `typescript` files in one `build.js`- It was not possible to load `mtw.js` this way. Hence to bundle it seperately used `jspm` package manager. 

Other major challenges include ColorPicker for Ionic and integrating Google Native SignIn with Firebase (library was deprecated),Context Menu Option for the InAppBrowser.

### Future Prospects
The app is complete with basic features to translate based on various configuration options and sync with Google Account. However, certain features of the chrome-extension have not been implemented yet. The Context Menus could not be implemented as the InAppBrowser has limitations - It does not provide option to implement custom content menu.

### Merge Requests

* Initialized the project and developed basic UI elements -  [!1](https://gitlab.com/aossie/MindTheWord-Mobile/merge_requests/1)
* All elements were developed and the settings configuration were tested -  [!2](https://gitlab.com/aossie/MindTheWord-Mobile/merge_requests/2)
* Added Gulp to automate build process - [!3](https://gitlab.com/aossie/MindTheWord-Mobile/merge_requests/3)
* Integration with Firebase Database - [!4](https://gitlab.com/aossie/MindTheWord-Mobile/merge_requests/4)
* Porting the app to Ionic Framework - [!5](https://gitlab.com/aossie/MindTheWord-Mobile/merge_requests/5)
* Finalising code and documentation - [!6](https://gitlab.com/aossie/MindTheWord-Mobile/merge_requests/6)

### Conclusion
Google Summer of Code 2017 was an exceptional learning experience for me. I got a chance to work on an open source project which be utilized by a large community and furthermore make utilization of various new technologies as well. This would not have been conceivable without the consistent help from my mentors.